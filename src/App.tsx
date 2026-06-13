import { useEffect, useState, useRef, useCallback } from "react";

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
        background: "rgba(0, 255, 200, 0.6)",
        boxShadow: "0 0 20px 8px rgba(0, 255, 200, 0.5)",
        opacity: visible ? 1 : 0,
      }}
    />
  );
}

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

function Particles() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            animation: `particleFloat ${Math.random() * 6 + 4}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes particleFloat {
          from { transform: translateY(0px); opacity: 0.2; }
          to { transform: translateY(-15px); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

// 🐱 Flappy Kucing Canvas (lancar 60fps)
function FlappyCanvasGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameState = useRef({
    catY: 250,
    catVel: 0,
    pipes: [] as { x: number; top: number; passed: boolean }[],
    score: 0,
    highScore: parseInt(localStorage.getItem("flappyHigh") || "0"),
    gameOver: false,
    started: false,
    speed: 2.5,
  });
  const animRef = useRef(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [highScore, setHighScore] = useState(gameState.current.highScore);

  const init = useCallback(() => {
    const s = gameState.current;
    s.catY = 250;
    s.catVel = 0;
    s.pipes = [];
    s.score = 0;
    s.gameOver = false;
    s.started = false;
    s.speed = 2.5;
    setScore(0);
    setGameOver(false);
    setStarted(false);
  }, []);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = gameState.current;
    const w = (canvas.width = canvas.clientWidth);
    const h = (canvas.height = canvas.clientHeight);

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0d3b3b";
    ctx.fillRect(0, 0, w, h);

    if (!s.started || s.gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "18px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(s.gameOver ? "Game Over" : "Tap untuk mulai", w / 2, h / 2 - 20);
      ctx.fillText(`Skor: ${s.score}   High: ${s.highScore}`, w / 2, h / 2 + 20);
      animRef.current = requestAnimationFrame(loop);
      return;
    }

    s.catVel += 0.5;
    s.catY += s.catVel;
    if (s.catY < 0) {
      s.catY = 0;
      s.catVel = 0;
    }
    if (s.catY > h - 30) {
      s.gameOver = true;
      setGameOver(true);
      if (s.score > s.highScore) {
        s.highScore = s.score;
        localStorage.setItem("flappyHigh", String(s.highScore));
        setHighScore(s.highScore);
      }
    }

    if (animRef.current % 100 === 0) {
      const top = Math.random() * (h - 180) + 40;
      s.pipes.push({ x: w, top, passed: false });
    }

    s.pipes = s.pipes.filter((p) => {
      p.x -= s.speed;
      if (!p.passed && p.x + 50 < 80) {
        p.passed = true;
        s.score++;
        setScore(s.score);
        if (s.score % 5 === 0) s.speed += 0.4;
      }
      const catX = 80,
        catW = 30,
        catH = 30;
      if (
        catX + catW > p.x &&
        catX < p.x + 50 &&
        (s.catY < p.top || s.catY + catH > p.top + 140)
      ) {
        s.gameOver = true;
        setGameOver(true);
        if (s.score > s.highScore) {
          s.highScore = s.score;
          localStorage.setItem("flappyHigh", String(s.highScore));
          setHighScore(s.highScore);
        }
      }
      return p.x > -50;
    });

    ctx.fillStyle = "#22c55e";
    s.pipes.forEach((p) => {
      ctx.fillRect(p.x, 0, 50, p.top);
      ctx.fillRect(p.x, p.top + 140, 50, h - p.top - 140);
    });

    ctx.font = "30px Arial";
    ctx.fillText("🐱", 80, s.catY + 28);

    ctx.fillStyle = "white";
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(s.score), w / 2, 40);

    animRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [loop]);

  const tap = () => {
    if (!gameState.current.started || gameState.current.gameOver) {
      if (gameState.current.gameOver) init();
      gameState.current.started = true;
      setStarted(true);
      gameState.current.catVel = -8;
    } else {
      gameState.current.catVel = -8;
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full relative"
      onClick={tap}
      onTouchStart={(e) => {
        e.preventDefault();
        tap();
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full max-w-[400px] h-[70vh] rounded-3xl border border-white/10 shadow-2xl"
        style={{ touchAction: "none" }}
      />
    </div>
  );
}

// 🐾 Kucing Menghindar (avoid balls)
function AvoidGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameState = useRef({
    catX: 150,
    balls: [] as { x: number; y: number; r: number }[],
    score: 0,
    highScore: parseInt(localStorage.getItem("avoidHigh") || "0"),
    gameOver: false,
    started: false,
  });
  const animRef = useRef(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [highScore, setHighScore] = useState(gameState.current.highScore);

  const init = useCallback(() => {
    const s = gameState.current;
    s.catX = 150;
    s.balls = [];
    s.score = 0;
    s.gameOver = false;
    s.started = false;
    setScore(0);
    setGameOver(false);
    setStarted(false);
  }, []);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = gameState.current;
    const w = (canvas.width = canvas.clientWidth);
    const h = (canvas.height = canvas.clientHeight);

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0d3b3b";
    ctx.fillRect(0, 0, w, h);

    if (!s.started || s.gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        s.gameOver ? "Game Over" : "Geser kucing untuk mulai",
        w / 2,
        h / 2 - 20
      );
      ctx.fillText(`Skor: ${s.score}   High: ${s.highScore}`, w / 2, h / 2 + 20);
      animRef.current = requestAnimationFrame(loop);
      return;
    }

    if (Math.random() < 0.03) {
      s.balls.push({
        x: Math.random() * w,
        y: -10,
        r: 8 + Math.random() * 8,
      });
    }

    s.balls = s.balls.filter((b) => {
      b.y += 4;
      const dx = b.x - s.catX;
      const dy = b.y - (h - 40);
      if (Math.sqrt(dx * dx + dy * dy) < b.r + 20) {
        s.gameOver = true;
        setGameOver(true);
        if (s.score > s.highScore) {
          s.highScore = s.score;
          localStorage.setItem("avoidHigh", String(s.highScore));
          setHighScore(s.highScore);
        }
        return false;
      }
      if (b.y > h + 10) {
        s.score++;
        setScore(s.score);
        return false;
      }
      return true;
    });

    ctx.fillStyle = "#ef4444";
    s.balls.forEach((b) => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.font = "36px Arial";
    ctx.fillText("🐱", s.catX - 18, h - 20);

    ctx.fillStyle = "white";
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(s.score), w / 2, 30);

    animRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [loop]);

  const move = (clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    gameState.current.catX = Math.max(30, Math.min(x, rect.width - 30));
    if (!gameState.current.started) {
      gameState.current.started = true;
      setStarted(true);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full relative"
      onMouseMove={(e) => move(e.clientX)}
      onTouchMove={(e) => {
        e.preventDefault();
        move(e.touches[0].clientX);
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        move(e.touches[0].clientX);
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full max-w-[400px] h-[70vh] rounded-3xl border border-white/10 shadow-2xl"
        style={{ touchAction: "none" }}
      />
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState<"intro" | "loading" | "app">("intro");
  const [introOut, setIntroOut] = useState(false);
  const [lightning, setLightning] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "watch" | "photo" | "game" | "about" | "private" | "flappy" | "hindar"
  >("watch");
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

  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicOn, setIsMusicOn] = useState(false);

  useEffect(() => {
    bgMusicRef.current = new Audio("/Fajri.mp3");
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.4;
    return () => {
      bgMusicRef.current?.pause();
      bgMusicRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    const audio = bgMusicRef.current;
    if (!audio) return;
    if (isMusicOn) {
      audio.pause();
      setIsMusicOn(false);
    } else {
      audio.play().then(() => setIsMusicOn(true)).catch(() => {});
    }
  };

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

  const getBackground = () => {
    if (activeTab === "photo") {
      return "linear-gradient(135deg, #0f0f0f 0%, #1e1b4b 30%, #d8b4fe 80%, #ffffff 100%)";
    }
    return "linear-gradient(135deg, #0d3b3b 0%, #1a5c4a 30%, #2b6b3a 60%, #6b8c22 100%)";
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

  const enterApp = () => {
    playClick();
    if (isMusicOn && bgMusicRef.current) {
      bgMusicRef.current.pause();
      setIsMusicOn(false);
    }
    setStage("loading");
    setTimeout(() => {
      setLightning(true);
      new Audio("/thunder.mp3").play();
      setTimeout(() => {
        setLightning(false);
        setStage("app");
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }, 800);
    }, 1000);
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

  return (
    <div
      className="min-h-screen text-white relative overflow-x-hidden pb-24"
      style={{
        background: getBackground(),
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
          0% { border-color: rgba(0,255,200,0.3); box-shadow: 0 0 12px rgba(0,255,200,0.2); }
          50% { border-color: rgba(0,255,200,0.8); box-shadow: 0 0 24px rgba(0,255,200,0.4); }
          100% { border-color: rgba(0,255,200,0.3); box-shadow: 0 0 12px rgba(0,255,200,0.2); }
        }
        @keyframes rgbBorder {
          0% { border-color: #00ffcc; box-shadow: 0 0 15px #00ffcc; }
          33% { border-color: #ccff00; box-shadow: 0 0 15px #ccff00; }
          66% { border-color: #00ccff; box-shadow: 0 0 15px #00ccff; }
          100% { border-color: #00ffcc; box-shadow: 0 0 15px #00ffcc; }
        }
        @keyframes avatarGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(0,255,200,0.4), 0 0 40px rgba(0,255,200,0.2); }
          50% { box-shadow: 0 0 30px rgba(0,255,200,0.6), 0 0 60px rgba(0,255,200,0.3); }
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
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
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
          background: linear-gradient(90deg, #34d399 0%, #facc15 40%, #ffffff 50%, #facc15 60%, #34d399 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerText 3s linear infinite;
        }
        .shake { animation: shake 0.5s ease-out; }
        .lock-pulse { animation: lockPulse 2s ease-in-out infinite; }
        .rgb-border {
          border: 3px solid #00ffcc;
          animation: rgbBorder 4s linear infinite;
          transition: transform 0.3s ease;
        }
        .rgb-border:active { transform: scale(0.96); }
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.3);
        }
        .glass-nav {
          background: rgba(10, 30, 25, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .nav-btn-circle {
          width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; cursor: pointer;
          background: rgba(0,255,200,0.1);
          border: 1px solid rgba(0,255,200,0.4);
          color: white;
          transition: background 0.2s, transform 0.15s;
        }
        .nav-btn-circle:disabled { color: rgba(255,255,255,0.2); cursor: default; }
        .nav-btn-circle:not(:disabled):active { transform: scale(0.9); }
        .social-card {
          transition: all 0.3s ease;
          border-radius: 1rem;
        }
        .social-card:hover {
          transform: scale(1.02);
          box-shadow: 0 0 20px rgba(0,255,200,0.4);
        }
        .social-card:active {
          transform: scale(0.97);
        }
      `}</style>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full" style={{ top: "-10%", left: "-10%", width: "70vw", height: "70vw", background: "radial-gradient(circle, rgba(0,255,200,0.08) 0%, transparent 70%)" }} />
        <div className="absolute rounded-full" style={{ bottom: "-10%", right: "-10%", width: "70vw", height: "70vw", background: "radial-gradient(circle, rgba(204,255,0,0.06) 0%, transparent 70%)" }} />
      </div>

      <Particles />
      {showConfetti && <Confetti />}
      {hearts.map(h => <FloatingHeart key={h.id} x={h.x} y={h.y} />)}

      {lightning && (
        <div
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 40%, #ffffff 0%, #ccff00 25%, #00ffcc 50%, #00ccff 80%, transparent 100%)",
            animation: "lightningFlash 0.8s ease-out forwards, shake 0.8s ease-out",
          }}
        />
      )}

      {/* INTRO */}
      {stage === "intro" && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${introOut ? "intro-out" : ""}`}
          style={{ background: "linear-gradient(135deg, #0d3b3b, #1a5c4a, #2b6b3a)", cursor: "auto" }}
        >
          <button
            onClick={toggleMusic}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center text-xl glass-card"
            title={isMusicOn ? "Pause" : "Play"}
          >
            {isMusicOn ? "⏸" : "▶"}
          </button>

          <Particles />
          <div className="absolute rounded-full" style={{ top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "70vw", height: "70vw", background: "radial-gradient(circle, rgba(0,255,200,0.2) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
          <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
            <div className="float-1 text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(0,255,200,0.8)" }}>welcome to</div>
            <div className="float-2 flex flex-col items-center gap-1">
              <div className="text-5xl font-bold tracking-widest shimmer-text">FAJREZ</div>
              <div className="text-lg tracking-[0.5em] uppercase glow-text" style={{ color: "rgba(255,255,255,0.7)" }}>for you</div>
            </div>
            <div className="float-2 w-20 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,200,0.8), transparent)" }} />
            <div className="float-2 text-sm" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>an experience made for you</div>
            <button
              className="float-3 btn-shimmer mt-4 px-10 py-3 rounded-full text-sm font-semibold"
              style={{ background: "rgba(0,255,200,0.12)", border: "1px solid rgba(0,255,200,0.4)", color: "white", letterSpacing: "0.2em" }}
              onClick={enterApp}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,255,200,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,255,200,0.12)")}
            >
              ✦ Enter ✦
            </button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {stage === "loading" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: getBackground(), animation: "fadeIn 0.3s ease-out", cursor: "auto" }}>
          <div className="text-center">
            <div className="text-xl font-bold tracking-widest mb-2 shimmer-text">FAJREZZZ EXPERIENCE</div>
            <div className="text-sm text-white/50">loading...</div>
            <div className="mt-4 w-32 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full" style={{ animation: "loadbar 1.2s ease-out forwards" }} />
            </div>
          </div>
        </div>
      )}

      {/* APP */}
      {stage === "app" && (
        <>
          {/* WATCH */}
          {activeTab === "watch" && (
            <section className="anim-slideup" style={{ animation: "tabFadeIn 0.4s ease-out" }}>
              <div className="relative flex flex-col items-center justify-center" style={{ height: "100dvh" }}>
                <div className="flex items-center gap-3 w-full max-w-[420px] px-4">
                  <button className="nav-btn-circle" disabled={watchIndex === 0} onClick={() => { playClick(); setWatchIndex(i => Math.max(i - 1, 0)); }} style={{ opacity: watchIndex === 0 ? 0.3 : 1 }}>←</button>
                  <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl relative" style={{ aspectRatio: "9/16", border: "1px solid rgba(255,255,255,0.12)" }} onContextMenu={(e) => e.preventDefault()}>
                    <iframe key={watchIndex} className="w-full h-full" src={videoUrl(watchVideos[watchIndex])} allow="autoplay; fullscreen" />
                    <div className="absolute inset-0 pointer-events-none" />
                  </div>
                  <button className="nav-btn-circle" disabled={watchIndex === watchVideos.length - 1} onClick={() => { playClick(); setWatchIndex(i => Math.min(i + 1, watchVideos.length - 1)); }} style={{ opacity: watchIndex === watchVideos.length - 1 ? 0.3 : 1 }}>→</button>
                </div>
                <div className="flex gap-2 mt-5">
                  {watchVideos.map((_, i) => (
                    <div key={i} onClick={() => { playClick(); setWatchIndex(i); }} style={{ width: i === watchIndex ? "20px" : "6px", height: "6px", borderRadius: "3px", background: i === watchIndex ? "white" : "rgba(255,255,255,0.3)", transition: "all 0.2s ease", cursor: "pointer" }} />
                  ))}
                </div>
                <div className="mt-3 text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>{watchIndex + 1} / {watchVideos.length}</div>
              </div>
            </section>
          )}

          {/* EXPERIENCE */}
          {activeTab === "photo" && (
            <section className="py-24 px-4 anim-slideup" style={{ animation: "tabFadeIn 0.4s ease-out" }}>
              <div className="columns-2 md:columns-3 gap-4 max-w-6xl mx-auto space-y-4">
                {galleryPhotos.map((img, i) => {
                  const key = `gallery-${i}`;
                  const likeCount = likedPhotos[key] || 0;
                  const randomHeight = i % 3 === 0 ? "h-56" : i % 2 === 0 ? "h-48" : "h-64";
                  return (
                    <div key={i} className="break-inside-avoid cursor-pointer"
                      onClick={() => { playClick(); openPreview(galleryPhotos, i); }}
                      onDoubleClick={(e) => handleDoubleTap(e, key)}
                      onTouchEnd={(e) => {
                        const now = Date.now();
                        const lastTap = parseInt((e.currentTarget as HTMLElement).dataset.lastTap || "0");
                        if (now - lastTap < 300) handleDoubleTap(e, key);
                        (e.currentTarget as HTMLElement).dataset.lastTap = String(now);
                      }}
                    >
                      <div className="relative">
                        <GalleryImage src={img} className={`${randomHeight} w-full object-cover`} />
                        {likeCount > 0 && (
                          <div className="absolute top-2 right-2 bg-black/60 rounded-full px-2 py-0.5 text-xs font-semibold flex items-center gap-1 text-white z-10">
                            ❤️ {likeCount}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* GAME */}
          {activeTab === "game" && (
            <section className="py-24 text-center px-4 anim-slideup" style={{ animation: "tabFadeIn 0.4s ease-out" }}>
              {!selectedGame ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
                    {[
                      { id: "ssstik.io_1781060165448_nrirrw", glow: "rgba(204,255,0,0.15)" },
                      { id: "VID-20260611-WA0003_cfunh3", glow: "rgba(0,255,200,0.15)" },
                      { id: "VID-20260611-WA0005_sjippo", glow: "rgba(0,255,200,0.15)", full: true },
                    ].map((v, i) => (
                      <div key={i} className={`relative ${v.full ? "md:col-span-2" : ""} glass-card overflow-hidden`} style={{ aspectRatio: "16/9" }}>
                        <div className="absolute rounded-3xl" style={{ inset: "-8px", background: v.glow, filter: "blur(20px)" }} />
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl" onContextMenu={(e) => e.preventDefault()}>
                          <iframe className="w-full h-full" src={videoUrl(v.id)} allow="autoplay; fullscreen" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-white/40 text-sm mb-4 tracking-widest uppercase">Pilih Game</p>
                  <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
                    {[
                      { key: "ml", label: "Mobile Legends", color: "#059669" },
                      { key: "ff", label: "Free Fire", color: "#16a34a" },
                      { key: "roblox", label: "Roblox", color: "#65a30d" },
                    ].map((g) => (
                      <div key={g.key} onClick={() => { playClick(); setSelectedGame(g.key); }} className="p-4 rounded-2xl cursor-pointer text-sm font-semibold glass-card" style={{ background: g.color, transition: "transform 0.15s ease" }}>{g.label}</div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="anim-slideup">
                  <button onClick={() => { playClick(); setSelectedGame(null); }} className="mb-8 px-5 py-2 rounded-full text-sm glass-card">← Back</button>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
                    {gamePhotos[selectedGame].map((img, i) => {
                      const key = `game-${selectedGame}-${i}`;
                      const likeCount = likedPhotos[key] || 0;
                      return (
                        <div key={i} className="cursor-pointer rounded-2xl overflow-hidden relative rgb-border glass-card"
                          onClick={() => { playClick(); openPreview(gamePhotos[selectedGame!], i); }}
                          onDoubleClick={(e) => handleDoubleTap(e, key)}
                          onTouchEnd={(e) => {
                            const now = Date.now();
                            const lastTap = parseInt((e.currentTarget as HTMLElement).dataset.lastTap || "0");
                            if (now - lastTap < 300) handleDoubleTap(e, key);
                            (e.currentTarget as HTMLElement).dataset.lastTap = String(now);
                          }}
                        >
                          <GalleryImage src={img} className="w-full aspect-video object-cover" />
                          {likeCount > 0 && (
                            <div className="absolute top-2 right-2 bg-black/60 rounded-full px-2 py-0.5 text-xs font-semibold flex items-center gap-1 text-white z-10">❤️ {likeCount}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ABOUT */}
          {activeTab === "about" && (
            <section className="py-24 px-6 anim-slideup" style={{ animation: "tabFadeIn 0.4s ease-out" }}>
              <div className="max-w-sm mx-auto flex flex-col items-center gap-6">
                <div className="card-in-1 relative">
                  <div className="w-28 h-28 rounded-full overflow-hidden avatar-glow" style={{ border: "2px solid rgba(0,255,200,0.6)" }}>
                    <img src="/1.jpg" className="w-full h-full object-cover" onContextMenu={(e) => e.preventDefault()} draggable={false} />
                  </div>
                  <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full" style={{ background: "#22c55e", border: "2px solid #0f0c29", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }} />
                </div>
                <div className="card-in-2 text-center">
                  <div className="text-2xl font-bold tracking-wider mb-1 shimmer-text">fajrezzz</div>
                  <div className="text-sm italic" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <Typewriter text="living for the moments nobody else sees." speed={60} />
                  </div>
                </div>

                <div className="card-in-2 w-full text-center glass-card py-4 px-6">
                  <div className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em" }}>{greet()}</div>
                  <div className="py-4 px-6 rounded-2xl mx-auto inline-block">
                    <div className="text-4xl font-mono font-bold tracking-[0.15em] shimmer-text">
                      {getWIB()}
                    </div>
                    <div className="text-xs mt-2 tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>{getWIBDate()} · WIB</div>
                  </div>
                </div>

                <div className="card-in-2 w-full text-center px-2">
                  <p className="italic text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>“{dailyQuote}”</p>
                </div>

                <div className="card-in-2 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,200,0.4), transparent)" }} />

                <div className="card-in-3 w-full grid grid-cols-4 gap-3 text-center">
                  {[
                    { label: "Photos", value: galleryPhotos.length },
                    { label: "Videos", value: "3" },
                    { label: "Games", value: "3" },
                    { label: "Visitors", value: visitorCount },
                  ].map((s) => (
                    <div key={s.label} className="rounded-2xl py-3 glass-card">
                      <div className="text-xl font-bold" style={{ color: "#34d399" }}>{s.value}</div>
                      <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="card-in-4 w-full glass-card p-4">
                  <div className="text-sm font-semibold mb-3 text-center tracking-wider shimmer-text">Buku Tamu</div>
                  <div className="flex flex-col gap-2">
                    <input placeholder="Nama" value={guestName} onChange={(e) => setGuestName(e.target.value)} className="w-full px-3 py-2 rounded-xl text-white text-sm outline-none bg-white/5 border border-white/10" />
                    <textarea placeholder="Tulis pesan..." value={guestMessage} onChange={(e) => setGuestMessage(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-xl text-white text-sm outline-none bg-white/5 border border-white/10 resize-none" />
                    <button onClick={sendGuestbook} disabled={sending} className="py-2 rounded-xl text-sm font-semibold btn-shimmer" style={{ background: "rgba(0,255,200,0.2)", border: "1px solid rgba(0,255,200,0.4)", color: "white" }}>{sending ? "Mengirim..." : "Kirim 💌"}</button>
                  </div>
                </div>

                <div className="card-in-4 w-full glass-card p-4">
                  <div className="text-sm font-semibold mb-3 text-center tracking-wider shimmer-text">🤖 AI Battle</div>
                  <div className="flex flex-col gap-2">
                    <input placeholder="Tanyakan sesuatu..." value={aiQuestion} onChange={(e) => setAiQuestion(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") askAI(); }} className="w-full px-3 py-2 rounded-xl text-white text-sm outline-none bg-white/5 border border-white/10" />
                    <button onClick={askAI} disabled={aiLoading} className="py-2 rounded-xl text-sm font-semibold" style={{ background: "rgba(0,255,200,0.3)", border: "1px solid rgba(0,255,200,0.5)", color: "white" }}>{aiLoading ? "Berpikir..." : "Tanya AI Battle"}</button>
                  </div>
                  {aiResponses.length > 0 && (
                    <div className="mt-3 flex flex-col gap-3">
                      {aiResponses.map((res) => (
                        <div key={res.model} className="p-3 rounded-xl glass-card">
                          <div className="text-xs font-bold mb-1" style={{ color: res.model === "ChatGPT" ? "#34d399" : res.model === "Claude" ? "#facc15" : "#00ffcc" }}>{res.model}</div>
                          <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>{res.answer}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="card-in-4 w-full flex flex-col gap-3 mt-2">
                  {[
                    {
                      label: "TikTok", handle: "@fajrezforyou", url: "https://tiktok.com/@fajrezforyou",
                      color: "#000000", border: "rgba(255,255,255,0.15)",
                      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" /></svg>,
                    },
                    {
                      label: "Instagram", handle: "@fajrezforyou", url: "https://instagram.com/fajrezforyou",
                      color: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)", border: "rgba(253,29,29,0.3)",
                      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>,
                    },
                  ].map((s) => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl social-card"
                      style={{ background: s.color, border: `1px solid ${s.border}`, textDecoration: "none", transition: "transform 0.15s ease, box-shadow 0.3s" }}
                      onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
                      onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <div style={{ color: "white" }}>{s.icon}</div>
                      <div>
                        <div className="text-sm font-semibold text-white">{s.label}</div>
                        <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{s.handle}</div>
                      </div>
                      <div className="ml-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* PRIVATE */}
          {activeTab === "private" && (
            <section className="py-24 px-6 anim-slideup" style={{ animation: "tabFadeIn 0.4s ease-out" }}>
              {!privateUnlocked ? (
                <div className="max-w-sm mx-auto flex flex-col items-center gap-6 pt-10">
                  <div className="lock-pulse" style={{ fontSize: "56px" }}>🔒</div>
                  <div className="text-center">
                    <div className="text-xl font-bold tracking-wider mb-1 shimmer-text">Private</div>
                    <div className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Enter password to unlock</div>
                  </div>
                  <div className={`w-full flex flex-col gap-3 ${passwordShake ? "shake" : ""}`}>
                    <input type="password" value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false); }} onKeyDown={(e) => { if (e.key === "Enter") submitPassword(); }} placeholder="Password..." className="w-full px-4 py-3 rounded-2xl text-white text-center tracking-widest outline-none bg-white/5 border border-white/10" style={{ fontSize: "14px" }} />
                    {passwordError && <div className="text-center text-xs" style={{ color: "rgba(239,68,68,0.9)" }}>Wrong password. Try again.</div>}
                    <button onClick={submitPassword} className="w-full py-3 rounded-2xl font-semibold text-sm tracking-widest btn-shimmer" style={{ background: "rgba(0,255,200,0.2)", border: "1px solid rgba(0,255,200,0.4)", color: "white" }}>Unlock</button>
                  </div>
                </div>
              ) : (
                <div className="anim-slideup">
                  <div className="text-center mb-8"><div className="text-lg font-bold shimmer-text tracking-wider">Private 🔓</div></div>
                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {privateVideos.map((id, i) => (
                      <div key={i} className="relative glass-card overflow-hidden" style={{ aspectRatio: "9/16" }}>
                        <div className="absolute rounded-3xl" style={{ inset: "-8px", background: "rgba(0,255,200,0.1)", filter: "blur(20px)" }} />
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl" onContextMenu={(e) => e.preventDefault()}>
                          <iframe className="w-full h-full" src={videoUrl(id)} allow="autoplay; fullscreen" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-8">
                    <button onClick={() => { setPrivateUnlocked(false); setPasswordInput(""); }} className="px-5 py-2 rounded-full text-xs glass-card">🔒 Lock again</button>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* FLAPPY CANVAS */}
          {activeTab === "flappy" && (
            <section className="py-12 px-4 anim-slideup h-[calc(100dvh-80px)]" style={{ animation: "tabFadeIn 0.4s ease-out" }}>
              <FlappyCanvasGame />
            </section>
          )}

          {/* HINDAR CANVAS */}
          {activeTab === "hindar" && (
            <section className="py-12 px-4 anim-slideup h-[calc(100dvh-80px)]" style={{ animation: "tabFadeIn 0.4s ease-out" }}>
              <AvoidGame />
            </section>
          )}

          {/* LIGHTBOX */}
          {preview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)", opacity: lightboxVisible ? 1 : 0, transition: "opacity 0.25s ease" }}
              onClick={closePreview}
              onContextMenu={(e) => e.preventDefault()}
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                if (touchStartX.current === null) return;
                const diff = touchStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) diff > 0 ? swipeNext() : swipePrev();
                touchStartX.current = null;
              }}
            >
              <button onClick={(e) => { e.stopPropagation(); swipePrev(); }} className="absolute left-3 z-10 text-2xl w-10 h-10 flex items-center justify-center rounded-full glass-card">‹</button>
              <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
                <img key={preview.index} src={preview.photos[preview.index]} className="anim-fadescale" style={{ maxWidth: "90%", maxHeight: "80vh", borderRadius: "16px", boxShadow: "0 25px 60px rgba(0,0,0,0.8)", userSelect: "none", WebkitTouchCallout: "none" }}
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                  onDoubleClick={(e) => { const key = `preview-${preview.photos[preview.index]}`; handleDoubleTap(e, key); }}
                  onTouchEnd={(e) => {
                    const now = Date.now();
                    const lastTap = parseInt((e.currentTarget as HTMLElement).dataset.lastTap || "0");
                    if (now - lastTap < 300) { const key = `preview-${preview.photos[preview.index]}`; handleDoubleTap(e, key); }
                    (e.currentTarget as HTMLElement).dataset.lastTap = String(now);
                  }}
                />
                {preview && (() => {
                  const key = `preview-${preview.photos[preview.index]}`;
                  const count = likedPhotos[key] || 0;
                  return count > 0 ? <div className="absolute top-2 right-2 bg-black/60 rounded-full px-2 py-0.5 text-xs font-semibold flex items-center gap-1 text-white z-10">❤️ {count}</div> : null;
                })()}
              </div>
              <button onClick={(e) => { e.stopPropagation(); swipeNext(); }} className="absolute right-3 z-10 text-2xl w-10 h-10 flex items-center justify-center rounded-full glass-card">›</button>
              <div className="absolute bottom-6 flex gap-2">
                {preview.photos.map((_, i) => (
                  <div key={i} style={{ width: i === preview.index ? "20px" : "8px", height: "8px", borderRadius: "4px", background: i === preview.index ? "white" : "rgba(255,255,255,0.3)", transition: "all 0.2s ease" }} />
                ))}
              </div>
              <button onClick={closePreview} className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-sm glass-card">✕</button>
            </div>
          )}

          {/* BOTTOM NAVBAR */}
          <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center py-3 px-1 glass-nav">
            {[
              { tab: "watch" as const, label: "WATCH", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg> },
              { tab: "photo" as const, label: "EXPERIENCE", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg> },
              { tab: "game" as const, label: "GAMES", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2" /><line x1="12" y1="10" x2="12" y2="14" /><line x1="10" y1="12" x2="14" y2="12" /><circle cx="17" cy="11" r="0.5" fill="currentColor" /><circle cx="19" cy="13" r="0.5" fill="currentColor" /></svg> },
              { tab: "about" as const, label: "ABOUT", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg> },
              { tab: "private" as const, label: "PRIVATE", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg> },
              { tab: "flappy" as const, label: "FLAPPY", icon: <span className="text-lg">🐱</span> },
              { tab: "hindar" as const, label: "HINDAR", icon: <span className="text-lg">🐾</span> },
            ].map(({ tab, label, icon }) => (
              <button key={tab} onClick={() => { playClick(); setActiveTab(tab); if (tab !== "game") setSelectedGame(null); }}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", padding: "6px 8px", borderRadius: "14px",
                  color: activeTab === tab ? "white" : "rgba(255,255,255,0.35)",
                  transition: "all 0.2s ease",
                  background: activeTab === tab ? "rgba(255,255,255,0.08)" : "transparent",
                  boxShadow: activeTab === tab ? "0 0 12px rgba(0,255,200,0.3)" : "none",
                  transform: activeTab === tab ? "scale(1.05)" : "scale(1)",
                }}
              >
                {icon}
                <span style={{ fontSize: "7px", letterSpacing: "0.06em", fontWeight: 600 }}>{label}</span>
                {activeTab === tab && <div style={{ width: "4px", height: "4px", borderRadius: "2px", background: "rgba(0,255,200,1)" }} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
