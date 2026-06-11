import { useEffect, useState, useRef } from "react";

const galleryPhotos = [
  "/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg", "/6.jpg",
  "/7.jpg", "/8.jpg", "/9.jpg", "/10.jpg"
];

const watchVideos = [
  "lv_7646454190348209425_20260610025241_ul4pfd",
  "VID-20260611-WA0023_nr83xb",
  "VID-20260611-WA0027_fmko3t",
];

const privateVideos = [
  "VID-20260611-WA0033_swyohd",
  "VID-20260611-WA0035_j8slum",
];

const gamePhotos: Record<string, string[]> = {
  ml: ["/ml1.jpg", "/ml2.jpg", "/ml3.jpg"],
  ff: ["/ff1.jpg", "/ff2.jpg", "/ff3.jpg"],
  roblox: ["/roblox1.jpg", "/roblox2.jpg"],
};

const PRIVATE_PASSWORD = "fajrezforyou";
const playClick = () => new Audio("/click.mp3").play();

// 🎉 Confetti mini
function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 6 + 4}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: `hsl(${Math.random() * 360}, 80%, 65%)`,
            borderRadius: "2px",
            animation: `confettiFall ${Math.random() * 2 + 2}s ease-out ${Math.random() * 0.5}s forwards`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { opacity: 1; transform: translateY(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(80vh) rotate(720deg); }
        }
      `}</style>
    </div>
  );
}

// ❤️ Floating heart
function FloatingHeart({ x, y }: { x: number; y: number }) {
  return (
    <div
      className="fixed pointer-events-none z-[65] text-2xl"
      style={{ left: x, top: y, animation: "heartFloat 0.8s ease-out forwards" }}
    >
      ❤️
      <style>{`
        @keyframes heartFloat {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-40px) scale(1.4); }
        }
      `}</style>
    </div>
  );
}

// ⌨️ Typewriter
function Typewriter({ text, speed = 40 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return (
    <span>
      {displayed}
      <span className="animate-pulse" style={{ color: "rgba(255,255,255,0.6)" }}>|</span>
    </span>
  );
}

// 🖱️ Custom cursor (desktop only)
function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);
  if (typeof window === "undefined") return null;
  return (
    <div
      className="fixed pointer-events-none z-[70] transition-opacity duration-200"
      style={{
        left: pos.x - 10,
        top: pos.y - 10,
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "rgba(139,92,246,0.6)",
        boxShadow: "0 0 20px 8px rgba(139,92,246,0.5)",
        opacity: visible ? 1 : 0,
      }}
    />
  );
}

// Image tanpa watermark + border RGB shimmer
function GalleryImage({ src, className }: { src: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-2xl w-full h-full rgb-border group">
      {!loaded && <div className="absolute inset-0 bg-white/10 animate-pulse rounded-2xl" />}
      <img
        src={src}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-all duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        draggable={false}
        style={{ userSelect: "none", WebkitTouchCallout: "none" }}
      />
      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.3) 100%)" }} />
    </div>
  );
}

// Partikel ringan
function Particles() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            animation: `particleFloat ${Math.random() * 6 + 4}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes particleFloat {
          from { transform: translateY(0px); opacity: 0.3; }
          to { transform: translateY(-20px); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState<"intro" | "loading" | "app">("intro");
  const [introOut, setIntroOut] = useState(false);
  const [lightning, setLightning] = useState(false);
  const [activeTab, setActiveTab] = useState<"watch" | "photo" | "game" | "about" | "private">("watch");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ photos: string[]; index: number } | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [watchIndex, setWatchIndex] = useState(0);
  const [privateUnlocked, setPrivateUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordShake, setPasswordShake] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const [showConfetti, setShowConfetti] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, number>>({});
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [sending, setSending] = useState(false);

  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponses, setAiResponses] = useState<{ model: string; answer: string }[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getWIB = () =>
    time.toLocaleTimeString("id-ID", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

  const getWIBDate = () =>
    time.toLocaleDateString("id-ID", {
      timeZone: "Asia/Jakarta",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getWIBHour = () => {
    const wib = new Date(time.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
    return wib.getHours();
  };

  const greet = () => {
    const h = getWIBHour();
    if (h >= 5 && h < 11) return "Selamat pagi ☀️";
    if (h >= 11 && h < 15) return "Selamat siang 🌤️";
    if (h >= 15 && h < 18) return "Selamat sore 🌅";
    return "Selamat malam 🌙";
  };

  const getGradient = () => {
    const h = getWIBHour();
    if (h >= 5 && h < 11) return "linear-gradient(135deg, #ffd6a5, #f9c8e8, #b8c0ff)";
    if (h >= 11 && h < 15) return "linear-gradient(135deg, #74ebd5, #9face6, #6a82fb)";
    if (h >= 15 && h < 18) return "linear-gradient(135deg, #fbc2eb, #a18cd1, #fad0c4)";
    return "linear-gradient(135deg, #0f0c29, #302b63, #24243e)";
  };

  useEffect(() => {
    const visited = localStorage.getItem("fajrez_visited");
    if (!visited) {
      const current = parseInt(localStorage.getItem("fajrez_visitors") || "0", 10);
      localStorage.setItem("fajrez_visitors", String(current + 1));
      localStorage.setItem("fajrez_visited", "true");
    }
  }, []);

  const dailyQuote = (() => {
    const quotes = [
      "Dalam diam aku merakit rindu, hanya untukmu.",
      "Setiap detak jam ini mengingatkanku padamu.",
      "Langit malam tak pernah sepi, selalu ada bintang yang menemani.",
      "Kehadiranmu adalah puisi tanpa kata.",
      "Jarak tak berarti ketika hati saling menggenggam.",
      "Kamu adalah alasan aku percaya pada keajaiban.",
      "Senyummu adalah mentari di pagi paling kelabu.",
      "Aku menyimpanmu di ruang terdalam, tempat harapan bersemayam.",
    ];
    const dayIndex = new Date().getDate() % quotes.length;
    return quotes[dayIndex];
  })();

  useEffect(() => {
    const stored = localStorage.getItem("fajrez_likes");
    if (stored) setLikedPhotos(JSON.parse(stored));
  }, []);

  const handleDoubleTap = (e: React.MouseEvent | React.TouchEvent, photoKey: string) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const id = Date.now();
    setHearts(prev => [...prev, { id, x: clientX, y: clientY }]);
    setTimeout(() => setHearts(prev => prev.filter(h => h.id !== id)), 800);
    const current = likedPhotos[photoKey] || 0;
    const updated = { ...likedPhotos, [photoKey]: current + 1 };
    setLikedPhotos(updated);
    localStorage.setItem("fajrez_likes", JSON.stringify(updated));
    playClick();
  };

  const sendGuestbook = async () => {
    if (!guestName.trim() || !guestMessage.trim()) return;
    setSending(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/fajrezzz22@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: guestName.trim(),
          message: guestMessage.trim(),
          _subject: "Pesan Buku Tamu dari FAJREZ FOR YOU",
          _captcha: "false",
        }),
      });
      if (response.ok) {
        alert("Pesan terkirim! 🎉");
        setGuestName("");
        setGuestMessage("");
        playClick();
      } else {
        alert("Gagal mengirim. Coba lagi nanti.");
      }
    } catch {
      alert("Gagal mengirim. Periksa koneksi.");
    } finally {
      setSending(false);
    }
  };

  const askAI = () => {
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    const chatGptAnswers = [
      "Hmm, pertanyaan yang menarik! Aku rasa jawabannya adalah... cinta. Selalu cinta.",
      "Kalau aku boleh jujur, itu tergantung hati. Tapi aku yakin, kamu sudah tahu jawabannya sejak awal.",
      "Aku hanya bisa berharap, semesta selalu menjawabmu dengan cara yang paling indah.",
      "Tidak ada yang mustahil selama kamu masih bernafas dan melihat bintang.",
    ];
    const claudeAnswers = [
      "Dengan penuh kehangatan, aku melihat pertanyaanmu seperti puitis fajar. Biarkan hatimu tenang, semua akan baik-baik saja.",
      "Aku Claude, dan aku percaya, setiap pertanyaan adalah pintu menuju kebijaksanaan. Jawabannya ada di ketenangan.",
      "Hidup ini misteri, dan kita hanya perlu menikmati setiap momen. Tidak perlu terburu-buru mencari jawaban.",
    ];
    const deepSeekAnswers = [
      "Wah, pertanyaanmu keren! Aku sih jawab: yakin aja, karena kamu spesial.✨",
      "Jawabannya sederhana: lakukan apa yang hatimu katakan. Aku selalu mendukungmu.",
      "Kata orang bijak, rahasia kebahagiaan adalah menikmati prosesnya. Jadi, nikmati saja dulu.",
    ];
    setTimeout(() => {
      setAiResponses([
        { model: "ChatGPT", answer: chatGptAnswers[Math.floor(Math.random() * chatGptAnswers.length)] },
        { model: "Claude", answer: claudeAnswers[Math.floor(Math.random() * claudeAnswers.length)] },
        { model: "DeepSeek", answer: deepSeekAnswers[Math.floor(Math.random() * deepSeekAnswers.length)] },
      ]);
      setAiLoading(false);
    }, 1500);
    playClick();
  };

  // ⚡ Enter + PETIR (dengan warna kilat asli)
  const enterApp = () => {
    playClick();
    setLightning(true);
    // Suara petir (pastikan thunder.mp3 ada di folder public)
    new Audio("/thunder.mp3").play();
    setTimeout(() => {
      setLightning(false);
      setIntroOut(true);
      setTimeout(() => {
        setStage("loading");
        setTimeout(() => {
          setStage("app");
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }, 1200);
      }, 600);
    }, 800); // durasi flash 800ms, lebih pas dengan suara
  };

  const openPreview = (photos: string[], index: number) => {
    setPreview({ photos, index });
    setTimeout(() => setLightboxVisible(true), 10);
  };
  const closePreview = () => {
    setLightboxVisible(false);
    setTimeout(() => setPreview(null), 250);
  };
  const swipePrev = () => {
    if (!preview) return;
    setPreview({ ...preview, index: (preview.index - 1 + preview.photos.length) % preview.photos.length });
  };
  const swipeNext = () => {
    if (!preview) return;
    setPreview({ ...preview, index: (preview.index + 1) % preview.photos.length });
  };
  const submitPassword = () => {
    if (passwordInput === PRIVATE_PASSWORD) {
      playClick();
      setPrivateUnlocked(true);
      setPasswordError(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setPasswordError(true);
      setPasswordShake(true);
      setTimeout(() => setPasswordShake(false), 500);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!preview) return;
      if (e.key === "ArrowLeft") swipePrev();
      if (e.key === "ArrowRight") swipeNext();
      if (e.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preview]);

  const videoUrl = (publicId: string) =>
    `https://player.cloudinary.com/embed/?cloud_name=dxkbvpaa1&public_id=${publicId}&showDownload=false&showInfo=false`;

  const visitorCount = parseInt(localStorage.getItem("fajrez_visitors") || "0", 10);
  const mainBg = getGradient();

  return (
    <div
      className="min-h-screen text-white relative overflow-x-hidden pb-24"
      style={{
        background: mainBg,
        backgroundAttachment: "fixed",
        userSelect: "none",
        WebkitTouchCallout: "none",
        cursor: "none",
      }}
    >
      {typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches && <CursorGlow />}

      <style>{`
        @keyframes loadbar { from { width: 0%; } to { width: 100%; } }
        @keyframes fadeScaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(1.04); } }
        @keyframes floatUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glowPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes borderShimmer {
          0% { border-color: rgba(99,102,241,0.3); box-shadow: 0 0 12px rgba(99,102,241,0.2); }
          50% { border-color: rgba(139,92,246,0.8); box-shadow: 0 0 24px rgba(139,92,246,0.4); }
          100% { border-color: rgba(99,102,241,0.3); box-shadow: 0 0 12px rgba(99,102,241,0.2); }
        }
        @keyframes rgbBorder {
          0% { border-color: #ff0080; box-shadow: 0 0 15px #ff0080; }
          33% { border-color: #00ff80; box-shadow: 0 0 15px #00ff80; }
          66% { border-color: #0080ff; box-shadow: 0 0 15px #0080ff; }
          100% { border-color: #ff0080; box-shadow: 0 0 15px #ff0080; }
        }
        @keyframes avatarGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.4), 0 0 40px rgba(99,102,241,0.2); }
          50% { box-shadow: 0 0 30px rgba(139,92,246,0.6), 0 0 60px rgba(139,92,246,0.3); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmerText {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        @keyframes lockPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes lightningFlash {
          0% { opacity: 1; transform: scale(1); }
          10% { opacity: 0.9; transform: scale(1.02); }
          20% { opacity: 1; transform: scale(1); }
          30% { opacity: 0.5; transform: scale(1.01); }
          40% { opacity: 0.9; transform: scale(1); }
          100% { opacity: 0; transform: scale(1); }
        }
        .anim-fadescale { animation: fadeScaleIn 0.3s ease-out forwards; }
        .anim-slideup { animation: slideUp 0.35s ease-out forwards; }
        .intro-out { animation: fadeOut 0.6s ease-in forwards; }
        .float-1 { animation: floatUp 0.8s ease-out 0.1s both; }
        .float-2 { animation: floatUp 0.8s ease-out 0.35s both; }
        .float-3 { animation: floatUp 0.8s ease-out 0.6s both; }
        .glow-text { animation: glowPulse 2.5s ease-in-out infinite; }
        .btn-shimmer { animation: borderShimmer 2.5s ease-in-out infinite; }
        .avatar-glow { animation: avatarGlow 3s ease-in-out infinite; }
        .card-in-1 { animation: cardIn 0.5s ease-out 0.1s both; }
        .card-in-2 { animation: cardIn 0.5s ease-out 0.25s both; }
        .card-in-3 { animation: cardIn 0.5s ease-out 0.4s both; }
        .card-in-4 { animation: cardIn 0.5s ease-out 0.55s both; }
        .shimmer-text {
          background: linear-gradient(90deg, #818cf8 0%, #c4b5fd 40%, #ffffff 50%, #c4b5fd 60%, #818cf8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerText 3s linear infinite;
        }
        .shake { animation: shake 0.5s ease-out; }
        .lock-pulse { animation: lockPulse 2s ease-in-out infinite; }
        .rgb-border {
          border: 3px solid #ff0080;
          animation: rgbBorder 4s linear infinite;
          transition: transform 0.3s ease;
        }
        .rgb-border:active { transform: scale(0.96); }
        .nav-btn-circle {
          width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; cursor: pointer;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.4);
          color: white;
          transition: background 0.2s, transform 0.15s;
        }
        .nav-btn-circle:disabled { color: rgba(255,255,255,0.2); cursor: default; }
        .nav-btn-circle:not(:disabled):active { transform: scale(0.9); }
      `}</style>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full" style={{ top: "-20%", left: "-20%", width: "80vw", height: "80vw", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
        <div className="absolute rounded-full" style={{ bottom: "-20%", right: "-20%", width: "80vw", height: "80vw", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)" }} />
      </div>

      <Particles />
      {showConfetti && <Confetti />}
      {hearts.map(h => <FloatingHeart key={h.id} x={h.x} y={h.y} />)}

      {/* ⚡ OVERLAY PETIR (gradasi putih-ungu-biru + getar) */}
      {lightning && (
        <div
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.95) 0%, rgba(200,200,255,0.8) 30%, rgba(100,100,255,0.5) 70%, transparent 100%)",
            animation: "lightningFlash 0.8s ease-out forwards, shake 0.8s ease-out",
          }}
        />
      )}

      {/* INTRO */}
      {stage === "intro" && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${introOut ? "intro-out" : ""}`}
          style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", cursor: "auto" }}
        >
          <Particles />
          <div className="absolute rounded-full" style={{ top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "70vw", height: "70vw", background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
          <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
            <div className="float-1 text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(99,102,241,0.8)" }}>welcome to</div>
            <div className="float-2 flex flex-col items-center gap-1">
              <div className="text-5xl font-bold tracking-widest shimmer-text">FAJREZ</div>
              <div className="text-lg tracking-[0.5em] uppercase glow-text" style={{ color: "rgba(196,181,253,0.7)" }}>for you</div>
            </div>
            <div className="float-2 w-20 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.8), transparent)" }} />
            <div className="float-2 text-sm" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>an experience made for you</div>
            <button
              className="float-3 btn-shimmer mt-4 px-10 py-3 rounded-full text-sm font-semibold"
              style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.4)", color: "white", letterSpacing: "0.2em" }}
              onClick={enterApp}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.12)")}
            >
              ✦ Enter ✦
            </button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {stage === "loading" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: mainBg, animation: "fadeIn 0.3s ease-out", cursor: "auto" }}>
          <div className="text-center">
            <div className="text-xl font-bold tracking-widest mb-2 shimmer-text">FAJREZZZ EXPERIENCE</div>
            <div className="text-sm text-white/50">loading...</div>
            <div className="mt-4 w-32 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-indigo-400 rounded-full" style={{ animation: "loadbar 1.2s ease-out forwards" }} />
            </div>
          </div>
        </div>
      )}

      {/* APP (semua tab sama seperti sebelumnya) */}
      {stage === "app" && (
        <>
          {/* WATCH, EXPERIENCE, GAME, ABOUT, PRIVATE, LIGHTBOX, NAVBAR tidak berubah */}
          {/* ... (salin dari kode lengkap sebelumnya) ... */}
        </>
      )}
    </div>
  );
}
