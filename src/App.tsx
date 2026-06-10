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
  const [activeTab, setActiveTab] = useState<"watch" | "photo" | "game">("watch");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // 🌌 PARALLAX
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // 🟡 FLOATING PARTICLES
  const [particles, setParticles] = useState(
    Array.from({ length: 12 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.2 + Math.random() * 0.6,
      dirX: Math.random() > 0.5 ? 1 : -1,
      dirY: Math.random() > 0.5 ? 1 : -1,
    }))
  );

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", move);

    // particle animation loop
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => {
          let nx = p.x + p.dirX * p.speed;
          let ny = p.y + p.dirY * p.speed;

          if (nx > 100 || nx < 0) p.dirX *= -1;
          if (ny > 100 || ny < 0) p.dirY *= -1;

          return {
            ...p,
            x: Math.max(0, Math.min(100, nx)),
            y: Math.max(0, Math.min(100, ny)),
            dirX: p.dirX,
            dirY: p.dirY,
          };
        })
      );
    }, 40);

    return () => {
      window.removeEventListener("mousemove", move);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden scroll-smooth">

      {/* 🌌 BACKGROUND */}
      <div className="fixed inset-0 -z-20 overflow-hidden">

        {/* base */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mouse.x * 6}px, ${mouse.y * 6}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/40 to-black" />
        </div>

        {/* glow */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out opacity-50"
          style={{
            transform: `translate(${mouse.x * 12}px, ${mouse.y * 12}px)`,
          }}
        >
          <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-indigo-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-500/20 blur-3xl rounded-full" />
        </div>

        {/* 🟡 MOVING PARTICLES */}
        <div className="absolute inset-0">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full blur-sm"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px)`,
              }}
            />
          ))}
        </div>

      </div>

      {/* NAVBAR */}
      <div className="fixed top-0 left-0 right-0 z-40 flex justify-center gap-4 p-4 backdrop-blur-xl bg-white/5 border-b border-white/10">

        <button onClick={() => { playClick(); setActiveTab("watch"); }}
          className={`px-4 py-2 rounded-full border transition hover:scale-105 ${
            activeTab === "watch" ? "bg-white text-black" : "border-white/20"
          }`}>
          Watch
        </button>

        <button onClick={() => { playClick(); setActiveTab("photo"); }}
          className={`px-4 py-2 rounded-full border transition hover:scale-105 ${
            activeTab === "photo" ? "bg-white text-black" : "border-white/20"
          }`}>
          Experience
        </button>

        <button onClick={() => { playClick(); setActiveTab("game"); }}
          className={`px-4 py-2 rounded-full border transition hover:scale-105 ${
            activeTab === "game" ? "bg-white text-black" : "border-white/20"
          }`}>
          Games
        </button>

      </div>

      <div className="h-20" />

      {/* 🎥 WATCH */}
      {activeTab === "watch" && (
        <section className="flex justify-center py-24">
          <div className="relative w-[90%] max-w-[420px] aspect-[9/16]">

            {/* 🟡 GOLD GLOW */}
            <div className="absolute -inset-2 bg-yellow-400/20 blur-2xl rounded-3xl" />

            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <iframe
                className="w-full h-full"
                src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=lv_7646454190348209425_20260610025241_ul4pfd"
              />
            </div>
          </div>
        </section>
      )}

      {/* 📸 EXPERIENCE */}
      {activeTab === "photo" && (
        <section className="py-24 px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

            {galleryPhotos.map((img, i) => (
              <div key={i} className="relative group">

                {/* 🟡 GOLD GLOW */}
                <div className="absolute -inset-1 bg-yellow-400/10 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition" />

                <img
                  src={img}
                  onClick={() => {
                    playClick();
                    setPreview(img);
                  }}
                  className="relative h-72 w-full object-cover rounded-2xl cursor-pointer border border-white/10 hover:scale-105 hover:-translate-y-1 transition duration-300"
                />

              </div>
            ))}

          </div>
        </section>
      )}

      {/* 🎮 GAME */}
      {activeTab === "game" && (
        <section className="py-24 text-center px-6">

          {!selectedGame ? (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

              <div onClick={() => setSelectedGame("ml")}
                className="p-6 bg-blue-600 rounded-2xl cursor-pointer hover:scale-105 transition">
                Mobile Legends
              </div>

              <div onClick={() => setSelectedGame("ff")}
                className="p-6 bg-red-600 rounded-2xl cursor-pointer hover:scale-105 transition">
                Free Fire
              </div>

              <div onClick={() => setSelectedGame("roblox")}
                className="p-6 bg-purple-600 rounded-2xl cursor-pointer hover:scale-105 transition">
                Roblox
              </div>

            </div>
          ) : (
            <div>

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
                    className="w-full aspect-[16/9] object-cover rounded-2xl cursor-pointer hover:scale-105 transition duration-300"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
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
