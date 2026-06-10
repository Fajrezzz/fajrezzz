import { useEffect, useRef, useState } from "react";

const galleryPhotos = [
  { src: "/1.jpg", caption: "Moment 1" },
  { src: "/2.jpg", caption: "Moment 2" },
  { src: "/3.jpg", caption: "Moment 3" },
  { src: "/4.jpg", caption: "Moment 4" },
  { src: "/5.jpg", caption: "Moment 5" },
  { src: "/6.jpg", caption: "Moment 6" },
];

// GAME PHOTOS
const gamePhotos: Record<string, string[]> = {
  ml: ["/ml1.jpg", "/ml2.jpg", "/ml3.jpg"],
  ff: ["/ff1.jpg", "/ff2.jpg", "/ff3.jpg"],
  roblox: ["/roblox1.jpg", "/roblox2.jpg", "/roblox3.jpg"],
};

// 🔊 click sound
const playClick = () => {
  const audio = new Audio("/click.mp3");
  audio.volume = 0.5;
  audio.play();
};

// typing effect
function useTyping(text: string, speed = 70) {
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

// fade in
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

  const title = useTyping("FAJREZZZ // DIGITAL EXPERIENCE", 60);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const openGame = (game: string) => {
    playClick();
    setEntering(true);

    setTimeout(() => {
      setSelectedGame(game);
      setEntering(false);
    }, 450);
  };

  return (
    <div className="relative overflow-x-hidden text-white">

      {/* 🌌 BACKGROUND UPDATED */}
      <div className="fixed inset-0 -z-20">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/50 to-black/80" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.25),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.25),transparent_55%)]" />
      </div>

      {/* ENTERING OVERLAY */}
      {entering && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-pulse">
          <div className="text-white tracking-widest text-xl opacity-80">
            ENTERING...
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="h-screen flex items-center justify-center text-center px-4">
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 p-12 rounded-3xl shadow-2xl">

          <h1 className="text-4xl md:text-6xl font-bold tracking-widest">
            {title}
          </h1>

          <p className="mt-4 text-gray-300">
            A cinematic digital identity experience
          </p>

          <div className="mt-10 flex gap-4 justify-center">
            <button onClick={() => scrollTo("video")} className="px-6 py-3 bg-white text-black rounded-full">
              Enter
            </button>

            <button onClick={() => scrollTo("gallery")} className="px-6 py-3 border border-white/20 rounded-full">
              Explore
            </button>

            <button onClick={() => scrollTo("games")} className="px-6 py-3 border border-purple-400 rounded-full">
              Games
            </button>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section id="video" className="py-28 flex justify-center">
        <FadeIn>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur opacity-60" />

            <div className="relative backdrop-blur-xl bg-black/30 p-4 rounded-3xl border border-white/10">
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=lv_7646454190348209425_20260610025241_ul4pfd"
                className="w-[320px] md:w-[420px] aspect-[9/16] rounded-2xl"
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ABOUT */}
      <section className="py-24 text-center px-4">
        <FadeIn>
          <h2 className="text-3xl font-bold">Identity</h2>
          <p className="max-w-xl mx-auto text-gray-400 mt-4">
            This is not just a website. It is a digital presence.
          </p>
        </FadeIn>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
          {galleryPhotos.map((p, i) => (
            <FadeIn key={i}>
              <div
                onClick={() => {
                  playClick();
                  setSelectedImage(p.src);
                }}
                className="cursor-pointer rounded-2xl overflow-hidden"
              >
                <img src={p.src} className="h-72 w-full object-cover" />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* GAME SECTION */}
      <section id="games" className="py-28 text-center">

        {!selectedGame ? (
          <FadeIn>
            <h2 className="text-3xl mb-10">Choose Your Game</h2>

            <div className="flex flex-wrap justify-center gap-6">
              <button onClick={() => openGame("ml")} className="px-6 py-4 border rounded-xl hover:scale-105 transition">
                Mobile Legends
              </button>

              <button onClick={() => openGame("ff")} className="px-6 py-4 border rounded-xl hover:scale-105 transition">
                Free Fire
              </button>

              <button onClick={() => openGame("roblox")} className="px-6 py-4 border rounded-xl hover:scale-105 transition">
                Roblox
              </button>
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

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-6">
              {gamePhotos[selectedGame].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="rounded-2xl h-72 w-full object-cover"
                />
              ))}
            </div>
          </FadeIn>
        )}

      </section>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <img src={selectedImage} className="max-w-[90%] max-h-[85%]" />
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-20 text-center text-gray-400 tracking-widest">
        FAJREZZZ // GOD MODE ACTIVE
      </footer>
    </div>
  );
    }
