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

  // ⚡ LOADING SCREEN
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden scroll-smooth">

      {/* ⚡ LOADING INTRO */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center animate-pulse">
            <div className="text-xl tracking-widest">
              FAJREZZZ EXPERIENCE
            </div>
            <div className="text-sm text-white/50 mt-2">
              loading...
            </div>
          </div>
        </div>
      )}

      {/* 🌌 BACKGROUND PREMIUM MOBILE */}
<div className="fixed inset-0 -z-20 overflow-hidden">

  {/* Base Aurora */}
  <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-black" />

  {/* Aurora 1 */}
  <div
    className="absolute w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-[120px] animate-[spin_25s_linear_infinite]"
    style={{
      top: "-10%",
      left: "-10%",
    }}
  />

  {/* Aurora 2 */}
  <div
    className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[120px] animate-[spin_35s_linear_infinite_reverse]"
    style={{
      bottom: "-10%",
      right: "-10%",
    }}
  />

  {/* Aurora 3 */}
  <div
    className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/15 blur-[100px] animate-pulse"
    style={{
      top: "40%",
      left: "30%",
    }}
  />

  {/* Floating Particles */}
  {[...Array(20)].map((_, i) => (
    <div
      key={i}
      className="absolute bg-white rounded-full opacity-30"
      style={{
        width: Math.random() * 4 + 2,
        height: Math.random() * 4 + 2,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animation: `float ${6 + Math.random() * 10}s ease-in-out infinite`,
      }}
    />
  ))}

  {/* Lightning Flash */}
  <div className="lightning-flash" />

</div>

        {/* particles */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translate(${mouse.x * 20}px, ${mouse.y * 20}px)`,
          }}
        >
          <div className="absolute top-[25%] left-[35%] w-1.5 h-1.5 bg-white/40 rounded-full blur-sm" />
          <div className="absolute top-[65%] left-[70%] w-1 h-1 bg-blue-300/40 rounded-full blur-sm" />
          <div className="absolute top-[45%] left-[80%] w-1 h-1 bg-indigo-300/40 rounded-full blur-sm" />
        </div>

      </div>

      {/* NAVBAR (GLASS UI) */}
      <div className="
fixed
top-4
left-1/2
-z-0
-translate-x-1/2
flex
gap-3
px-3
py-2
rounded-full
backdrop-blur-2xl
bg-white/10
border
border-white/10
shadow-2xl
">

        <button
          onClick={() => { playClick(); setActiveTab("watch"); }}
          className={`px-4 py-2 rounded-full border transition hover:scale-105 ${
            activeTab === "watch" ? "bg-white text-black" : "border-white/20"
          }`}
        >
          Watch
        </button>

        <button
          onClick={() => { playClick(); setActiveTab("photo"); }}
          className={`px-4 py-2 rounded-full border transition hover:scale-105 ${
            activeTab === "photo" ? "bg-white text-black" : "border-white/20"
          }`}
        >
          Experience
        </button>

        <button
          onClick={() => { playClick(); setActiveTab("game"); }}
          className={`px-4 py-2 rounded-full border transition hover:scale-105 ${
            activeTab === "game" ? "bg-white text-black" : "border-white/20"
          }`}
        >
          Games
        </button>

      </div>

      <div className="h-20" />

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
              <img
                key={i}
                src={img}
                onClick={() => {
                  playClick();
                  setPreview(img);
                }}
                className="
h-72
w-full
object-cover
rounded-3xl
cursor-pointer
border
border-white/10
hover:scale-105
transition-all
duration-500
shadow-[0_20px_60px_rgba(0,0,0,0.4)]
"
              />
            ))}

          </div>
        </section>
      )}

      {/* 🎮 GAME */}
      {activeTab === "game" && (
        <section className="py-24 text-center px-6 scroll-mt-24">
          {/* 🎥 GAME VIDEO (TARUH DI SINI) */}
<div className="flex justify-center mb-10">
  <div className="relative w-[90%] max-w-[520px] aspect-video">

    {/* glow */}
    <div className="absolute -inset-2 bg-yellow-400/20 blur-2xl rounded-3xl" />

    {/* frame */}
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <iframe
        className="w-full h-full"
        src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=ssstik.io_1781060165448_nrirrw"
        allow="autoplay; fullscreen"
      />
    </div>

  </div>
</div>

          {!selectedGame ? (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

              <div onClick={() => setSelectedGame("ml")} className="p-6 bg-blue-600 rounded-2xl cursor-pointer hover:scale-105 transition">
                Mobile Legends
              </div>

              <div onClick={() => setSelectedGame("ff")} className="p-6 bg-red-600 rounded-2xl cursor-pointer hover:scale-105 transition">
                Free Fire
              </div>

              <div onClick={() => setSelectedGame("roblox")} className="p-6 bg-purple-600 rounded-2xl cursor-pointer hover:scale-105 transition">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl"
        >
          <img
            src={preview}
            className="max-w-[90%] max-h-[80%] rounded-2xl shadow-2xl animate-[fadeIn_0.2s_ease-out]"
          />
        </div>
      )}

    </div>
  );
}
