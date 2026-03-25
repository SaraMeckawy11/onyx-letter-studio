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

  // Flap triangle path — wide angle, rounded bottom tip, goes to ~78% height
  const flapPath = "M0,0 L100,0 L56,38 Q50,44 44,38 L0,0 Z";
  const flapHeight = "45%";

  return (
    <div
      className={`fixed inset-0 z-50 cursor-pointer overflow-hidden ${
        phase === "fading" ? "envelope-entire-fade" : ""
      }`}
      onClick={handleClick}
    >
      {/* Full-screen envelope body */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${envelopeTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Body crease lines matching flap tip */}
      <svg
        className="absolute inset-0 w-full h-full z-[2] pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="50" y2="40" stroke="hsl(30, 14%, 78%)" strokeWidth="0.18" />
        <line x1="100" y1="0" x2="50" y2="40" stroke="hsl(30, 14%, 78%)" strokeWidth="0.18" />
        <line x1="0" y1="100" x2="50" y2="40" stroke="hsl(30, 14%, 76%)" strokeWidth="0.12" />
        <line x1="100" y1="100" x2="50" y2="40" stroke="hsl(30, 14%, 76%)" strokeWidth="0.12" />
      </svg>

      {/* HEAVY shadow under flap crease lines — realistic depth */}
      <div
        className="absolute left-0 right-0 top-0 z-[3] pointer-events-none"
        style={{ height: flapHeight }}
      >
        <svg
          viewBox="0 0 100 45"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <linearGradient id="leftShadow" x1="0" y1="0" x2="0.6" y2="1">
              <stop offset="0%" stopColor="hsl(30, 10%, 5%)" stopOpacity="0.35" />
              <stop offset="40%" stopColor="hsl(30, 10%, 8%)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rightShadow" x1="1" y1="0" x2="0.4" y2="1">
              <stop offset="0%" stopColor="hsl(30, 10%, 5%)" stopOpacity="0.35" />
              <stop offset="40%" stopColor="hsl(30, 10%, 8%)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
            <filter id="heavyShadowBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" />
            </filter>
            <filter id="tipShadowBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
          </defs>
          {/* Left crease shadow — very thick */}
          <polygon points="0,0 50,40 0,10" fill="url(#leftShadow)" filter="url(#heavyShadowBlur)" />
          <polygon points="0,0 50,40 0,7" fill="url(#leftShadow)" filter="url(#heavyShadowBlur)" opacity="0.7" />
          <polygon points="0,2 50,40 0,5" fill="url(#leftShadow)" filter="url(#heavyShadowBlur)" opacity="0.4" />
          {/* Right crease shadow — very thick */}
          <polygon points="100,0 50,40 100,10" fill="url(#rightShadow)" filter="url(#heavyShadowBlur)" />
          <polygon points="100,0 50,40 100,7" fill="url(#rightShadow)" filter="url(#heavyShadowBlur)" opacity="0.7" />
          <polygon points="100,2 50,40 100,5" fill="url(#rightShadow)" filter="url(#heavyShadowBlur)" opacity="0.4" />
          {/* Dark shadow pooling at the tip */}
          <ellipse cx="50" cy="40" rx="16" ry="5" fill="hsl(30, 8%, 8%)" opacity="0.2" filter="url(#tipShadowBlur)" />
        </svg>
      </div>

      {/* Additional shadow lines along creases */}
      <div
        className="absolute left-0 right-0 z-[4] pointer-events-none"
        style={{ top: "0", height: flapHeight }}
      >
        <svg viewBox="0 0 100 45" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <line x1="1" y1="1" x2="50" y2="40" stroke="hsl(30, 8%, 20%)" strokeWidth="0.8" opacity="0.3" />
          <line x1="99" y1="1" x2="50" y2="40" stroke="hsl(30, 8%, 20%)" strokeWidth="0.8" opacity="0.3" />
          <line x1="2" y1="2" x2="50" y2="40" stroke="hsl(30, 8%, 15%)" strokeWidth="0.4" opacity="0.15" />
          <line x1="98" y1="2" x2="50" y2="40" stroke="hsl(30, 8%, 15%)" strokeWidth="0.4" opacity="0.15" />
        </svg>
      </div>

      {/* TOP FLAP */}
      <div
        className="absolute top-0 left-0 right-0 z-[6]"
        style={{
          height: flapHeight,
          perspective: "1200px",
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
            <svg
              viewBox="0 0 100 45"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <pattern id="flapTex" patternUnits="objectBoundingBox" width="1" height="1">
                  <image
                    href={envelopeTexture}
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>
              </defs>
              <path d={flapPath} fill="url(#flapTex)" />
              <path d={flapPath} fill="hsl(34, 20%, 80%)" opacity="0.1" />
              {/* Crease lines on flap */}
              <line x1="0" y1="0" x2="50" y2="40" stroke="hsl(30, 14%, 72%)" strokeWidth="0.25" />
              <line x1="100" y1="0" x2="50" y2="40" stroke="hsl(30, 14%, 72%)" strokeWidth="0.25" />
            </svg>
          </div>

          {/* Flap back face */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateX(180deg)",
            }}
          >
            <svg
              viewBox="0 0 100 45"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <path d={flapPath} fill="hsl(34, 22%, 86%)" />
            </svg>
          </div>

          {/* Shadow under flap during opening */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-[1500ms] ${
              phase === "flap" || phase === "fading" ? "opacity-100" : "opacity-0"
            }`}
          >
            <svg
              viewBox="0 0 100 45"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <linearGradient id="openShadow" x1="0.5" y1="0" x2="0.5" y2="0.5">
                  <stop offset="0%" stopColor="hsl(30, 10%, 10%)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="100" height="40" fill="url(#openShadow)" />
            </svg>
          </div>
        </div>
      </div>

      {/* Wax seal — larger, at the tip */}
      <div
        className={`absolute left-1/2 z-[10] ${
          phase === "seal" ? "animate-seal-crack" : ""
        } ${phase === "flap" || phase === "fading" ? "envelope-seal-vanish" : ""}`}
        style={{
          top: "57%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src={waxSeal}
          alt="Wax seal"
          className="w-32 h-32 sm:w-36 sm:h-36 drop-shadow-xl"
          draggable={false}
        />
      </div>

      {/* "Touch to open" */}
      <p
        className={`absolute bottom-14 left-1/2 -translate-x-1/2 z-[10] font-display italic tracking-[0.3em] text-taupe animate-pulse-fade select-none ${
          phase !== "idle" ? "opacity-0 transition-opacity duration-500" : ""
        }`}
        style={{ fontSize: 13 }}
      >
        touch to open
      </p>
    </div>
  );
};

export default SplashScreen;
