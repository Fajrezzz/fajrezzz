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
    <div className="relative overflow-hidden rounded-2xl">
      {!loaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse rounded-2xl" />
      )}
      <img
        src={src}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<"watch" | "photo" | "game">("watch");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ photos: string[]; index: number } | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  // swipe
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
    const move = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", move);
    setTimeout(() => setLoading(false), 1200);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // keyboard swipe
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
    <div className="min-h-screen text-white relative overflow-x-hidden scroll-smooth pb-24">

      {/* ⚡ LOADING */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center animate-pulse">
            <div className="text-xl tracking-widest">FAJREZZZ EXPERIENCE</div>
            <div className="text-sm text-white/50 mt-2">loading...</div>
          </div>
        </div>
      )}

      {/* 🌌 BACKGROUND */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `translate(${mouse.x * 6}px, ${mouse.y * 6}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/40 to-black" />
        </div>
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out opacity-50"
          style={{ transform: `translate(${mouse.x * 12}px, ${mouse.y * 12}px)` }}
        >
          <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-indigo-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-500/20 blur-3xl rounded-full" />
        </div>
        <div
          className="absolute inset-0 opacity-30"
          style={{ transform: `translate(${mouse.x * 20}px, ${mouse.y * 20}px)` }}
        >
          <div className="absolute top-[25%] left-[35%] w-1.5 h-1.5 bg-white/40 rounded-full blur-sm" />
          <div className="absolute top-[65%] left-[70%] w-1 h-1 bg-blue-300/40 rounded-full blur-sm" />
          <div className="absolute top-[45%] left-[80%] w-1 h-1 bg-indigo-300/40 rounded-full blur-sm" />
        </div>
      </div>

      {/* 🎥 WATCH */}
      {activeTab === "watch" && (
        <section className="flex justify-center py-24 scroll-mt-24">
          <div className="w-[90%] max-w-[420px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              className="w-full h-full"
              src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=lv_7646454190348209425_20260610025241_ul4pfd"
            />
          </div>
        </section>
      )}

      {/* 📸 EXPERIENCE */}
      {activeTab === "photo" && (
        <section className="py-24 px-6 scroll-mt-24">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {galleryPhotos.map((img, i) => (
              <div
                key={i}
                onClick={() => { playClick(); openPreview(galleryPhotos, i); }}
                className="cursor-pointer active:scale-95 transition duration-150"
              >
                <SkeletonImg
                  src={img}
                  className="h-72 w-full object-cover rounded-2xl border border-white/10 hover:scale-105 hover:-translate-y-1 transition duration-300"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 🎮 GAME */}
      {activeTab === "game" && (
        <section className="py-24 text-center px-6 scroll-mt-24">
          {!selectedGame ? (
            <>
              {/* 🎥 VIDEO GRID */}
              <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
                <div className="relative aspect-video">
                  <div className="absolute -inset-2 bg-yellow-400/20 blur-2xl rounded-3xl" />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <iframe
                      className="w-full h-full"
                      src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=ssstik.io_1781060165448_nrirrw"
                      allow="autoplay; fullscreen"
                    />
                  </div>
                </div>
                <div className="relative aspect-video">
                  <div className="absolute -inset-2 bg-blue-400/20 blur-2xl rounded-3xl" />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <iframe
                      className="w-full h-full"
                      src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=VID-20260611-WA0003_cfunh3"
                      allow="autoplay; fullscreen"
                    />
                  </div>
                </div>
                <div className="relative aspect-video md:col-span-2">
                  <div className="absolute -inset-2 bg-purple-400/20 blur-2xl rounded-3xl" />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <iframe
                      className="w-full h-full"
                      src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=VID-20260611-WA0005_sjippo"
                      allow="autoplay; fullscreen"
                    />
                  </div>
                </div>
              </div>

              {/* 🎮 GAME SELECTOR */}
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div onClick={() => setSelectedGame("ml")} className="p-6 bg-blue-600 rounded-2xl cursor-pointer hover:scale-105 active:scale-95 transition">
                  Mobile Legends
                </div>
                <div onClick={() => setSelectedGame("ff")} className="p-6 bg-red-600 rounded-2xl cursor-pointer hover:scale-105 active:scale-95 transition">
                  Free Fire
                </div>
                <div onClick={() => setSelectedGame("roblox")} className="p-6 bg-purple-600 rounded-2xl cursor-pointer hover:scale-105 active:scale-95 transition">
                  Roblox
                </div>
              </div>
            </>
          ) : (
            <div>
              <button
                onClick={() => { playClick(); setSelectedGame(null); }}
                className="mb-8 px-5 py-2 border rounded-full hover:bg-white/10 active:scale-95 transition"
              >
                ← Back
              </button>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {gamePhotos[selectedGame].map((img, i) => (
                  <div
                    key={i}
                    onClick={() => { playClick(); openPreview(gamePhotos[selectedGame!], i); }}
                    className="cursor-pointer active:scale-95 transition duration-150"
                  >
                    <SkeletonImg
                      src={img}
                      className="w-full aspect-[16/9] object-cover rounded-2xl hover:scale-105 transition duration-300"
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
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl transition-opacity duration-250 ${lightboxVisible ? "opacity-100" : "opacity-0"}`}
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
            className="absolute left-4 text-3xl px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 active:scale-90 transition z-10"
          >
            ‹
          </button>

          <img
            key={preview.index}
            src={preview.photos[preview.index]}
            className={`max-w-[90%] max-h-[80%] rounded-2xl shadow-2xl transition-all duration-250 ${lightboxVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
            onClick={(e) => e.stopPropagation()}
          />

          {/* next */}
          <button
            onClick={(e) => { e.stopPropagation(); swipeNext(); }}
            className="absolute right-4 text-3xl px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 active:scale-90 transition z-10"
          >
            ›
          </button>

          {/* dots */}
          <div className="absolute bottom-6 flex gap-2">
            {preview.photos.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${i === preview.index ? "bg-white scale-125" : "bg-white/30"}`}
              />
            ))}
          </div>

          {/* close */}
          <button
            onClick={closePreview}
            className="absolute top-4 right-4 text-xl px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition"
          >
            ✕
          </button>
        </div>
      )}

      {/* 📱 BOTTOM NAVBAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center py-3 px-6 backdrop-blur-xl bg-white/5 border-t border-white/10">

        <button
          onClick={() => { playClick(); setActiveTab("watch"); setSelectedGame(null); }}
          className={`flex flex-col items-center gap-1 px-4 py-1 rounded-2xl transition active:scale-90 ${activeTab === "watch" ? "text-white" : "text-white/40"}`}
        >
          <span className="text-xl">🎥</span>
          <span className="text-[10px] tracking-widest">WATCH</span>
          {activeTab === "watch" && <div className="w-1 h-1 rounded-full bg-white" />}
        </button>

        <button
          onClick={() => { playClick(); setActiveTab("photo"); setSelectedGame(null); }}
          className={`flex flex-col items-center gap-1 px-4 py-1 rounded-2xl transition active:scale-90 ${activeTab === "photo" ? "text-white" : "text-white/40"}`}
        >
          <span className="text-xl">📸</span>
          <span className="text-[10px] tracking-widest">EXPERIENCE</span>
          {activeTab === "photo" && <div className="w-1 h-1 rounded-full bg-white" />}
        </button>

        <button
          onClick={() => { playClick(); setActiveTab("game"); }}
          className={`flex flex-col items-center gap-1 px-4 py-1 rounded-2xl transition active:scale-90 ${activeTab === "game" ? "text-white" : "text-white/40"}`}
        >
          <span className="text-xl">🎮</span>
          <span className="text-[10px] tracking-widest">GAMES</span>
          {activeTab === "game" && <div className="w-1 h-1 rounded-full bg-white" />}
        </button>

      </div>

    </div>
  );
}
