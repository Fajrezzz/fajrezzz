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

  // 🎬 CINEMATIC LIGHTBOX STATE
  const [preview, setPreview] = useState<string | null>(null);
  const [list, setList] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  const open = (arr: string[], i: number) => {
    playClick();
    setList(arr);
    setIndex(i);
    setPreview(arr[i]);
  };

  const next = () => {
    const i = (index + 1) % list.length;
    setIndex(i);
    setPreview(list[i]);
  };

  const prev = () => {
    const i = (index - 1 + list.length) % list.length;
    setIndex(i);
    setPreview(list[i]);
  };

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (!preview) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setPreview(null);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [preview, index]);

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">

      {/* 🌌 CINEMATIC BACKGROUND */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/60 to-black/90" />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-3xl" />
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

      {/* 📸 GALLERY CINEMATIC */}
      {tab === "photo" && (
        <section className="py-20 px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

            {galleryPhotos.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => open(galleryPhotos, i)}
                className="h-72 w-full object-cover rounded-2xl cursor-pointer hover:scale-105 transition duration-500"
              />
            ))}

          </div>
        </section>
      )}

      {/* 🎮 GAME + RESTORED BACK BUTTON */}
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
            <div>

              {/* 🔙 BACK RESTORED */}
              <button
                onClick={() => {
                  playClick();
                  setSelectedGame(null);
                }}
                className="mb-8 px-5 py-2 border rounded-full hover:bg-white/10 transition"
              >
                ← Back to Games
              </button>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

                {gamePhotos[selectedGame].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => open(gamePhotos[selectedGame], i)}
                    className="w-full aspect-[16/9] object-cover rounded-2xl cursor-pointer hover:scale-105 transition"
                  />
                ))}

              </div>
            </div>
          )}

        </section>
      )}

      {/* 🔥 CINEMATIC LIGHTBOX (ULTRA MODE) */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl">

          {/* vignette */}
          <div className="absolute inset-0 bg-radial-gradient opacity-40" />

          {/* image */}
          <img
            src={preview}
            className="max-w-[90%] max-h-[80%] rounded-2xl shadow-2xl animate-[zoomIn_.25s_ease-out]"
          />

          {/* controls */}
          <button onClick={prev} className="absolute left-6 text-4xl">‹</button>
          <button onClick={next} className="absolute right-6 text-4xl">›</button>

          {/* close */}
          <button
            onClick={() => setPreview(null)}
            className="absolute top-6 right-6 px-3 py-1 border rounded-full"
          >
            ✕
          </button>

        </div>
      )}

    </div>
  );
}
