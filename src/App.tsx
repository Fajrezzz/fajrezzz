import { useEffect, useRef, useState } from "react";

const galleryPhotos = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
  "/6.jpg",
];

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
  const scrollToVideo = () => {
    document.getElementById("video-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-zoom-bg"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gold drop-shadow-2xl">
            FAJREZZZ FOR YOU <span className="text-red-500">❤️</span>
          </h1>
          <button
            onClick={scrollToVideo}
            className="mt-12 px-8 py-4 bg-gold text-black font-semibold rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-yellow-500/30"
          >
            Watch Video
          </button>
        </div>
      </section>

      {/* Video Section */}
      <section id="video-section" className="py-20 px-4">
        <FadeIn className="max-w-4xl mx-auto">
          <div className="glassmorphism rounded-3xl p-4 golden-glow">
            <div className="relative pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl">
              <video controls width="100%">
  <source src="https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=lv_7646454190348209425_20260610025241_ul4pfd" type="video/mp4" />
</video>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryPhotos.map((photo, index) => (
              <FadeIn key={index}>
                <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 hover:scale-[1.03]">
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    loading="lazy"
                    className="w-full h-56 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center">
        <p className="text-xl font-semibold text-gold">
          FAJREZZZ <span className="text-red-500">❤️</span>
        </p>
      </footer>
    </div>
  );
}
