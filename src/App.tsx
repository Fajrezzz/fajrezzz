import { useEffect, useRef, useState } from "react";

const galleryPhotos = [
  { src: "/1.jpg", caption: "Moment 1" },
  { src: "/2.jpg", caption: "Moment 2" },
  { src: "/3.jpg", caption: "Moment 3" },
  { src: "/4.jpg", caption: "Moment 4" },
  { src: "/5.jpg", caption: "Moment 5" },
  { src: "/6.jpg", caption: "Moment 6" },
];

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

  const title = useTyping("FAJREZZZ // DIGITAL EXPERIENCE", 60);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-x-hidden text-white bg-black">

      {/* 🌌 CINEMATIC BACKGROUND LAYERS */}
      <div className="fixed inset-0 -z-20">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>

        {/* fallback glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black/60 to-blue-900/40" />
      </div>

      {/* floating orbs */}
      <div className="fixed w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full top-[-120px] left-[-120px]" />
      <div className="fixed w-[350px] h-[350px] bg-blue-500/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

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
            <button
              onClick={() => scrollTo("video")}
              className="px-6 py-3 bg-white text-black rounded-full hover:scale-105 transition"
            >
              Enter
            </button>

            <button
              onClick={() => scrollTo("gallery")}
              className="px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition"
            >
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section id="video" className="py-28 flex justify-center">
        <FadeIn>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur opacity-60 group-hover:opacity-100 transition" />

            <div className="relative backdrop-blur-xl bg-black/40 p-4 rounded-3xl border border-white/10">
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=lv_7646454190348209425_20260610025241_ul4pfd"
                className="w-[320px] md:w-[420px] aspect-[9/16] rounded-2xl"
                allow="autoplay; fullscreen"
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
            This is not just a website. It is a digital presence — a visual
            identity built from moments, emotions, and code.
          </p>
        </FadeIn>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">

          {galleryPhotos.map((p, i) => (
            <FadeIn key={i}>
              <div
                onClick={() => setSelectedImage(p.src)}
                className="relative group cursor-pointer rounded-2xl overflow-hidden"
              >

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

                <img
                  src={p.src}
                  className="h-72 w-full object-cover scale-105 group-hover:scale-110 transition duration-700"
                />

                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition">
                  <p className="text-sm tracking-wide">{p.caption}</p>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50"
        >
          <img
            src={selectedImage}
            className="max-w-[90%] max-h-[85%] rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-20 text-center text-gray-500 tracking-widest">
        FAJREZZZ // GOD MODE ACTIVE
      </footer>
    </div>
  );
      }
