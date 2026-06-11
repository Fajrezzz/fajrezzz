import { useEffect, useState, useRef } from "react";

const galleryPhotos = [
  "/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg", "/6.jpg"
];

const gamePhotos: Record<string, string[]> = {
  ml: ["/ml1.jpg", "/ml2.jpg", "/ml3.jpg"],
  ff: ["/ff1.jpg", "/ff2.jpg", "/ff3.jpg"],
  roblox: ["/roblox1.jpg", "/roblox2.jpg"],
};

const playClick = () => new Audio("/click.mp3").play();

function SkeletonImg({ src, className }: { src: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-2xl w-full h-full">
      {!loaded && <div className="absolute inset-0 bg-white/10 animate-pulse rounded-2xl" />}
      <img
        src={src}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState<"intro" | "loading" | "app">("intro");
  const [introOut, setIntroOut] = useState(false);
  const [activeTab, setActiveTab] = useState<"watch" | "photo" | "game" | "about">("watch");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ photos: string[]; index: number } | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const enterApp = () => {
    playClick();
    setIntroOut(true);
    setTimeout(() => {
      setStage("loading");
      setTimeout(() => setStage("app"), 1200);
    }, 600);
  };

  const openPreview = (photos: string[], index: number) => {
    setPreview({ photos, index });
    setTimeout(() => setLightboxVisible(true), 10);
  };

  const closePreview = () => {
    setLightboxVisible(false);
    setTimeout(() => setPreview(null), 250);
  };

  const swipePrev = () => {
    if (!preview) return;
    setPreview({ ...preview, index: (preview.index - 1 + preview.photos.length) % preview.photos.length });
  };

  const swipeNext = () => {
    if (!preview) return;
    setPreview({ ...preview, index: (preview.index + 1) % preview.photos.length });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!preview) return;
      if (e.key === "ArrowLeft") swipePrev();
      if (e.key === "ArrowRight") swipeNext();
      if (e.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preview]);

  return (
    <div
      className="min-h-screen text-white relative overflow-x-hidden pb-24"
      style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
    >
      <style>{`
        @keyframes loadbar { from { width: 0%; } to { width: 100%; } }
        @keyframes fadeScaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(1.04); } }
        @keyframes floatUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glowPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes borderShimmer {
          0% { border-color: rgba(99,102,241,0.3); box-shadow: 0 0 12px rgba(99,102,241,0.2); }
          50% { border-color: rgba(139,92,246,0.8); box-shadow: 0 0 24px rgba(139,92,246,0.4); }
          100% { border-color: rgba(99,102,241,0.3); box-shadow: 0 0 12px rgba(99,102,241,0.2); }
        }
        @keyframes avatarGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.4), 0 0 40px rgba(99,102,241,0.2); }
          50% { box-shadow: 0 0 30px rgba(139,92,246,0.6), 0 0 60px rgba(139,92,246,0.3); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .anim-fadescale { animation: fadeScaleIn 0.3s ease-out forwards; }
        .anim-slideup { animation: slideUp 0.35s ease-out forwards; }
        .intro-out { animation: fadeOut 0.6s ease-in forwards; }
        .float-1 { animation: floatUp 0.8s ease-out 0.1s both; }
        .float-2 { animation: floatUp 0.8s ease-out 0.35s both; }
        .float-3 { animation: floatUp 0.8s ease-out 0.6s both; }
        .glow-text { animation: glowPulse 2.5s ease-in-out infinite; }
        .btn-shimmer { animation: borderShimmer 2.5s ease-in-out infinite; }
        .avatar-glow { animation: avatarGlow 3s ease-in-out infinite; }
        .card-in-1 { animation: cardIn 0.5s ease-out 0.1s both; }
        .card-in-2 { animation: cardIn 0.5s ease-out 0.25s both; }
        .card-in-3 { animation: cardIn 0.5s ease-out 0.4s both; }
        .card-in-4 { animation: cardIn 0.5s ease-out 0.55s both; }
      `}</style>

      {/* 🌌 BACKGROUND GLOW */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full" style={{ top: "-10%", left: "-10%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute rounded-full" style={{ bottom: "-10%", right: "-10%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute rounded-full" style={{ top: "40%", left: "30%", width: "30vw", height: "30vw", background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)", filter: "blur(30px)" }} />
      </div>

      {/* ✨ INTRO */}
      {stage === "intro" && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${introOut ? "intro-out" : ""}`}
          style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
        >
          <div className="absolute rounded-full" style={{ top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />
          <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
            <div className="float-1 text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(99,102,241,0.8)" }}>welcome to</div>
            <div className="float-2 flex flex-col items-center gap-1">
              <div className="text-4xl font-bold tracking-widest" style={{ background: "linear-gradient(90deg, #818cf8, #c4b5fd, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% auto" }}>FAJREZ</div>
              <div className="text-lg tracking-[0.5em] uppercase glow-text" style={{ color: "rgba(196,181,253,0.7)" }}>for you</div>
            </div>
            <div className="float-2 w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)" }} />
            <div className="float-2 text-sm" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>an experience made for you</div>
            <button
              className="float-3 btn-shimmer mt-4 px-10 py-3 rounded-full text-sm font-semibold tracking-widest uppercase"
              style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.4)", color: "white", letterSpacing: "0.2em", transition: "background 0.2s ease, transform 0.15s ease" }}
              onClick={enterApp}
              onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
              onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.12)")}
            >
              Enter
            </button>
          </div>
        </div>
      )}

      {/* ⚡ LOADING */}
      {stage === "loading" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", animation: "fadeIn 0.3s ease-out" }}>
          <div className="text-center">
            <div className="text-xl font-bold tracking-widest mb-2" style={{ animation: "glowPulse 1.5s ease-in-out infinite" }}>FAJREZZZ EXPERIENCE</div>
            <div className="text-sm text-white/50">loading...</div>
            <div className="mt-4 w-32 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-indigo-400 rounded-full" style={{ animation: "loadbar 1.2s ease-out forwards" }} />
            </div>
          </div>
        </div>
      )}

      {/* 📱 APP */}
      {stage === "app" && (
        <>
          {/* 🎥 WATCH */}
          {activeTab === "watch" && (
            <section className="flex justify-center py-24 anim-slideup">
              <div className="w-[90%] max-w-[420px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                <iframe className="w-full h-full" src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=lv_7646454190348209425_20260610025241_ul4pfd" />
              </div>
            </section>
          )}

          {/* 📸 EXPERIENCE */}
          {activeTab === "photo" && (
            <section className="py-24 px-4 anim-slideup">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {galleryPhotos.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => { playClick(); openPreview(galleryPhotos, i); }}
                    className="cursor-pointer rounded-2xl overflow-hidden"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", transition: "transform 0.15s ease" }}
                    onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
                    onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <SkeletonImg src={img} className="h-48 w-full object-cover" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 🎮 GAME */}
          {activeTab === "game" && (
            <section className="py-24 text-center px-4 anim-slideup">
              {!selectedGame ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
                    {[
                      { id: "ssstik.io_1781060165448_nrirrw", glow: "rgba(250,204,21,0.2)" },
                      { id: "VID-20260611-WA0003_cfunh3", glow: "rgba(59,130,246,0.2)" },
                      { id: "VID-20260611-WA0005_sjippo", glow: "rgba(139,92,246,0.2)", full: true },
                    ].map((v, i) => (
                      <div key={i} className={`relative ${v.full ? "md:col-span-2" : ""}`} style={{ aspectRatio: "16/9" }}>
                        <div className="absolute rounded-3xl" style={{ inset: "-8px", background: v.glow, filter: "blur(20px)" }} />
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                          <iframe className="w-full h-full" src={`https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=${v.id}`} allow="autoplay; fullscreen" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-white/40 text-sm mb-4 tracking-widest uppercase">Pilih Game</p>
                  <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
                    {[
                      { key: "ml", label: "Mobile Legends", color: "#2563eb" },
                      { key: "ff", label: "Free Fire", color: "#dc2626" },
                      { key: "roblox", label: "Roblox", color: "#7c3aed" },
                    ].map((g) => (
                      <div
                        key={g.key}
                        onClick={() => { playClick(); setSelectedGame(g.key); }}
                        className="p-4 rounded-2xl cursor-pointer text-sm font-semibold"
                        style={{ background: g.color, transition: "transform 0.15s ease" }}
                        onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.94)")}
                        onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      >
                        {g.label}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="anim-slideup">
                  <button onClick={() => { playClick(); setSelectedGame(null); }} className="mb-8 px-5 py-2 rounded-full text-sm" style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)" }}>← Back</button>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
                    {gamePhotos[selectedGame].map((img, i) => (
                      <div
                        key={i}
                        onClick={() => { playClick(); openPreview(gamePhotos[selectedGame!], i); }}
                        className="cursor-pointer rounded-2xl overflow-hidden"
                        style={{ border: "1px solid rgba(255,255,255,0.1)", transition: "transform 0.15s ease" }}
                        onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
                        onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      >
                        <SkeletonImg src={img} className="w-full aspect-video object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* 👤 ABOUT */}
          {activeTab === "about" && (
            <section className="py-24 px-6 anim-slideup">
              <div className="max-w-sm mx-auto flex flex-col items-center gap-6">

                {/* Avatar */}
                <div className="card-in-1 relative">
                  <div
                    className="w-28 h-28 rounded-full overflow-hidden avatar-glow"
                    style={{ border: "2px solid rgba(139,92,246,0.6)" }}
                  >
                    <img src="/1.jpg" className="w-full h-full object-cover" />
                  </div>
                  {/* online dot */}
                  <div
                    className="absolute bottom-1 right-1 w-4 h-4 rounded-full"
                    style={{ background: "#22c55e", border: "2px solid #0f0c29", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }}
                  />
                </div>

                {/* Name & bio */}
                <div className="card-in-2 text-center">
                  <div className="text-2xl font-bold tracking-wider mb-1" style={{ background: "linear-gradient(90deg, #818cf8, #c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    fajrezzz
                  </div>
                  <div className="text-sm italic" style={{ color: "rgba(255,255,255,0.5)" }}>
                    "living for the moments nobody else sees."
                  </div>
                </div>

                {/* Divider */}
                <div className="card-in-2 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }} />

                {/* Stats */}
                <div className="card-in-3 w-full grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: "Photos", value: galleryPhotos.length },
                    { label: "Videos", value: "3" },
                    { label: "Games", value: "3" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-2xl py-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="text-xl font-bold" style={{ color: "#a5b4fc" }}>{s.value}</div>
                      <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Sosmed */}
                <div className="card-in-4 w-full flex flex-col gap-3">
                  {[
                    {
                      label: "TikTok",
                      handle: "@fajrezforyou",
                      url: "https://tiktok.com/@fajrezforyou",
                      color: "#000000",
                      border: "rgba(255,255,255,0.15)",
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                        </svg>
                      ),
                    },
                    {
                      label: "Instagram",
                      handle: "@fajrezforyou",
                      url: "https://instagram.com/fajrezforyou",
                      color: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                      border: "rgba(253,29,29,0.3)",
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <circle cx="12" cy="12" r="4" />
                          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                        </svg>
                      ),
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl"
                      style={{
                        background: typeof s.color === "string" && s.color.startsWith("linear") ? s.color : s.color,
                        border: `1px solid ${s.border}`,
                        textDecoration: "none",
                        transition: "transform 0.15s ease, opacity 0.15s ease",
                      }}
                      onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
                      onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <div style={{ color: "white" }}>{s.icon}</div>
                      <div>
                        <div className="text-sm font-semibold text-white">{s.label}</div>
                        <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{s.handle}</div>
                      </div>
                      <div className="ml-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>

              </div>
            </section>
          )}

          {/* 🔍 LIGHTBOX */}
          {preview && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)", opacity: lightboxVisible ? 1 : 0, transition: "opacity 0.25s ease" }}
              onClick={closePreview}
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                if (touchStartX.current === null) return;
                const diff = touchStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) diff > 0 ? swipeNext() : swipePrev();
                touchStartX.current = null;
              }}
            >
              <button onClick={(e) => { e.stopPropagation(); swipePrev(); }} className="absolute left-3 z-10 text-2xl w-10 h-10 flex items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>‹</button>
              <img key={preview.index} src={preview.photos[preview.index]} onClick={(e) => e.stopPropagation()} className="anim-fadescale" style={{ maxWidth: "90%", maxHeight: "80vh", borderRadius: "16px", boxShadow: "0 25px 60px rgba(0,0,0,0.8)" }} />
              <button onClick={(e) => { e.stopPropagation(); swipeNext(); }} className="absolute right-3 z-10 text-2xl w-10 h-10 flex items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>›</button>
              <div className="absolute bottom-6 flex gap-2">
                {preview.photos.map((_, i) => (
                  <div key={i} style={{ width: i === preview.index ? "20px" : "8px", height: "8px", borderRadius: "4px", background: i === preview.index ? "white" : "rgba(255,255,255,0.3)", transition: "all 0.2s ease" }} />
                ))}
              </div>
              <button onClick={closePreview} className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-sm" style={{ background: "rgba(255,255,255,0.1)" }}>✕</button>
            </div>
          )}

          {/* 📱 BOTTOM NAVBAR */}
          <div
            className="fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center py-3 px-2"
            style={{ background: "rgba(15,12,41,0.85)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            {[
              {
                tab: "watch" as const, label: "WATCH",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>,
              },
              {
                tab: "photo" as const, label: "EXPERIENCE",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
              },
              {
                tab: "game" as const, label: "GAMES",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><line x1="12" y1="10" x2="12" y2="14" /><line x1="10" y1="12" x2="14" y2="12" /><circle cx="17" cy="11" r="0.5" fill="currentColor" /><circle cx="19" cy="13" r="0.5" fill="currentColor" /></svg>,
              },
              {
                tab: "about" as const, label: "ABOUT",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>,
              },
            ].map(({ tab, label, icon }) => (
              <button
                key={tab}
                onClick={() => { playClick(); setActiveTab(tab); if (tab !== "game") setSelectedGame(null); }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "6px 12px", borderRadius: "16px", color: activeTab === tab ? "white" : "rgba(255,255,255,0.35)", transition: "all 0.15s ease", background: activeTab === tab ? "rgba(255,255,255,0.08)" : "transparent" }}
                onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
                onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {icon}
                <span style={{ fontSize: "8px", letterSpacing: "0.08em", fontWeight: 600 }}>{label}</span>
                {activeTab === tab && <div style={{ width: "4px", height: "4px", borderRadius: "2px", background: "rgba(99,102,241,1)" }} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
                  }
