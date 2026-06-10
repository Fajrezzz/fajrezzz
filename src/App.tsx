import { useEffect, useRef, useState } from "react";

const galleryPhotos = [
  { src: "/1.jpg", caption: "Moment 1" },
  { src: "/2.jpg", caption: "Moment 2" },
  { src: "/3.jpg", caption: "Moment 3" },
  { src: "/4.jpg", caption: "Moment 4" },
  { src: "/5.jpg", caption: "Moment 5" },
  { src: "/6.jpg", caption: "Moment 6" },
];

// typing
function useTyping(text: string, speed = 80) {
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

// fade
function FadeIn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShow(true);
        obs.disconnect();
      }
    }, { threshold: 0.15 });

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

  const title = useTyping("FAJREZZZ FOR YOU ✨", 90);

  const scrollToVideo = () => {
    document.getElementById("video")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-x-hidden text-gray-900">

      {/* 🌈 LIGHT ANIMATED BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 animate-pulse" />

      {/* floating blur shapes */}
      <div className="fixed w-96 h-96 bg-pink-300/30 blur-3xl rounded-full top-[-100px] left-[-100px] -z-10" />
      <div className="fixed w-96 h-96 bg-blue-300/30 blur-3xl rounded-full bottom-[-120px] right-[-120px] -z-10" />

      {/* HERO */}
      <section className="h-screen flex items-center justify-center text-center px-4">

        <div className="backdrop-blur-xl bg-white/40 border border-white/30 p-10 rounded-3xl shadow-2xl">

          <h1 className="text-4xl md:text-6xl font-bold">
            {title}
          </h1>

          <p className="mt-4 text-gray-700">
            A digital space where memories meet creativity
          </p>

          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={scrollToVideo}
              className="px-6 py-3 bg-black text-white rounded-full hover:scale-105 transition"
            >
              Watch Video
            </button>

            <a
              href="#gallery"
              className="px-6 py-3 border border-black/20 rounded-full hover:bg-white/40 transition"
            >
              Explore
            </a>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section id="video" className="py-24 flex justify-center">
        <FadeIn>
          <div className="backdrop-blur-xl bg-white/50 p-4 rounded-3xl shadow-xl border border-white/30">
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
          <h2 className="text-3xl font-bold">About Me</h2>
          <p className="max-w-xl mx-auto text-gray-600 mt-4">
            I don’t just take photos — I collect feelings, moments, and stories
            and turn them into something visual.
          </p>
        </FadeIn>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">

          {galleryPhotos.map((p, i) => (
            <FadeIn key={i}>
              <div
                onClick={() => setSelectedImage(p.src)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <img
                  src={p.src}
                  className="h-64 w-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition" />

                <p className="absolute bottom-3 left-3 text-sm opacity-0 group-hover:opacity-100 transition text-black font-medium">
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
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
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
