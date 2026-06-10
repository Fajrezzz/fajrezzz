import { useEffect, useRef, useState } from "react";

const galleryPhotos = [
  { src: "/1.jpg" },
  { src: "/2.jpg" },
  { src: "/3.jpg" },
  { src: "/4.jpg" },
  { src: "/5.jpg" },
  { src: "/6.jpg" },
];

const gamePhotos: Record<string, string[]> = {
  ml: ["/ml1.jpg", "/ml2.jpg", "/ml3.jpg"],
  ff: ["/ff1.jpg", "/ff2.jpg", "/ff3.jpg"],
  roblox: ["/roblox1.jpg", "/roblox2.jpg"],
};

const playClick = () => new Audio("/click.mp3").play();

export default function App() {
  const videoRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const scrollTo = (ref: any) => {
    playClick();
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-white bg-black">

      {/* 🌌 NAVBAR (STICKY MENU) */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center gap-4 p-4 backdrop-blur-xl bg-black/40 border-b border-white/10">

        <button
          onClick={() => scrollTo(videoRef)}
          className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10"
        >
          1. Watch
        </button>

        <button
          onClick={() => scrollTo(photoRef)}
          className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10"
        >
          2. Experience
        </button>

        <button
          onClick={() => scrollTo(gameRef)}
          className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10"
        >
          3. Games
        </button>

      </div>

      {/* HERO */}
      <section className="h-screen flex items-center justify-center pt-20">
        <h1 className="text-4xl font-bold tracking-widest">
          FAJREZZZ EXPERIENCE
        </h1>
      </section>

      {/* 🎥 VIDEO SECTION */}
      <section ref={videoRef} className="min-h-screen flex items-center justify-center py-24">
        <div className="w-[90%] max-w-[420px] aspect-[9/16]">
          <iframe
            className="w-full h-full rounded-2xl"
            src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=lv_7646454190348209425_20260610025241_ul4pfd"
          />
        </div>
      </section>

      {/* 📸 PHOTO SECTION */}
      <section ref={photoRef} className="min-h-screen py-24 px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {galleryPhotos.map((p, i) => (
            <img
              key={i}
              src={p.src}
              onClick={() => {
                playClick();
                setSelectedImage(p.src);
              }}
              className="h-72 w-full object-cover rounded-2xl hover:scale-105 transition cursor-pointer"
            />
          ))}

        </div>
      </section>

      {/* 🎮 GAME SECTION */}
      <section ref={gameRef} className="min-h-screen py-24 text-center px-6">

        {!selectedGame ? (
          <div>
            <h2 className="text-3xl mb-10">GAMES</h2>

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
                onClick={() => {
                  playClick();
                  setSelectedImage(img);
                }}
                className="h-72 w-full object-cover rounded-2xl cursor-pointer"
              />
            ))}

          </div>
        )}

      </section>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center"
        >
          <img src={selectedImage} className="max-w-[90%] max-h-[85%] rounded-2xl" />
        </div>
      )}

    </div>
  );
}
