import { useState, useEffect } from "react";

const galleryPhotos = [
  "/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg", "/6.jpg"
];

const gamePhotos: Record<string, string[]> = {
  ml: ["/ml1.jpg", "/ml2.jpg", "/ml3.jpg"],
  ff: ["/ff1.jpg", "/ff2.jpg", "/ff3.jpg"],
  roblox: ["/roblox1.jpg", "/roblox2.jpg"],
};

const playClick = () => new Audio("/click.mp3").play();

export default function App() {
  const [tab, setTab] = useState<"watch" | "photo" | "game">("watch");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // 🔥 GALLERY PRO STATE
  const [preview, setPreview] = useState<string | null>(null);
  const [previewList, setPreviewList] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  const openPreview = (list: string[], i: number) => {
    playClick();
    setPreviewList(list);
    setIndex(i);
    setPreview(list[i]);
  };

  const next = () => {
    const newIndex = (index + 1) % previewList.length;
    setIndex(newIndex);
    setPreview(previewList[newIndex]);
  };

  const prev = () => {
    const newIndex =
      (index - 1 + previewList.length) % previewList.length;
    setIndex(newIndex);
    setPreview(previewList[newIndex]);
  };

  // ⌨️ keyboard support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!preview) return;

      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setPreview(null);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [preview, index, previewList]);

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">

      {/* 🌌 BACKGROUND */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/60 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.35),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_60%)]" />
      </div>

      {/* NAV */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center gap-4 p-4 backdrop-blur-xl bg-black/60 border-b border-white/10">

        <button onClick={() => { playClick(); setTab("watch"); }}
          className={`px-4 py-2 rounded-full border ${tab === "watch" ? "bg-white text-black" : ""}`}>
          Watch
        </button>

        <button onClick={() => { playClick(); setTab("photo"); }}
          className={`px-4 py-2 rounded-full border ${tab === "photo" ? "bg-white text-black" : ""}`}>
          Experience
        </button>

        <button onClick={() => { playClick(); setTab("game"); }}
          className={`px-4 py-2 rounded-full border ${tab === "game" ? "bg-white text-black" : ""}`}>
          Games
        </button>

      </div>

      <div className="h-20" />

      {/* 🎥 WATCH */}
      {tab === "watch" && (
        <section className="flex justify-center py-20">
          <div className="w-[90%] max-w-[420px] aspect-[9/16]">
            <iframe
              className="w-full h-full rounded-2xl"
              src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=lv_7646454190348209425_20260610025241_ul4pfd"
            />
          </div>
        </section>
      )}

      {/* 📸 GALLERY PRO */}
      {tab === "photo" && (
        <section className="py-20 px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

            {galleryPhotos.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => openPreview(galleryPhotos, i)}
                className="h-72 w-full object-cover rounded-2xl cursor-pointer hover:scale-105 transition"
              />
            ))}

          </div>
        </section>
      )}

      {/* 🎮 GAME (still clickable) */}
      {tab === "game" && (
        <section className="py-20 text-center px-6">

          {!selectedGame ? (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

              <div onClick={() => setSelectedGame("ml")} className="p-6 bg-blue-600 rounded-2xl cursor-pointer">
                Mobile Legends
              </div>

              <div onClick={() => setSelectedGame("ff")} className="p-6 bg-red-600 rounded-2xl cursor-pointer">
                Free Fire
              </div>

              <div onClick={() => setSelectedGame("roblox")} className="p-6 bg-purple-600 rounded-2xl cursor-pointer">
                Roblox
              </div>

            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

              {gamePhotos[selectedGame].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => openPreview(gamePhotos[selectedGame], i)}
                  className="w-full aspect-[16/9] object-cover rounded-2xl cursor-pointer hover:scale-105 transition"
                />
              ))}

            </div>
          )}

        </section>
      )}

      {/* 🔥 GALLERY PRO LIGHTBOX */}
      {preview && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50">

          {/* image */}
          <img
            src={preview}
            className="max-w-[90%] max-h-[80%] rounded-2xl shadow-2xl animate-pulse"
          />

          {/* controls */}
          <button onClick={prev} className="absolute left-5 text-3xl">‹</button>
          <button onClick={next} className="absolute right-5 text-3xl">›</button>

          {/* close */}
          <button
            onClick={() => setPreview(null)}
            className="absolute top-5 right-5 px-3 py-1 border rounded-full"
          >
            ✕
          </button>

        </div>
      )}

    </div>
  );
}
