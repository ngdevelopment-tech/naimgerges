import React, { useState } from "react";
import {
  Wifi,
  Battery,
  Volume2,
  Lock,
  User,
  Image as ImageIcon,
  Search,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Monitor,
  MemoryStick,
  HardDrive,
  ShieldCheck,
  Check,
} from "lucide-react";
import {
  USER_NAME,
  USER_TITLE,
  USER_AVATAR,
  WALLPAPERS,
} from "../../constants";
import { getSystemVolume, setSystemVolume } from "../../lib/sounds";
import { getLowPower, setSystemLowPower } from "../../lib/systemState";

interface SettingsAppProps {
  wallpaper: string;
  onWallpaperChange: (url: string) => void;
}

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
  tint: string;
}

const SECTIONS: Section[] = [
  { id: "wifi", label: "Wi-Fi", icon: <Wifi size={15} />, tint: "bg-[#0a84ff]" },
  { id: "battery", label: "Battery", icon: <Battery size={15} />, tint: "bg-[#30d158]" },
  { id: "sound", label: "Sound", icon: <Volume2 size={15} />, tint: "bg-[#ff375f]" },
  { id: "security", label: "System Security", icon: <Lock size={15} />, tint: "bg-[#5e5ce6]" },
  { id: "wallpaper", label: "Wallpaper", icon: <ImageIcon size={15} />, tint: "bg-[#64d2ff]" },
  { id: "about", label: "About This Mac", icon: <User size={15} />, tint: "bg-[#8e8e93]" },
];

/** Hand-drawn MacBook Pro (2026): screen with notch above an aluminum deck. */
const MacBookArt: React.FC = () => (
  <svg viewBox="0 0 220 130" className="w-full max-w-[280px] mx-auto block" aria-hidden="true">
    <defs>
      <linearGradient id="mbp-lid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#e2e3e5" />
        <stop offset="1" stopColor="#c9cacd" />
      </linearGradient>
      <linearGradient id="mbp-screen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0d0d11" />
        <stop offset="1" stopColor="#1c1c22" />
      </linearGradient>
      <linearGradient id="mbp-wallpaper" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ff7a3c" />
        <stop offset="0.5" stopColor="#e0521f" />
        <stop offset="1" stopColor="#7a2d0e" />
      </linearGradient>
      <linearGradient id="mbp-deck" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#d6d7da" />
        <stop offset="1" stopColor="#b9babd" />
      </linearGradient>
    </defs>
    {/* lid */}
    <rect x="35" y="6" width="150" height="96" rx="8" fill="url(#mbp-lid)" />
    <rect x="40" y="11" width="140" height="86" rx="4.5" fill="url(#mbp-screen)" />
    {/* wallpaper */}
    <clipPath id="mbp-clip">
      <rect x="42" y="13" width="136" height="82" rx="3" />
    </clipPath>
    <g clipPath="url(#mbp-clip)">
      <rect x="42" y="13" width="136" height="82" fill="url(#mbp-wallpaper)" />
      <path d="M42 72 Q80 50 112 64 T178 58 V95 H42 Z" fill="#ffffff" opacity="0.14" />
    </g>
    {/* notch + camera */}
    <rect x="96" y="13" width="28" height="7" rx="3.5" fill="#0d0d11" />
    <circle cx="110" cy="16.5" r="1.6" fill="#1e2a38" />
    <circle cx="110" cy="16.5" r="0.7" fill="#3d5a75" />
    {/* deck */}
    <path d="M22 102 H198 L208 118 Q209 121 205 121 H15 Q11 121 12 118 Z" fill="url(#mbp-deck)" />
    <path d="M22 102 H198 L201 106 H19 Z" fill="#ffffff" opacity="0.5" />
    {/* keyboard well */}
    <rect x="52" y="107" width="116" height="7.5" rx="2.5" fill="#a7a8ab" />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
      <rect key={i} x={54 + i * 9.5} y="108.4" width="7.6" height="4.8" rx="1" fill="#8f9093" opacity="0.85" />
    ))}
    {/* trackpad */}
    <rect x="93" y="116" width="34" height="3.6" rx="1.6" fill="#9a9b9e" />
    {/* feet shadow */}
    <ellipse cx="110" cy="123.5" rx="86" ry="3" fill="#000000" opacity="0.12" />
  </svg>
);

const SettingsApp: React.FC<SettingsAppProps> = ({ wallpaper, onWallpaperChange }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [volume, setVolume] = useState<number>(getSystemVolume());
  const [wifiOn, setWifiOn] = useState(true);
  const [lowPower, setLowPowerLocal] = useState(getLowPower());
  const [firewall, setFirewall] = useState(true);
  const [optCharging, setOptCharging] = useState(true);
  const [network, setNetwork] = useState<string | null>("Naim's WiFi");
  const [filevault, setFilevault] = useState(false);

  const filtered = SECTIONS.filter((s) => s.label.toLowerCase().includes(query.toLowerCase()));
  const active = SECTIONS.find((s) => s.id === activeId);

  const DetailTitle: React.FC = () => (
    <h1 className="text-[17px] font-semibold text-gray-900 mb-4">{active?.label}</h1>
  );

  const Row: React.FC<{
    label: string;
    sub?: string;
    children?: React.ReactNode;
    onClick?: () => void;
  }> = ({ label, sub, children, onClick }) => (
    <div
      onClick={onClick}
      className={`flex items-center justify-between gap-3 px-4 py-3 ${onClick ? "cursor-pointer hover:bg-black/[0.03]" : ""}`}
    >
      <div className="min-w-0">
        <div className="text-[13.5px] text-gray-900 font-medium">{label}</div>
        {sub && <div className="text-[12px] text-gray-500 mt-0.5">{sub}</div>}
      </div>
      {children}
    </div>
  );

  const Toggle: React.FC<{ on: boolean; onChange: () => void }> = ({ on, onChange }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={`w-[42px] h-[25px] rounded-full p-[2px] transition-colors shrink-0 ${on ? "bg-[#30d158]" : "bg-black/15"}`}
      role="switch"
      aria-checked={on}
    >
      <span
        className={`block w-[21px] h-[21px] rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-[17px]" : ""
        }`}
      />
    </button>
  );

  const renderDetail = (paneId: string | null) => {
    switch (paneId) {
      case "wallpaper":
        return (
          <div className="animate-fade-in">
            <DetailTitle />
            <div className="rounded-xl bg-white border border-black/5 p-4 shadow-sm mb-5">
              <div className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Current</div>
              <div
                className="w-full aspect-[16/9] rounded-lg bg-cover bg-center border border-black/10 shadow-inner"
                style={{ backgroundImage: `url(${wallpaper})` }}
              />
              <div className="text-[12px] text-gray-500 mt-2">
                {WALLPAPERS.find((w) => w.url === wallpaper)?.name ?? "Custom"}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {WALLPAPERS.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => onWallpaperChange(wp.url)}
                  className="group text-left focus:outline-none"
                >
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-black/10 shadow-sm group-hover:shadow-md transition-shadow">
                    <img src={wp.url} alt={wp.name} className="w-full h-full object-cover" draggable={false} />
                    {wallpaper === wp.url && (
                      <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#0a66ff] flex items-center justify-center shadow">
                        <Check size={12} className="text-white" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] font-medium text-gray-700 mt-1.5">{wp.name}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case "about":
        return (
          <div className="animate-fade-in max-w-xl">
            <DetailTitle />
            <div className="rounded-xl bg-white border border-black/5 shadow-sm overflow-hidden">
              <div className="flex items-center gap-4 p-4 border-b border-black/5">
                <img src={USER_AVATAR} alt={USER_NAME} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-[15px] text-gray-900">{USER_NAME}</div>
                  <div className="text-[12.5px] text-gray-500">{USER_TITLE}</div>
                </div>
              </div>
              <div className="py-6 flex justify-center border-b border-black/5">
                <MacBookArt />
              </div>
              {[
                { icon: <Monitor size={15} />, label: "Model", value: "MacBook Pro (16-inch, 2026)" },
                { icon: <Cpu size={15} />, label: "Chip", value: "Apple M5 Max" },
                { icon: <MemoryStick size={15} />, label: "Memory", value: "48 GB unified" },
                { icon: <HardDrive size={15} />, label: "Storage", value: "1 TB SSD" },
                { icon: <Monitor size={15} />, label: "macOS", value: "Tahoe 26.2" },
                { icon: <Monitor size={15} />, label: "Display", value: "16.2-inch Liquid Retina XDR" },
                { icon: <Cpu size={15} />, label: "Serial number", value: "C02NG2026NGX" },
              ].map((r) => (
                <Row key={r.label} label={r.label} sub={undefined}>
                  <span className="flex items-center gap-2 text-[13px] text-gray-600 text-right">
                    <span className="text-gray-400">{r.icon}</span>
                    {r.value}
                  </span>
                </Row>
              ))}
            </div>
          </div>
        );

      case "sound":
        return (
          <div className="animate-fade-in max-w-xl">
            <DetailTitle />
            <div className="rounded-xl bg-white border border-black/5 shadow-sm p-4">
              <div className="text-[13px] font-medium text-gray-900 mb-3">Output volume</div>
              <div className="flex items-center gap-3">
                <Volume2 size={15} className="text-gray-400 shrink-0" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.02}
                  value={volume}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setVolume(v);
                    setSystemVolume(v);
                  }}
                  className="w-full accent-[#0a66ff]"
                />
                <span className="text-[12px] text-gray-500 w-9 text-right tabular-nums">
                  {Math.round(volume * 100)}
                </span>
              </div>
              <p className="text-[12px] text-gray-500 mt-3">
                Controls system sounds across the entire desktop.
              </p>
            </div>
          </div>
        );

      case "wifi":
        return (
          <div className="animate-fade-in max-w-xl">
            <DetailTitle />
            <div className="rounded-xl bg-white border border-black/5 shadow-sm divide-y divide-black/5">
              <Row label="Wi-Fi" sub={wifiOn ? "Connected to home network" : "Off"}>
                <Toggle on={wifiOn} onChange={() => setWifiOn((v) => !v)} />
              </Row>
              {wifiOn && (
                <>
                  <div className="px-4 pt-3 pb-1">
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Known networks</div>
                  </div>
                  {[
                    { name: "Naim's WiFi", bars: 3 },
                    { name: "Gerges's WiFi", bars: 2 },
                    { name: "Coding Guest", bars: 1 },
                  ].map((n) => (
                    <Row
                      key={n.name}
                      label={n.name}
                      sub={network === n.name ? "Connected" : undefined}
                      onClick={() => setNetwork(n.name)}
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex items-end gap-[2px]">
                          {[1, 2, 3].map((b) => (
                            <span
                              key={b}
                              className={`w-[3px] rounded-sm ${b <= n.bars ? "bg-gray-700" : "bg-gray-300"}`}
                              style={{ height: 4 + b * 3 }}
                            />
                          ))}
                        </span>
                        {network === n.name && <Check size={14} className="text-[#0a66ff]" />}
                      </span>
                    </Row>
                  ))}
                  <Row label="IP address" sub="assigned by router">
                    <span className="text-[13px] text-gray-600 font-mono">192.168.1.42</span>
                  </Row>
                </>
              )}
            </div>
          </div>
        );

      case "battery":
        return (
          <div className="animate-fade-in max-w-xl">
            <DetailTitle />
            <div className="rounded-xl bg-white border border-black/5 shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-medium text-gray-900">Battery level</span>
                <span className="text-[13px] text-gray-500 tabular-nums">87%</span>
              </div>
              <div className="h-3 rounded-full bg-black/10 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${lowPower ? "bg-[#ffd60a]" : "bg-[#30d158]"}`}
                  style={{ width: "87%" }}
                />
              </div>
              {lowPower && (
                <p className="text-[12px] text-[#b58a00] mt-2 font-medium">
                  Low Power Mode on — the battery icon is yellow in the menu bar.
                </p>
              )}
              <p className="text-[12px] text-gray-500 mt-3">
                Last charged to full today. Power source: battery.
              </p>
            </div>
            <div className="rounded-xl bg-white border border-black/5 shadow-sm mt-3 divide-y divide-black/5">
              <Row label="Low Power Mode" sub={lowPower ? "on — battery shows yellow" : "off — reducing background activity when on"}>
                <Toggle
                  on={lowPower}
                  onChange={() => {
                    const next = !lowPower;
                    setLowPowerLocal(next);
                    setSystemLowPower(next);
                  }}
                />
              </Row>
              <Row label="Optimized charging" sub="learns your daily routine">
                <Toggle on={optCharging} onChange={() => setOptCharging((v) => !v)} />
              </Row>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="animate-fade-in max-w-xl">
            <DetailTitle />
            <div className="rounded-xl bg-white border border-black/5 shadow-sm divide-y divide-black/5">
              <Row label="Firewall" sub="Block incoming connections">
                <Toggle on={firewall} onChange={() => setFirewall((v) => !v)} />
              </Row>
              <Row label="FileVault" sub="Encrypt the startup disk">
                <Toggle on={filevault} onChange={() => setFilevault((v) => !v)} />
              </Row>
              <Row label="Touch ID" sub="Unlock with fingerprint">
                <ShieldCheck size={16} className="text-[#30d158]" />
              </Row>
              <Row label="Gatekeeper" sub="Verified apps only">
                <span className="text-[12.5px] text-gray-500">App Store & identified developers</span>
              </Row>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex bg-[#f5f5f7] text-gray-900">
      {/* Section list — the root on phones, the sidebar on desktop. */}
      <aside
        className={`shrink-0 flex-col bg-[#eeeef0]/80 md:border-r md:border-black/5 md:flex md:w-[240px] w-full h-full ${
          activeId ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="px-3 pb-3 pt-11 md:pt-10">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full pl-8 pr-2 py-1.5 rounded-md bg-white border border-black/5 text-[13px] outline-none focus:ring-2 focus:ring-[#0a66ff]/25"
            />
          </div>
        </div>

        <div className="px-3 pb-3">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-black/5 cursor-default">
            <img src={USER_AVATAR} alt={USER_NAME} className="w-9 h-9 rounded-full object-cover" />
            <div className="min-w-0">
              <div className="text-[13px] font-semibold truncate">{USER_NAME}</div>
              <div className="text-[11px] text-gray-500 truncate">Apple Account</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5">
          {filtered.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 md:py-1.5 rounded-lg text-[13.5px] md:text-[13px] transition-colors ${
                activeId === s.id ? "bg-[#0a66ff] text-white shadow-sm" : "text-gray-800 hover:bg-black/5"
              }`}
            >
              <span className={`w-[24px] h-[24px] md:w-[22px] md:h-[22px] rounded-md ${s.tint} flex items-center justify-center text-white`}>
                {s.icon}
              </span>
              <span className="font-medium flex-1 text-left">{s.label}</span>
              <ChevronRight size={15} className="text-gray-400 md:hidden" />
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-[12.5px] text-gray-400 px-3 py-4">No results for “{query}”</p>
          )}
        </nav>
      </aside>

      {/* Detail pane — full-screen drill-down on phones, side-by-side on desktop. */}
      <div
        className={`flex-1 flex-col overflow-y-auto bg-[#f5f5f7] md:flex ${
          activeId ? "flex" : "hidden md:flex"
        }`}
      >
        <div className="md:hidden sticky top-0 z-10 bg-[#f5f5f7]/95 backdrop-blur-md pt-[42px] px-2 pb-1">
          <button
            onClick={() => setActiveId(null)}
            className="flex items-center text-[#0a66ff] text-[15px] font-medium px-2 py-1.5"
          >
            <ChevronLeft size={18} /> Settings
          </button>
        </div>
        <div className="px-4 md:px-6 pb-6 pt-3 md:pt-11 flex-1">{renderDetail(activeId)}</div>
      </div>
    </div>
  );
};

export default SettingsApp;
