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
  roblox: ["/roblox1.jpg", "/roblox2.jpg", "/roblox3.jpg"],
};

const playClick = () => {
  const audio = new Audio("/click.mp3");
  audio.volume = 0.5;
  audio.play();
};

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

function FadeIn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShow(true);
        obs.disconnect();
      }
    }, { threshold: 0.2 });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [entering, setEntering] = useState(false);

  const title = useTyping("FAJREZZZ // DIGITAL EXPERIENCE", 55);

  const openGame = (game: string) => {
    playClick();
    setEntering(true);

    setTimeout(() => {
      setSelectedGame(game);
      setEntering(false);
    }, 400);
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">

      {/* 🌌 BACKGROUND (FIXED LAYER) */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/50 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.25),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.25),transparent_55%)]" />
      </div>

      {/* ENTER ANIMATION */}
      {entering && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="text-xl tracking-widest opacity-80">
            ENTERING GAME...
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative z-10 h-screen flex items-center justify-center text-center px-4">
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 p-12 rounded-3xl shadow-2xl">
          <h1 className="text-5xl md:text-6xl font-bold tracking-widest">
            {title}
          </h1>
          <p className="mt-4 text-gray-300">
            Next Level Game UI Experience
          </p>
        </div>
      </section>

      {/* 🎥 VIDEO (FIXED VISIBILITY) */}
      <section className="relative z-10 py-28 flex justify-center">
        <FadeIn>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 blur rounded-3xl opacity-60" />
            <div className="relative bg-black/30 p-4 rounded-3xl border border-white/10">
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=lv_7646454190348209425_20260610025241_ul4pfd"
                className="w-[320px] md:w-[420px] aspect-[9/16] rounded-2xl"
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ABOUT */}
      <section className="relative z-10 py-24 text-center px-4">
        <FadeIn>
          <h2 className="text-3xl font-bold">Identity</h2>
          <p className="max-w-xl mx-auto text-gray-400 mt-4">
            This is not just a website. It is a digital presence built from moments and code.
          </p>
        </FadeIn>
      </section>

      {/* 📸 GALLERY (FIXED) */}
      <section className="relative z-10 py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">

          {galleryPhotos.map((p, i) => (
            <FadeIn key={i}>
              <div
                onClick={() => {
                  playClick();
                  setSelectedImage(p.src);
                }}
                className="cursor-pointer rounded-2xl overflow-hidden border border-white/10"
              >
                <img
                  src={p.src}
                  className="h-72 w-full object-cover hover:scale-110 transition duration-500"
                />
              </div>
            </FadeIn>
          ))}

        </div>
      </section>

      {/* 🎮 GAME */}
      <section className="relative z-10 py-28 text-center px-6">

        {!selectedGame ? (
          <FadeIn>
            <h2 className="text-3xl mb-12 tracking-widest">
              SELECT YOUR GAME
            </h2>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

              <div onClick={() => openGame("ml")} className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 cursor-pointer hover:scale-105 transition">
                Mobile Legends
              </div>

              <div onClick={() => openGame("ff")} className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 cursor-pointer hover:scale-105 transition">
                Free Fire
              </div>

              <div onClick={() => openGame("roblox")} className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 cursor-pointer hover:scale-105 transition">
                Roblox
              </div>

            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <button
              onClick={() => {
                playClick();
                setSelectedGame(null);
              }}
              className="mb-10 px-4 py-2 border rounded-full"
            >
              ← Back
            </button>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

              {gamePhotos[selectedGame].map((img, i) => (
                <div
                  key={i}
                  onClick={() => {
                    playClick();
                    setSelectedImage(img);
                  }}
                  className="cursor-pointer rounded-2xl overflow-hidden border border-white/10"
                >
                  <img
                    src={img}
                    className="h-72 w-full object-cover hover:scale-110 transition duration-500"
                  />
                </div>
              ))}

            </div>
          </FadeIn>
        )}

      </section>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        >
          <img src={selectedImage} className="max-w-[90%] max-h-[85%] rounded-2xl" />
        </div>
      )}

      {/* FOOTER */}
      <footer className="relative z-10 py-20 text-center text-gray-400 tracking-widest">
        FAJREZZZ // DIGITAL EXPERIENCE ACTIVE
      </footer>
    </div>
  );
}
