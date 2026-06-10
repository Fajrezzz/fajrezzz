import { useEffect, useRef, useState } from "react";

const galleryPhotos = [
  { src: "/1.jpg", caption: "Moment 1" },
  { src: "/2.jpg", caption: "Moment 2" },
  { src: "/3.jpg", caption: "Moment 3" },
  { src: "/4.jpg", caption: "Moment 4" },
  { src: "/5.jpg", caption: "Moment 5" },
  { src: "/6.jpg", caption: "Moment 6" },
];

const gamePhotos: Record<string, string[]> = {
  ml: ["/ml1.jpg", "/ml2.jpg", "/ml3.jpg"],
  ff: ["/ff1.jpg", "/ff2.jpg", "/ff3.jpg"],
  roblox: ["/roblox1.jpg", "/roblox2.jpg"],
};

const playClick = () => new Audio("/click.mp3").play();

function useTyping(text: string, speed = 55) {
  const [t, setT] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setT(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text]);
  return t;
}

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // 🎬 WATCH MODE
  const [watchMode, setWatchMode] = useState(false);

  const videoRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  const title = useTyping("FAJREZZZ // DIGITAL EXPERIENCE", 55);

  const startWatch = () => {
    playClick();
    setWatchMode(true);

    // 🎥 scroll ke video
    setTimeout(() => {
      videoRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);

    // 📸 ke gallery
    setTimeout(() => {
      galleryRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 2500);

    // 🎮 ke games
    setTimeout(() => {
      gameRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 5000);
  };

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-blue-900/40 via-purple-900/50 to-black/90" />

      {/* HERO */}
      <section className="h-screen flex items-center justify-center text-center px-4">
        <div className="backdrop-blur-2xl bg-white/5 p-10 rounded-3xl border border-white/10">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="text-gray-300 mt-4">Cinematic Experience Mode</p>

          {/* 🎬 WATCH BUTTON */}
          <button
            onClick={startWatch}
            className="mt-8 px-6 py-3 bg-white text-black rounded-full hover:scale-105 transition"
          >
            WATCH EXPERIENCE
          </button>
        </div>
      </section>

      {/* 🎥 VIDEO */}
      <section ref={videoRef} className="py-24 flex justify-center">
        <div className="w-[90%] max-w-[420px] aspect-[9/16]">
          <iframe
            className="w-full h-full rounded-2xl border"
            src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=lv_7646454190348209425_20260610025241_ul4pfd"
          />
        </div>
      </section>

      {/* 📸 GALLERY */}
      <section ref={galleryRef} className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">

          {galleryPhotos.map((p, i) => (
            <img
              key={i}
              src={p.src}
              onClick={() => {
                playClick();
                setSelectedImage(p.src);
              }}
              className="h-72 w-full object-cover rounded-2xl cursor-pointer hover:scale-105 transition"
            />
          ))}

        </div>
      </section>

      {/* 🎮 GAMES (LAST EXPERIENCE) */}
      <section ref={gameRef} className="py-24 text-center px-6">

        {!selectedGame ? (
          <div>
            <h2 className="text-3xl mb-10">FINAL EXPERIENCE</h2>

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
