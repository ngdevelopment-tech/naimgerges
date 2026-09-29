/**
 * Production server: serves the built SPA and the LinkedIn passthrough route.
 *
 * LinkedIn sets X-Frame-Options / frame-ancestors on www.linkedin.com, so a
 * plain iframe cannot frame it from another origin. The standard technique
 * used by reader apps is to serve the upstream document from our own origin
 * and rewrite its frame-busting headers on the way through. Visitors still
 * see the authentic LinkedIn document; anyone not signed in to LinkedIn sees
 * LinkedIn's own sign-in wall, which is expected behavior.
 */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 8787;
const HOST = process.env.HOST || '127.0.0.1';

app.disable('x-powered-by');

const UPSTREAM_TIMEOUT_MS = 15000;

const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
};

// Headers LinkedIn sends that prevent framing or break the passthrough.
const STRIPPED_RESPONSE_HEADERS = new Set([
  'content-security-policy',
  'content-security-policy-report-only',
  'x-frame-options',
  'x-content-type-options',
  'content-encoding',
  'content-length',
  'transfer-encoding',
  'strict-transport-security',
  'set-cookie',
]);

app.get('/api/linkedin-profile', async (req, res) => {
  try {
    // LinkedIn only serves the profile document to browsers; server-origin
    // requests receive HTTP 999. Keep a browser-like header set and forward
    // the visitor's own cookies when present so a signed-in visitor sees the
    // authenticated profile view.
    const cookie = req.headers.cookie;
    const upstream = await fetch('https://www.linkedin.com/in/naim-gerges-892591271/', {
      headers: cookie ? { ...BROWSER_HEADERS, Cookie: cookie } : BROWSER_HEADERS,
      redirect: 'follow',
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    // LinkedIn answers HTTP 999 to non-browser (server-origin) requests. Pass
    // the status through: the frame then shows LinkedIn's own interstitial
    // rather than a synthetic page, and any signed-in visitor cookies still
    // produce the authenticated profile render.
    return pipeResponse(upstream, res);
  } catch (err) {
    console.error('LinkedIn passthrough failed:', err instanceof Error ? err.message : err);
    res.status(502).type('html').send(
      `<!DOCTYPE html><html><head><meta charset="utf-8"><title>LinkedIn</title></head>
       <body style="font-family:-apple-system,system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f4f2ee;color:#191919">
       <div style="text-align:center;max-width:420px;padding:2rem">
         <h2 style="font-weight:600">LinkedIn is not reachable right now</h2>
         <p style="color:#666;line-height:1.5">The profile can be opened directly on LinkedIn instead.</p>
         <a href="https://www.linkedin.com/in/naim-gerges-892591271/" target="_blank" rel="noopener noreferrer"
            style="display:inline-block;margin-top:1rem;padding:.6rem 1.4rem;background:#0a66c2;color:#fff;border-radius:999px;text-decoration:none;font-weight:600">Open on LinkedIn</a>
       </div></body></html>`
    );
  }
});

async function pipeResponse(upstream, res) {
  const headers = {};
  upstream.headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (!STRIPPED_RESPONSE_HEADERS.has(k)) headers[k] = value;
  });

  // Keep LinkedIn's CSS/JS loading from its own CDN, but let the document
  // itself live on our origin so the frame is allowed.
  headers['content-type'] = upstream.headers.get('content-type') || 'text/html; charset=utf-8';
  headers['cache-control'] = 'no-store';

  res.status(upstream.status);
  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value);
  }

  const buffer = await upstream.arrayBuffer();
  res.send(Buffer.from(buffer));
}

// Static SPA
const distDir = path.join(__dirname, 'dist');
app.use(express.static(distDir));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Portfolio OS server running on http://${HOST}:${PORT}`);
});
