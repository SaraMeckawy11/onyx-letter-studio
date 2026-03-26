import { useState } from "react";
import envelopeTexture from "@/assets/envelope-texture.jpg";
import waxSeal from "@/assets/wax-seal.png";

interface SplashScreenProps {
  onOpen: () => void;
}

const SplashScreen = ({ onOpen }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"idle" | "seal" | "flap" | "fading">("idle");

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("seal");
    setTimeout(() => setPhase("flap"), 400);
    setTimeout(() => setPhase("fading"), 2200);
    setTimeout(onOpen, 3000);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background cursor-pointer transition-opacity duration-700 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleClick}
    >
      {/* Envelope container */}
      <div
        className="relative"
        style={{
          width: "min(85vw, 420px)",
          height: "min(55vw, 280px)",
          borderRadius: "3px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        {/* Envelope body texture */}
        <div
          className="absolute inset-0 rounded-[3px] overflow-hidden"
          style={{
            backgroundImage: `url(${envelopeTexture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Four fold triangles with natural shadows using CSS */}
        {/* Left triangle */}
        <div className="absolute inset-0 overflow-hidden rounded-[3px] pointer-events-none z-[2]">
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(to right, rgba(0,0,0,0.06) 0%, transparent 50%)",
            }}
          />
          {/* Right side shadow */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(to left, rgba(0,0,0,0.06) 0%, transparent 50%)",
            }}
          />
          {/* Bottom fold subtle darkening */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "40%",
              background: "linear-gradient(to top, rgba(0,0,0,0.04) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Crease lines - thin, natural */}
        <svg
          className="absolute inset-0 w-full h-full z-[3] pointer-events-none"
          viewBox="0 0 100 65"
          preserveAspectRatio="none"
        >
          {/* Top flap crease lines */}
          <line x1="0" y1="0" x2="50" y2="50" stroke="rgba(0,0,0,0.08)" strokeWidth="0.3" />
          <line x1="100" y1="0" x2="50" y2="50" stroke="rgba(0,0,0,0.08)" strokeWidth="0.3" />
          {/* Bottom flap lines */}
          <line x1="0" y1="65" x2="50" y2="50" stroke="rgba(0,0,0,0.05)" strokeWidth="0.25" />
          <line x1="100" y1="65" x2="50" y2="50" stroke="rgba(0,0,0,0.05)" strokeWidth="0.25" />
          {/* Subtle shadow next to crease lines */}
          <line x1="0.5" y1="0.5" x2="50" y2="50" stroke="rgba(0,0,0,0.04)" strokeWidth="1.5" />
          <line x1="99.5" y1="0.5" x2="50" y2="50" stroke="rgba(0,0,0,0.04)" strokeWidth="1.5" />
        </svg>

        {/* Center shadow where folds meet */}
        <div
          className="absolute z-[4] pointer-events-none"
          style={{
            top: "72%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30px",
            height: "14px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(0,0,0,0.12) 0%, transparent 70%)",
          }}
        />

        {/* TOP FLAP - the triangle that opens */}
        <div
          className="absolute top-0 left-0 right-0 z-[6]"
          style={{
            height: "78%",
            perspective: "600px",
          }}
        >
          <div
            className={`w-full h-full ${
              phase === "flap" || phase === "fading" ? "envelope-flap-open" : ""
            }`}
            style={{
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Flap front face */}
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
              <svg viewBox="0 0 100 78" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                <defs>
                  <pattern id="flapTex" patternUnits="objectBoundingBox" width="1" height="1">
                    <image href={envelopeTexture} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
                  </pattern>
                  <linearGradient id="flapShading" x1="0.5" y1="0" x2="0.5" y2="1">
                    <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                    <stop offset="80%" stopColor="rgba(0,0,0,0.05)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
                  </linearGradient>
                </defs>
                <path d="M0,0 L100,0 L54,72 Q50,78 46,72 L0,0 Z" fill="url(#flapTex)" />
                <path d="M0,0 L100,0 L54,72 Q50,78 46,72 L0,0 Z" fill="url(#flapShading)" />
              </svg>
            </div>

            {/* Flap back face */}
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}>
              <svg viewBox="0 0 100 78" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                <path d="M0,0 L100,0 L54,72 Q50,78 46,72 L0,0 Z" fill="hsl(34, 22%, 88%)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Shadow cast by flap when opening */}
        <div
          className={`absolute top-0 left-0 right-0 z-[5] pointer-events-none transition-opacity duration-1000 ${
            phase === "flap" || phase === "fading" ? "opacity-100" : "opacity-0"
          }`}
          style={{
            height: "40%",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 100%)",
          }}
        />

        {/* Wax seal */}
        <div
          className={`absolute left-1/2 z-[10] ${
            phase === "seal" ? "animate-seal-crack" : ""
          } ${phase === "flap" || phase === "fading" ? "envelope-seal-vanish" : ""}`}
          style={{
            top: "55%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src={waxSeal}
            alt="Wax seal"
            className="w-16 h-16 sm:w-20 sm:h-20"
            style={{
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            }}
            draggable={false}
          />
        </div>
      </div>

      {/* "Touch to open" below envelope */}
      <p
        className={`absolute left-1/2 -translate-x-1/2 z-[10] font-display italic tracking-[0.3em] text-taupe animate-pulse-fade select-none ${
          phase !== "idle" ? "opacity-0 transition-opacity duration-500" : ""
        }`}
        style={{ fontSize: 13, bottom: "calc(50% - min(55vw, 280px)/2 - 48px)" }}
      >
        touch to open
      </p>
    </div>
  );
};

export default SplashScreen;
