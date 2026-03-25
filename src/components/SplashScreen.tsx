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

    // 1. Seal cracks
    setPhase("seal");

    // 2. Flap starts opening after seal cracks
    setTimeout(() => setPhase("flap"), 500);

    // 3. After flap fully opens, fade everything away
    setTimeout(() => setPhase("fading"), 2200);

    // 4. Reveal content
    setTimeout(onOpen, 3200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 cursor-pointer overflow-hidden ${
        phase === "fading" ? "envelope-entire-fade" : ""
      }`}
      onClick={handleClick}
    >
      {/* Full-screen envelope body with embossed texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${envelopeTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Subtle diagonal fold lines on the body (left & right creases) */}
      <svg
        className="absolute inset-0 w-full h-full z-[2] pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Left crease from top-left to center-bottom */}
        <line x1="0" y1="0" x2="50" y2="60" stroke="hsl(30, 14%, 82%)" strokeWidth="0.12" />
        {/* Right crease from top-right to center-bottom */}
        <line x1="100" y1="0" x2="50" y2="60" stroke="hsl(30, 14%, 82%)" strokeWidth="0.12" />
        {/* Bottom-left crease */}
        <line x1="0" y1="100" x2="50" y2="60" stroke="hsl(30, 14%, 80%)" strokeWidth="0.08" />
        {/* Bottom-right crease */}
        <line x1="100" y1="100" x2="50" y2="60" stroke="hsl(30, 14%, 80%)" strokeWidth="0.08" />
      </svg>

      {/* Subtle shadow/depth along the bottom fold area */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
        style={{
          height: "55%",
          background: "linear-gradient(to top, hsl(34, 18%, 86%, 0.15) 0%, transparent 100%)",
        }}
      />

      {/* Shadow under the flap fold lines — gives depth/realism */}
      <div
        className="absolute left-0 right-0 z-[3] pointer-events-none"
        style={{
          top: "0",
          height: "62%",
        }}
      >
        <svg
          viewBox="0 0 100 62"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <linearGradient id="leftCreaseShadow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(30, 10%, 15%)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rightCreaseShadow" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(30, 10%, 15%)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
            <filter id="creaseShadowBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
            </filter>
          </defs>
          {/* Left crease shadow */}
          <polygon points="0,0 50,60 0,4" fill="url(#leftCreaseShadow)" filter="url(#creaseShadowBlur)" />
          {/* Right crease shadow */}
          <polygon points="100,0 50,60 100,4" fill="url(#rightCreaseShadow)" filter="url(#creaseShadowBlur)" />
        </svg>
      </div>

      {/* TOP FLAP — the only flap that opens */}
      <div
        className="absolute top-0 left-0 right-0 z-[6]"
        style={{
          height: "62%",
          perspective: "1800px",
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
              viewBox="0 0 100 62"
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
              {/* Wider triangle with rounded bottom corner via path */}
              <path
                d="M0,0 L100,0 L100,0 L54,59 Q50,62 46,59 L0,0 Z"
                fill="url(#flapTex)"
              />
              {/* Slightly darker overlay for depth */}
              <path
                d="M0,0 L100,0 L54,59 Q50,62 46,59 L0,0 Z"
                fill="hsl(34, 20%, 82%)"
                opacity="0.12"
              />
              {/* Crease lines */}
              <line x1="0" y1="0" x2="50" y2="60" stroke="hsl(30, 14%, 76%)" strokeWidth="0.18" />
              <line x1="100" y1="0" x2="50" y2="60" stroke="hsl(30, 14%, 76%)" strokeWidth="0.18" />
            </svg>
          </div>

          {/* Flap back face (visible when flipped) */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateX(180deg)",
            }}
          >
            <svg
              viewBox="0 0 100 62"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <path
                d="M0,0 L100,0 L54,59 Q50,62 46,59 L0,0 Z"
                fill="hsl(34, 22%, 88%)"
              />
            </svg>
          </div>

          {/* Shadow that appears under the flap as it opens */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
              phase === "flap" || phase === "fading" ? "opacity-100" : "opacity-0"
            }`}
          >
            <svg
              viewBox="0 0 100 62"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <linearGradient id="flapShadow" x1="0.5" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="hsl(30, 10%, 20%)" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,0 L100,0 L54,59 Q50,62 46,59 L0,0 Z"
                fill="url(#flapShadow)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Wax seal — at the tip of the top flap */}
      <div
        className={`absolute left-1/2 z-[10] -translate-x-1/2 ${
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
          className="w-28 h-28 sm:w-32 sm:h-32 drop-shadow-lg"
          draggable={false}
        />
      </div>

      {/* "Touch to open" text at bottom */}
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
