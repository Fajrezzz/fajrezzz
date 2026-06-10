import { useState } from "react";

const galleryPhotos = [
  "/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg", "/6.jpg"
];

const gamePhotos: Record<string, string[]> = {
  ml: ["/ml1.jpg", "/ml2.jpg", "/ml3.jpg"],
  ff: ["/ff1.jpg", "/ff2.jpg", "/ff3.jpg"],
  roblox: ["/roblox1.jpg", "/roblox2.jpg", "/roblox3.jpg"],
};

const playClick = () => new Audio("/click.mp3").play();

export default function App() {
  const [tab, setTab] = useState<"watch" | "photo" | "game">("watch");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  return (
    <div className="min-h-screen text-white bg-black">

      {/* 🔥 FIXED TOP TAB BAR */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center gap-4 p-4 backdrop-blur-xl bg-black/60 border-b border-white/10">

        <button
          onClick={() => { playClick(); setTab("watch"); }}
          className={`px-4 py-2 rounded-full border ${
            tab === "watch" ? "bg-white text-black" : "border-white/20"
          }`}
        >
          Watch
        </button>

        <button
          onClick={() => { playClick(); setTab("photo"); }}
          className={`px-4 py-2 rounded-full border ${
            tab === "photo" ? "bg-white text-black" : "border-white/20"
          }`}
        >
          Experience
        </button>

        <button
          onClick={() => { playClick(); setTab("game"); }}
          className={`px-4 py-2 rounded-full border ${
            tab === "game" ? "bg-white text-black" : "border-white/20"
          }`}
        >
          Games
        </button>

      </div>

      {/* HERO SPACER */}
      <div className="h-20" />

      {/* 🎥 WATCH TAB */}
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

      {/* 📸 PHOTO TAB */}
      {tab === "photo" && (
        <section className="py-20 px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

            {galleryPhotos.map((img, i) => (
              <img
                key={i}
                src={img}
                className="h-72 w-full object-cover rounded-2xl hover:scale-105 transition"
              />
            ))}

          </div>
        </section>
      )}

      {/* 🎮 GAME TAB */}
      {tab === "game" && (
        <section className="py-20 text-center px-6">

          {!selectedGame ? (
            <div>
              <h2 className="text-3xl mb-10">SELECT GAME</h2>

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
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

              {gamePhotos[selectedGame].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="h-72 w-full object-cover rounded-2xl"
                />
              ))}

            </div>
          )}

        </section>
      )}

    </div>
  );
}
