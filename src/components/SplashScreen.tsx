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
    setTimeout(() => setPhase("flap"), 500);
    setTimeout(() => setPhase("fading"), 2800);
    setTimeout(onOpen, 3800);
  };

  const flapPath = "M0,0 L100,0 L56,38 Q50,44 44,38 L0,0 Z";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background cursor-pointer ${
        phase === "fading" ? "envelope-entire-fade" : ""
      }`}
      onClick={handleClick}
    >
      {/* Envelope container — realistic proportions */}
      <div
        className="relative shadow-2xl"
        style={{
          width: "min(85vw, 420px)",
          height: "min(55vw, 280px)",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        {/* Envelope body texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${envelopeTexture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid hsl(30, 18%, 82%)",
            borderRadius: "4px",
          }}
        />

        {/* Body crease lines */}
        <svg
          className="absolute inset-0 w-full h-full z-[2] pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="0" x2="50" y2="55" stroke="hsl(30, 14%, 78%)" strokeWidth="0.2" />
          <line x1="100" y1="0" x2="50" y2="55" stroke="hsl(30, 14%, 78%)" strokeWidth="0.2" />
          <line x1="0" y1="100" x2="50" y2="55" stroke="hsl(30, 14%, 76%)" strokeWidth="0.15" />
          <line x1="100" y1="100" x2="50" y2="55" stroke="hsl(30, 14%, 76%)" strokeWidth="0.15" />
        </svg>

        {/* Heavy crease shadows */}
        <div className="absolute inset-0 z-[3] pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="leftShadow" x1="0" y1="0" x2="0.6" y2="0.7">
                <stop offset="0%" stopColor="hsl(30, 10%, 5%)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(30, 10%, 8%)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="rightShadow" x1="1" y1="0" x2="0.4" y2="0.7">
                <stop offset="0%" stopColor="hsl(30, 10%, 5%)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(30, 10%, 8%)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>
              <filter id="heavyShadowBlur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>
              <filter id="tipShadowBlur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
            </defs>
            <polygon points="0,0 50,55 0,10" fill="url(#leftShadow)" filter="url(#heavyShadowBlur)" />
            <polygon points="0,0 50,55 0,6" fill="url(#leftShadow)" filter="url(#heavyShadowBlur)" opacity="0.5" />
            <polygon points="100,0 50,55 100,10" fill="url(#rightShadow)" filter="url(#heavyShadowBlur)" />
            <polygon points="100,0 50,55 100,6" fill="url(#rightShadow)" filter="url(#heavyShadowBlur)" opacity="0.5" />
            <ellipse cx="50" cy="55" rx="14" ry="5" fill="hsl(30, 8%, 8%)" opacity="0.18" filter="url(#tipShadowBlur)" />
            {/* Crease shadow lines */}
            <line x1="1" y1="1" x2="50" y2="55" stroke="hsl(30, 8%, 18%)" strokeWidth="0.7" opacity="0.25" />
            <line x1="99" y1="1" x2="50" y2="55" stroke="hsl(30, 8%, 18%)" strokeWidth="0.7" opacity="0.25" />
          </svg>
        </div>

        {/* Bottom fold shadow */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
          style={{
            height: "50%",
            background: "linear-gradient(to top, hsl(34, 18%, 82%, 0.2) 0%, transparent 100%)",
          }}
        />

        {/* TOP FLAP */}
        <div
          className="absolute top-0 left-0 right-0 z-[6]"
          style={{
            height: "55%",
            perspective: "800px",
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
            {/* Flap front */}
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
              <svg viewBox="0 0 100 55" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                <defs>
                  <pattern id="flapTex" patternUnits="objectBoundingBox" width="1" height="1">
                    <image href={envelopeTexture} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
                  </pattern>
                </defs>
                <path d={flapPath} fill="url(#flapTex)" />
                <path d={flapPath} fill="hsl(34, 20%, 78%)" opacity="0.1" />
                <line x1="0" y1="0" x2="50" y2="40" stroke="hsl(30, 14%, 70%)" strokeWidth="0.3" />
                <line x1="100" y1="0" x2="50" y2="40" stroke="hsl(30, 14%, 70%)" strokeWidth="0.3" />
              </svg>
            </div>

            {/* Flap back */}
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}>
              <svg viewBox="0 0 100 55" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                <path d={flapPath} fill="hsl(34, 22%, 86%)" />
              </svg>
            </div>

            {/* Shadow during opening */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-[1500ms] ${
                phase === "flap" || phase === "fading" ? "opacity-100" : "opacity-0"
              }`}
            >
              <svg viewBox="0 0 100 55" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="openShadow" x1="0.5" y1="0" x2="0.5" y2="0.6">
                    <stop offset="0%" stopColor="hsl(30, 10%, 10%)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="100" height="30" fill="url(#openShadow)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Wax seal */}
        <div
          className={`absolute left-1/2 z-[10] ${
            phase === "seal" ? "animate-seal-crack" : ""
          } ${phase === "flap" || phase === "fading" ? "envelope-seal-vanish" : ""}`}
          style={{
            top: "48%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src={waxSeal}
            alt="Wax seal"
            className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-xl"
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
