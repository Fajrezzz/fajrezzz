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
      {!loaded && (
        <div className="absolute inset-0 bg-white/10 animate-pulse rounded-2xl" />
      )}
      <img
        src={src}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<"watch" | "photo" | "game">("watch");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ photos: string[]; index: number } | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const touchStartX = useRef<number | null>(null);

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
    setTimeout(() => setLoading(false), 1200);
  }, []);

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
    <div className="min-h-screen text-white relative overflow-x-hidden pb-24"
      style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
    >

      {/* ⚡ LOADING */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
        >
          <div className="text-center">
            <div
              className="text-2xl font-bold tracking-widest mb-2"
              style={{ animation: "pulse 1.5s ease-in-out infinite" }}
            >
              FAJREZZZ EXPERIENCE
            </div>
            <div className="text-sm text-white/50">loading...</div>
            <div className="mt-4 w-32 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
              <div
                className="h-full bg-indigo-400 rounded-full"
                style={{ animation: "loadbar 1.2s ease-out forwards" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 🌌 BACKGROUND GLOW — pakai inline style biar pasti jalan di Android */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            top: "-10%",
            left: "-10%",
            width: "60vw",
            height: "60vw",
            background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-10%",
            right: "-10%",
            width: "60vw",
            height: "60vw",
            background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "40%",
            left: "30%",
            width: "30vw",
            height: "30vw",
            background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes loadbar {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-fadescale {
          animation: fadeScaleIn 0.3s ease-out forwards;
        }
        .anim-slideup {
          animation: slideUp 0.35s ease-out forwards;
        }
      `}</style>

      {/* 🎥 WATCH */}
      {activeTab === "watch" && (
        <section className="flex justify-center py-24 anim-slideup">
          <div
            className="w-[90%] max-w-[420px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <iframe
              className="w-full h-full"
              src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=lv_7646454190348209425_20260610025241_ul4pfd"
            />
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
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
                onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
                onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <SkeletonImg
                  src={img}
                  className="h-48 w-full object-cover"
                />
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
              {/* VIDEO GRID */}
              <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">

                {[
                  { id: "ssstik.io_1781060165448_nrirrw", glow: "rgba(250,204,21,0.2)" },
                  { id: "VID-20260611-WA0003_cfunh3", glow: "rgba(59,130,246,0.2)" },
                  { id: "VID-20260611-WA0005_sjippo", glow: "rgba(139,92,246,0.2)", full: true },
                ].map((v, i) => (
                  <div
                    key={i}
                    className={`relative ${v.full ? "md:col-span-2" : ""}`}
                    style={{ aspectRatio: "16/9" }}
                  >
                    <div
                      className="absolute rounded-3xl"
                      style={{
                        inset: "-8px",
                        background: v.glow,
                        filter: "blur(20px)",
                      }}
                    />
                    <div
                      className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <iframe
                        className="w-full h-full"
                        src={`https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=${v.id}`}
                        allow="autoplay; fullscreen"
                      />
                    </div>
                  </div>
                ))}

              </div>

              {/* GAME SELECTOR */}
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
                    style={{
                      background: g.color,
                      transition: "transform 0.15s ease",
                    }}
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
              <button
                onClick={() => { playClick(); setSelectedGame(null); }}
                className="mb-8 px-5 py-2 rounded-full text-sm"
                style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)" }}
              >
                ← Back
              </button>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {gamePhotos[selectedGame].map((img, i) => (
                  <div
                    key={i}
                    onClick={() => { playClick(); openPreview(gamePhotos[selectedGame!], i); }}
                    className="cursor-pointer rounded-2xl overflow-hidden"
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      transition: "transform 0.15s ease",
                    }}
                    onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
                    onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <SkeletonImg
                      src={img}
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 🔍 LIGHTBOX */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(20px)",
            opacity: lightboxVisible ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}
          onClick={closePreview}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) diff > 0 ? swipeNext() : swipePrev();
            touchStartX.current = null;
          }}
        >
          {/* prev */}
          <button
            onClick={(e) => { e.stopPropagation(); swipePrev(); }}
            className="absolute left-3 z-10 text-2xl w-10 h-10 flex items-center justify-center rounded-full"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            ‹
          </button>

          <img
            key={preview.index}
            src={preview.photos[preview.index]}
            onClick={(e) => e.stopPropagation()}
            className="anim-fadescale"
            style={{
              maxWidth: "90%",
              maxHeight: "80vh",
              borderRadius: "16px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
            }}
          />

          {/* next */}
          <button
            onClick={(e) => { e.stopPropagation(); swipeNext(); }}
            className="absolute right-3 z-10 text-2xl w-10 h-10 flex items-center justify-center rounded-full"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            ›
          </button>

          {/* dots */}
          <div className="absolute bottom-6 flex gap-2">
            {preview.photos.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === preview.index ? "20px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: i === preview.index ? "white" : "rgba(255,255,255,0.3)",
                  transition: "all 0.2s ease",
                }}
              />
            ))}
          </div>

          {/* close */}
          <button
            onClick={closePreview}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-sm"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            ✕
          </button>
        </div>
      )}

      {/* 📱 BOTTOM NAVBAR */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center py-3 px-2"
        style={{
          background: "rgba(15,12,41,0.85)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {[
          {
            tab: "watch" as const,
            label: "WATCH",
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            ),
          },
          {
            tab: "photo" as const,
            label: "EXPERIENCE",
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            ),
          },
          {
            tab: "game" as const,
            label: "GAMES",
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <line x1="12" y1="10" x2="12" y2="14" />
                <line x1="10" y1="12" x2="14" y2="12" />
                <circle cx="17" cy="11" r="0.5" fill="currentColor" />
                <circle cx="19" cy="13" r="0.5" fill="currentColor" />
              </svg>
            ),
          },
        ].map(({ tab, label, icon }) => (
          <button
            key={tab}
            onClick={() => { playClick(); setActiveTab(tab); if (tab !== "game") setSelectedGame(null); }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              padding: "6px 16px",
              borderRadius: "16px",
              color: activeTab === tab ? "white" : "rgba(255,255,255,0.35)",
              transition: "all 0.15s ease",
              background: activeTab === tab ? "rgba(255,255,255,0.08)" : "transparent",
            }}
            onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
            onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {icon}
            <span style={{ fontSize: "9px", letterSpacing: "0.1em", fontWeight: 600 }}>{label}</span>
            {activeTab === tab && (
              <div style={{ width: "4px", height: "4px", borderRadius: "2px", background: "rgba(99,102,241,1)" }} />
            )}
          </button>
        ))}
      </div>

    </div>
  );
}
