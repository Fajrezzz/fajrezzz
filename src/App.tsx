import { useEffect, useRef, useState } from "react";

const galleryPhotos = [
  { src: "/1.jpg", caption: "Moment 1" },
  { src: "/2.jpg", caption: "Moment 2" },
  { src: "/3.jpg", caption: "Moment 3" },
  { src: "/4.jpg", caption: "Moment 4" },
  { src: "/5.jpg", caption: "Moment 5" },
  { src: "/6.jpg", caption: "Moment 6" },
];

// Fade animation component
function FadeIn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [selectedImage, setSelectedImage] = useState<null | string>(null);

  const scrollToVideo = () => {
    document
      .getElementById("video-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">

      {/* HERO */}
      <section className="h-screen flex flex-col items-center justify-center text-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold">
            FAJREZZZ <span className="text-red-500">❤️</span>
          </h1>

          <button
            onClick={scrollToVideo}
            className="mt-10 px-6 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition"
          >
            Watch Video
          </button>
        </div>
      </section>

      {/* VIDEO */}
      <section id="video-section" className="py-20 flex justify-center">
        <FadeIn>
          <div className="rounded-2xl overflow-hidden shadow-2xl w-[320px] md:w-[380px]">
            <iframe
              src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=lv_7646454190348209425_20260610025241_ul4pfd"
              className="w-full aspect-[9/16]"
              allow="autoplay; fullscreen"
            />
          </div>
        </FadeIn>
      </section>

      {/* ABOUT */}
      <section className="py-16 text-center px-4">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">
            About Me
          </h2>
          <p className="max-w-xl mx-auto text-gray-300">
            Just a simple person who loves capturing moments and building cool
            things with code.
          </p>
        </FadeIn>
      </section>

      {/* GALLERY */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryPhotos.map((photo, i) => (
            <FadeIn key={i}>
              <div
                onClick={() => setSelectedImage(photo.src)}
                className="relative cursor-pointer overflow-hidden rounded-xl group"
              >
                <img
                  src={photo.src}
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition">
                  <p className="text-sm">{photo.caption}</p>
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
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        >
          <img
            src={selectedImage}
            className="max-w-[90%] max-h-[80%] rounded-xl"
          />
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-400">
        FAJREZZZ ❤️
      </footer>
    </div>
  );
}
