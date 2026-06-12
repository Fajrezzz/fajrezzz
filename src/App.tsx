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
  // ... tidak berubah
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
  // ... tidak berubah
}

function Typewriter({ text, speed = 40 }: { text: string; speed?: number }) {
  // ... tidak berubah
}

function CursorGlow() {
  // ... tidak berubah
}

function GalleryImage({ src, className }: { src: string; className?: string }) {
  // ... tidak berubah
}

function Particles() {
  // ... tidak berubah
}

// 🐱 Komponen game kucing flappy (DIPERBAIKI)
function CatGame() {
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const catYRef = useRef(250);
  const catVelRef = useRef(0);
  const pipesRef = useRef<{ x: number; topHeight: number; passed: boolean }[]>([]);
  const scoreRef = useRef(0);
  const gameOverRef = useRef(false);
  const gameStartedRef = useRef(false);
  const frameRef = useRef(0);
  const pipeSpeedRef = useRef(2.5); // kecepatan awal

  const gapHeight = 150;
  const pipeWidth = 60;
  const catSize = 40;
  const gravity = 0.6;
  const jumpPower = -9;

  const [catY, setCatY] = useState(250);
  const [pipes, setPipes] = useState<{ x: number; topHeight: number; passed: boolean }[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem("catHighScore") || "0"));

  const initGame = useCallback(() => {
    catYRef.current = 250;
    catVelRef.current = 0;
    pipesRef.current = [];
    scoreRef.current = 0;
    gameOverRef.current = false;
    gameStartedRef.current = false;
    pipeSpeedRef.current = 2.5; // reset kecepatan
    setCatY(250);
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  }, []);

  const startGame = useCallback(() => {
    if (gameOverRef.current) {
      initGame();
      setTimeout(() => {
        gameStartedRef.current = true;
        setGameStarted(true);
        catVelRef.current = jumpPower;
      }, 50);
    } else {
      gameStartedRef.current = true;
      setGameStarted(true);
      catVelRef.current = jumpPower;
    }
  }, [initGame, jumpPower]);

  const jump = useCallback(() => {
    if (!gameOverRef.current && gameStartedRef.current) {
      catVelRef.current = jumpPower;
      // Tidak ada suara click di sini
    }
  }, []);

  const gameLoop = useCallback(() => {
    if (!gameStartedRef.current || gameOverRef.current) {
      frameRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    // Update kucing
    catVelRef.current += gravity;
    catYRef.current += catVelRef.current;
    if (catYRef.current < 0) {
      catYRef.current = 0;
      catVelRef.current = 0;
    }
    const areaHeight = gameAreaRef.current?.clientHeight || 500;
    if (catYRef.current > areaHeight - catSize) {
      gameOverRef.current = true;
      setGameOver(true);
      const hs = Math.max(scoreRef.current, highScore);
      setHighScore(hs);
      localStorage.setItem("catHighScore", String(hs));
    }
    setCatY(catYRef.current);

    // Spawn pipa
    if (frameRef.current % 90 === 0) {
      const topHeight = Math.random() * (areaHeight - gapHeight - 80) + 40;
      pipesRef.current.push({ x: (gameAreaRef.current?.clientWidth || 350), topHeight, passed: false });
    }

    // Update pipa
    pipesRef.current = pipesRef.current.filter(p => p.x > -pipeWidth);
    pipesRef.current.forEach(p => {
      p.x -= pipeSpeedRef.current;
      // Skor
      if (!p.passed && p.x + pipeWidth < 50) {
        p.passed = true;
        scoreRef.current += 1;
        setScore(scoreRef.current);

        // Tambah kecepatan setiap kelipatan 5
        if (scoreRef.current % 5 === 0 && scoreRef.current > 0) {
          pipeSpeedRef.current += 0.5; // bisa disesuaikan
        }
      }
      // Tabrakan
      const catLeft = 50;
      const catRight = 50 + catSize;
      const catTop = catYRef.current;
      const catBottom = catYRef.current + catSize;
      if (
        catRight > p.x && catLeft < p.x + pipeWidth &&
        (catTop < p.topHeight || catBottom > p.topHeight + gapHeight)
      ) {
        gameOverRef.current = true;
        setGameOver(true);
        const hs = Math.max(scoreRef.current, highScore);
        setHighScore(hs);
        localStorage.setItem("catHighScore", String(hs));
      }
    });
    setPipes([...pipesRef.current]);

    frameRef.current = requestAnimationFrame(gameLoop);
  }, [highScore]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [gameLoop]);

  const handleScreenTap = () => {
    if (!gameStartedRef.current) {
      startGame();
    } else if (gameOverRef.current) {
      initGame();
    } else {
      jump();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">
      <div
        ref={gameAreaRef}
        className="relative w-full max-w-[400px] h-[70vh] bg-black/20 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
        onClick={handleScreenTap}
        onTouchStart={(e) => {
          e.preventDefault();
          handleScreenTap();
        }}
        style={{ touchAction: "none" }}
      >
        {/* Background game */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/60 to-emerald-900/40" />

        {/* Skor */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-2xl font-bold text-white drop-shadow-lg">
          {score}
        </div>

        {/* Kucing */}
        <div
          className="absolute z-20 transition-transform"
          style={{
            left: 50,
            top: catY,
            width: catSize,
            height: catSize,
            transform: `rotate(${Math.min(Math.max(catVelRef.current * 3, -20), 20)}deg)`,
          }}
        >
          🐱
        </div>

        {/* Pipa atas */}
        {pipes.map((p, i) => (
          <div key={i} className="absolute" style={{ left: p.x, top: 0, width: pipeWidth, height: p.topHeight }}>
            <div className="w-full h-full bg-gradient-to-l from-green-500 to-emerald-700 rounded-r-lg shadow-lg" />
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-800 rounded-r" />
          </div>
        ))}
        {/* Pipa bawah */}
        {pipes.map((p, i) => (
          <div key={i + 1000} className="absolute" style={{ left: p.x, top: p.topHeight + gapHeight, width: pipeWidth, height: (gameAreaRef.current?.clientHeight || 500) - p.topHeight - gapHeight }}>
            <div className="w-full h-full bg-gradient-to-l from-green-500 to-emerald-700 rounded-r-lg shadow-lg" />
            <div className="absolute top-0 left-0 right-0 h-4 bg-green-800 rounded-r" />
          </div>
        ))}

        {/* Overlay start */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-30">
            <div className="text-4xl mb-4">🐱</div>
            <div className="text-white font-bold text-lg">Tap untuk mulai</div>
            <div className="text-white/50 text-sm mt-1">High Score: {highScore}</div>
          </div>
        )}
        {/* Overlay game over */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-30">
            <div className="text-4xl mb-4">💀</div>
            <div className="text-white font-bold text-xl">Game Over</div>
            <div className="text-white/80 mt-2">Skor: {score}</div>
            <div className="text-white/50 text-sm">High Score: {highScore}</div>
            <button
              className="mt-4 px-6 py-2 rounded-full bg-cyan-500/80 text-white font-semibold text-sm"
              onClick={(e) => {
                e.stopPropagation();
                initGame();
              }}
            >
              Main Lagi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  // ... semua state dan fungsi lainnya tetap sama persis
  // ...
  // Di bagian bawah, di dalam stage === "app", tambahkan tab kucing
  // ...
  // Tidak ada perubahan pada selain CatGame
}
