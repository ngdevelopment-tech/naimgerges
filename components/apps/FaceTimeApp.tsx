import React, { useState, useEffect } from "react";
import { PhoneOff, Video, Mail, MessageCircle, Phone } from "lucide-react";
import { USER_NAME, USER_AVATAR, USER_EMAIL, USER_WHATSAPP_LINK } from "../../constants";
import { startRingtone, stopRingtone, playConnectBlip, playEndBlip } from "../../lib/sounds";

type CallState = "incoming" | "language" | "connecting" | "video" | "ended";

/**
 * FaceTime — a real incoming-call flow: the phone rings with Decline /
 * Accept buttons; accepting opens the language chooser; picking a language
 * connects the call with the pickup pop. Hang up plays the end cadence.
 */
const FaceTimeApp: React.FC = () => {
  const [state, setState] = useState<CallState>("incoming");
  const [lang, setLang] = useState<"en" | "ar" | "fr">("en");

  // Ring while the phone is ringing (incoming); stop the moment it isn't.
  useEffect(() => {
    if (state === "incoming") startRingtone();
    else stopRingtone();
    return stopRingtone;
  }, [state]);

  const labels: Record<"en" | "ar" | "fr", string> = {
    en: "English",
    ar: "العربية",
    fr: "Français",
  };

  const messages: Record<"en" | "ar" | "fr", string> = {
    en: "Hi, it's Naim! So glad you picked up. Take a look around my desktop, and enjoy the tour.",
    ar: "أهلاً! نعيم في الخط. سعيد إنك رديت، تجوّل في سطح المكتب واستمتع بالجولة.",
    fr: "Salut, c'est Naim ! Ravi que tu répondes. Fais un tour sur mon bureau et profites-en bien.",
  };

  const decline = () => {
    stopRingtone();
    playEndBlip();
    setState("ended");
  };

  const accept = () => {
    stopRingtone();
    setState("language");
  };

  const chooseLanguage = (l: "en" | "ar" | "fr") => {
    setLang(l);
    playConnectBlip();
    setState("connecting");
    window.setTimeout(() => setState("video"), 1400);
  };

  const end = () => {
    playEndBlip();
    setState("ended");
  };

  if (state === "ended") {
    return (
      <div className="h-full w-full bg-black flex flex-col items-center justify-center text-gray-500 p-6 text-center gap-5">
        <PhoneOff size={40} className="opacity-40" />
        <p className="text-[15px] font-medium text-gray-300">Call ended</p>
        <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-[280px]">
          <a
            href={`mailto:${USER_EMAIL}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#0a66ff] text-white text-[13px] font-semibold hover:bg-[#0055d4] transition-colors"
          >
            <Mail size={14} /> Email
          </a>
          <a
            href={USER_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#25d366] text-white text-[13px] font-semibold hover:bg-[#1faa53] transition-colors"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>
        <button
          onClick={() => setState("incoming")}
          className="mt-1 px-5 py-1.5 rounded-full text-[12px] text-gray-400 hover:text-white border border-white/15 hover:border-white/30 transition-colors"
        >
          Call again
        </button>
      </div>
    );
  }

  if (state === "connecting") {
    return (
      <div className="h-full w-full relative overflow-hidden bg-[#1c1c1e] flex flex-col items-center justify-center">
        <div className="absolute inset-0 pointer-events-none">
          <img src={USER_AVATAR} alt="" className="w-full h-full object-cover opacity-20 blur-3xl scale-125" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-white/20 animate-pulse">
            <img src={USER_AVATAR} alt={USER_NAME} className="w-full h-full object-cover" />
          </div>
          <p className="text-gray-300 text-[13.5px] font-medium">Connecting…</p>
        </div>
      </div>
    );
  }

  if (state === "language") {
    return (
      <div className="h-full w-full relative overflow-hidden bg-[#1c1c1e] flex flex-col items-center pt-14 md:pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <img src={USER_AVATAR} alt="" className="w-full h-full object-cover opacity-25 blur-3xl scale-125" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 flex flex-col items-center px-4 text-center animate-fade-in">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-[3px] bg-gradient-to-b from-gray-300 to-gray-600 shadow-2xl">
            <img src={USER_AVATAR} alt={USER_NAME} className="w-full h-full rounded-full object-cover" />
          </div>
          <h2 className="mt-4 text-xl md:text-[24px] font-bold text-white">{USER_NAME}</h2>
          <p className="mt-1 text-gray-400 text-[12.5px] flex items-center gap-1.5">
            <Video size={13} /> Connected — choose your language
          </p>
        </div>

        <div className="relative z-10 w-full px-6 mt-8 grid grid-cols-3 gap-2.5 max-w-sm">
          {(["en", "ar", "fr"] as const).map((l) => (
            <button
              key={l}
              onClick={() => chooseLanguage(l)}
              className="py-3 rounded-2xl text-[13px] font-semibold transition-all active:scale-95 border bg-white/10 text-white border-white/10 hover:bg-white/20"
            >
              {labels[l]}
            </button>
          ))}
        </div>

        <div className="relative z-10 mt-auto mb-8 w-full px-8 flex justify-center items-center max-w-md">
          <button
            onClick={end}
            className="flex flex-col items-center gap-1.5 group"
          >
            <span className="w-14 h-14 rounded-full bg-[#ff453a] group-hover:bg-[#e03e30] transition-colors flex items-center justify-center shadow-lg group-active:scale-95">
              <PhoneOff size={24} className="fill-white text-white" />
            </span>
            <span className="text-white/90 text-[12px] font-medium">End</span>
          </button>
        </div>
      </div>
    );
  }

  if (state === "incoming") {
    return (
      <div className="h-full w-full relative overflow-hidden bg-[#1c1c1e] flex flex-col items-center pt-12 md:pt-16">
        <div className="absolute inset-0 pointer-events-none">
          <img src={USER_AVATAR} alt="" className="w-full h-full object-cover opacity-25 blur-3xl scale-125" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 flex flex-col items-center px-4 text-center animate-fade-in">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full p-[3px] bg-gradient-to-b from-gray-300 to-gray-600 shadow-2xl">
            <img src={USER_AVATAR} alt={USER_NAME} className="w-full h-full rounded-full object-cover" />
          </div>
          <h2 className="mt-4 text-2xl md:text-[26px] font-bold text-white">{USER_NAME}</h2>
          <p className="mt-1 text-gray-300 text-[13.5px] flex items-center gap-1.5">
            <Video size={14} /> FaceTime…
          </p>
        </div>

        {/* Decline / Accept — like a real incoming call */}
        <div className="relative z-10 mt-auto mb-10 w-full px-8 flex justify-between items-center max-w-md">
          <button onClick={decline} className="flex flex-col items-center gap-1.5 group">
            <span className="w-16 h-16 rounded-full bg-[#ff453a] group-hover:bg-[#e03e30] transition-colors flex items-center justify-center shadow-lg group-active:scale-95 animate-pulse-ring">
              <PhoneOff size={26} className="fill-white text-white" />
            </span>
            <span className="text-white/90 text-[12.5px] font-medium">Decline</span>
          </button>
          <button onClick={accept} className="flex flex-col items-center gap-1.5 group">
            <span className="w-16 h-16 rounded-full bg-[#30d158] group-hover:bg-[#28b84d] transition-colors flex items-center justify-center shadow-lg group-active:scale-95 animate-pulse-ring">
              <Phone size={26} className="fill-white text-white -scale-x-100" />
            </span>
            <span className="text-white/90 text-[12.5px] font-medium">Accept</span>
          </button>
        </div>
      </div>
    );
  }

  // video state
  return (
    <div className="h-full w-full bg-[#1c1c1e] flex flex-col">
      <div className="h-12 shrink-0" />
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-5 overflow-y-auto">
        <div className="w-16 h-16 rounded-full overflow-hidden shadow-xl">
          <img src={USER_AVATAR} alt={USER_NAME} className="w-full h-full object-cover" />
        </div>
        <h2 className="text-white text-lg font-semibold">{USER_NAME}</h2>
        <p className="text-gray-300 text-[13.5px] leading-relaxed max-w-[300px]">{messages[lang]}</p>

        <div className="flex gap-2.5 mt-2">
          <a
            href={`mailto:${USER_EMAIL}`}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a66ff] text-white text-[12.5px] font-semibold hover:bg-[#0055d4] transition-colors"
          >
            <Mail size={13} /> {USER_EMAIL}
          </a>
        </div>
      </div>
      <div className="h-16 shrink-0 flex items-center justify-center gap-4 pb-4">
        <button
          onClick={() => setState("language")}
          className="px-4 py-1.5 rounded-full text-[12px] text-gray-400 hover:text-white border border-white/15 hover:border-white/30 transition-colors"
        >
          Back
        </button>
        <button
          onClick={end}
          className="px-5 py-1.5 rounded-full bg-[#ff453a] text-white text-[12px] font-semibold hover:bg-[#e03e30] transition-colors flex items-center gap-1.5"
        >
          <PhoneOff size={12} className="fill-white" /> End
        </button>
      </div>
    </div>
  );
};

export default FaceTimeApp;
