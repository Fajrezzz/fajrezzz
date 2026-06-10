import { useEffect, useRef, useState } from "react";

const galleryPhotos = [
  { src: "/1.jpg", caption: "Moment 1" },
  { src: "/2.jpg", caption: "Moment 2" },
  { src: "/3.jpg", caption: "Moment 3" },
  { src: "/4.jpg", caption: "Moment 4" },
  { src: "/5.jpg", caption: "Moment 5" },
  { src: "/6.jpg", caption: "Moment 6" },
];

// 🎬 Typing effect
function useTyping(text: string, speed = 120) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text]);

  return display;
}

// ✨ Fade on scroll
function FadeIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

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
  const [musicOn, setMusicOn] = useState(false);

  const title = useTyping("FAJREZZZ FOR YOU ❤️", 90);

  const scrollToVideo = () => {
    document.getElementById("video")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-black text-white overflow-x-hidden">

      {/* 🎧 MUSIC */}
      {musicOn && (
        <audio autoPlay loop>
          <source src="/music.mp3" type="audio/mp3" />
        </audio>
      )}

      {/* HERO */}
      <section className="h-screen relative flex items-center justify-center text-center overflow-hidden">

        {/* Parallax BG */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
            {title}
          </h1>

          <p className="text-gray-300 mt-3">
            A cinematic personal space
          </p>

          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={scrollToVideo}
              className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition"
            >
              Watch Video
            </button>

            <button
              onClick={() => setMusicOn(!musicOn)}
              className="px-6 py-3 border border-white/40 rounded-full hover:bg-white/10 transition"
            >
              {musicOn ? "Music Off" : "Music On"}
            </button>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section id="video" className="py-24 flex justify-center">
        <FadeIn>
          <div className="backdrop-blur-xl bg-white/5 p-4 rounded-3xl shadow-2xl">
            <iframe
              src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=lv_7646454190348209425_20260610025241_ul4pfd"
              className="w-[320px] md:w-[380px] aspect-[9/16] rounded-2xl"
              allow="autoplay; fullscreen"
            />
          </div>
        </FadeIn>
      </section>

      {/* ABOUT */}
      <section className="py-20 text-center px-4">
        <FadeIn>
          <h2 className="text-3xl font-bold text-yellow-400">
            About Me
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 mt-4">
            I build, I capture, I create. This is my small digital world where
            moments become memories and code becomes art.
          </p>
        </FadeIn>
      </section>

      {/* GALLERY */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-5">

          {galleryPhotos.map((p, i) => (
            <FadeIn key={i}>
              <div
                onClick={() => setSelectedImage(p.src)}
                className="relative group cursor-pointer rounded-2xl overflow-hidden"
              >
                <img
                  src={p.src}
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition" />

                <p className="absolute bottom-3 left-3 text-sm opacity-0 group-hover:opacity-100 transition">
                  {p.caption}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        >
          <img
            src={selectedImage}
            className="max-w-[90%] max-h-[80%] rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-16 text-center text-gray-500">
        FAJREZZZ © 2026
      </footer>
    </div>
  );
    }
