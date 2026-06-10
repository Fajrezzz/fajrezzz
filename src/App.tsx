import { useEffect, useState } from "react";

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

  const [preview, setPreview] = useState<string | null>(null);

  // 🌌 PARALLAX STATE
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">

      {/* 🌌 PARALLAX BACKGROUND (FULL UPGRADE) */}
      <div className="fixed inset-0 -z-20 overflow-hidden">

        {/* base gradient */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/60 to-black/90" />
        </div>

        {/* glow layer */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${mouse.x * 25}px, ${mouse.y * 25}px)`,
          }}
        >
          <div className="absolute top-[-120px] left-[-120px] w-[450px] h-[450px] bg-purple-500/30 blur-3xl rounded-full" />
          <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-blue-500/30 blur-3xl rounded-full" />
        </div>

        {/* particles layer */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${mouse.x * 40}px, ${mouse.y * 40}px)`,
          }}
        >
          <div className="absolute top-[20%] left-[30%] w-2 h-2 bg-white/40 rounded-full blur-sm animate-pulse" />
          <div className="absolute top-[60%] left-[70%] w-2 h-2 bg-blue-300/40 rounded-full blur-sm animate-pulse" />
          <div className="absolute top-[40%] left-[80%] w-2 h-2 bg-purple-300/40 rounded-full blur-sm animate-pulse" />
          <div className="absolute top-[75%] left-[20%] w-3 h-3 bg-white/30 rounded-full blur-sm animate-pulse" />
        </div>

      </div>

      {/* NAVBAR */}
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
              className="w-full h-full rounded-2xl border border-white/10"
              src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=lv_7646454190348209425_20260610025241_ul4pfd"
            />
          </div>
        </section>
      )}

      {/* 📸 PHOTO */}
      {tab === "photo" && (
        <section className="py-20 px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

            {galleryPhotos.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => {
                  playClick();
                  setPreview(img);
                }}
                className="h-72 w-full object-cover rounded-2xl cursor-pointer hover:scale-105 transition"
              />
            ))}

          </div>
        </section>
      )}

      {/* 🎮 GAME */}
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

              {/* 🔙 BACK (RESTORED + SAFE) */}
              <button
                onClick={() => {
                  playClick();
                  setSelectedGame(null);
                }}
                className="mb-8 px-5 py-2 border rounded-full hover:bg-white/10 transition"
              >
                ← Back
              </button>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

                {gamePhotos[selectedGame].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => {
                      playClick();
                      setPreview(img);
                    }}
                    className="w-full aspect-[16/9] object-cover rounded-2xl cursor-pointer hover:scale-105 transition"
                  />
                ))}

              </div>
            </div>
          )}

        </section>
      )}

      {/* 🔍 LIGHTBOX */}
      {preview && (
        <div
          onClick={() => setPreview(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl"
        >
          <img
            src={preview}
            className="max-w-[90%] max-h-[80%] rounded-2xl shadow-2xl"
          />
        </div>
      )}

    </div>
  );
        }
