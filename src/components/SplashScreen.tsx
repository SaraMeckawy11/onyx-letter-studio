import { useState } from "react";

interface SplashScreenProps {
  onOpen: () => void;
  initials?: string;
}

const SplashScreen = ({ onOpen, initials = "A & S" }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"idle" | "cracking" | "opening" | "exiting">("idle");

  const handleClick = () => {
    if (phase !== "idle") return;
    
    setPhase("cracking");
    
    setTimeout(() => setPhase("opening"), 300);
    setTimeout(() => {
      setPhase("exiting");
      setTimeout(onOpen, 600);
    }, 1000);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background cursor-pointer ${
        phase === "exiting" ? "animate-envelope-exit" : ""
      }`}
      onClick={handleClick}
    >
      {/* Envelope */}
      <div className="relative" style={{ width: 260, height: 400 }}>
        {/* Envelope body */}
        <div
          className="absolute inset-0 rounded-sm"
          style={{
            background: "hsl(37, 33%, 97%)",
            border: "1px solid hsl(30, 18%, 82%)",
            boxShadow: "inset 0 0 20px hsl(34, 22%, 90%), 0 8px 32px hsl(30, 14%, 75%, 0.15)",
          }}
        />

        {/* Inner card peek (visible when flap opens) */}
        <div
          className="absolute left-4 right-4 top-8 bottom-4 rounded-sm flex items-center justify-center"
          style={{
            background: "hsl(0, 0%, 100%)",
            boxShadow: "0 1px 4px hsl(30, 14%, 75%, 0.2)",
          }}
        >
          <span className="font-display italic text-2xl tracking-wide" style={{ color: "hsl(0, 0%, 10%)" }}>
            {initials}
          </span>
        </div>

        {/* Flap - diagonal triangle */}
        <div
          className={`absolute top-0 left-0 right-0 ${phase === "opening" || phase === "exiting" ? "animate-flap-open" : ""}`}
          style={{
            height: 160,
            perspective: "600px",
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
            zIndex: 2,
          }}
        >
          <svg
            viewBox="0 0 260 160"
            className="absolute top-0 left-0 w-full h-full"
            style={{ filter: "drop-shadow(0 2px 4px hsl(30, 14%, 75%, 0.2))" }}
          >
            <polygon
              points="0,0 260,0 130,160"
              fill="hsl(33, 20%, 90%)"
              stroke="hsl(30, 18%, 82%)"
              strokeWidth="0.5"
            />
            {/* Crease line */}
            <line x1="65" y1="80" x2="195" y2="80" stroke="hsl(30, 14%, 82%)" strokeWidth="0.3" />
          </svg>

          {/* Wax Seal */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 ${phase === "cracking" ? "animate-seal-crack" : ""}`}
            style={{
              top: 56,
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 35%, hsl(0,0%,18%), hsl(0,0%,10%) 50%, hsl(0,0%,8%) 80%, hsl(0,0%,12%))",
              boxShadow: "0 3px 10px hsl(0,0%,0%,0.25), inset 0 1px 2px hsl(0,0%,20%,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3,
            }}
          >
            <span
              className="font-display italic text-xs"
              style={{
                color: "hsl(37, 33%, 94%)",
                letterSpacing: "0.05em",
              }}
            >
              {initials.replace(" & ", "")}
            </span>
          </div>

          {/* Ribbon lines */}
          <div
            className="absolute"
            style={{
              top: 81,
              left: 30,
              right: 30,
              height: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 52,
              zIndex: 2,
            }}
          >
            <div className="flex-1 h-px bg-ribbon" />
            <div className="flex-1 h-px bg-ribbon" />
          </div>
        </div>

        {/* Bottom flap (static back piece) */}
        <svg
          viewBox="0 0 260 140"
          className="absolute bottom-0 left-0 w-full"
          style={{ height: 140 }}
        >
          <polygon
            points="0,140 260,140 130,0"
            fill="hsl(34, 22%, 92%)"
            stroke="hsl(30, 18%, 82%)"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Touch to open */}
      <p
        className="mt-10 font-display italic text-xs tracking-[0.3em] text-taupe animate-pulse-fade select-none"
        style={{ fontSize: 13 }}
      >
        touch to open
      </p>
    </div>
  );
};

export default SplashScreen;
