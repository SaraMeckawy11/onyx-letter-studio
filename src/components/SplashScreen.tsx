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
        {/* Left crease from top-left to center */}
        <line x1="0" y1="0" x2="50" y2="45" stroke="hsl(30, 14%, 82%)" strokeWidth="0.12" />
        {/* Right crease from top-right to center */}
        <line x1="100" y1="0" x2="50" y2="45" stroke="hsl(30, 14%, 82%)" strokeWidth="0.12" />
        {/* Bottom-left crease */}
        <line x1="0" y1="100" x2="50" y2="55" stroke="hsl(30, 14%, 80%)" strokeWidth="0.08" />
        {/* Bottom-right crease */}
        <line x1="100" y1="100" x2="50" y2="55" stroke="hsl(30, 14%, 80%)" strokeWidth="0.08" />
      </svg>

      {/* Subtle shadow/depth along the bottom fold area */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
        style={{
          height: "55%",
          background: "linear-gradient(to top, hsl(34, 18%, 86%, 0.15) 0%, transparent 100%)",
        }}
      />

      {/* TOP FLAP — the only flap that opens */}
      <div
        className="absolute top-0 left-0 right-0 z-[6]"
        style={{
          height: "48%",
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
              viewBox="0 0 100 48"
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
              <polygon points="0,0 100,0 50,48" fill="url(#flapTex)" />
              {/* Slightly darker overlay for depth differentiation */}
              <polygon points="0,0 100,0 50,48" fill="hsl(34, 20%, 84%)" opacity="0.1" />
              {/* Crease lines */}
              <line x1="0" y1="0" x2="50" y2="48" stroke="hsl(30, 14%, 78%)" strokeWidth="0.15" />
              <line x1="100" y1="0" x2="50" y2="48" stroke="hsl(30, 14%, 78%)" strokeWidth="0.15" />
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
              viewBox="0 0 100 48"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <polygon points="0,0 100,0 50,48" fill="hsl(34, 22%, 88%)" />
            </svg>
          </div>

          {/* Shadow that appears under the flap as it opens */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
              phase === "flap" || phase === "fading" ? "opacity-100" : "opacity-0"
            }`}
          >
            <svg
              viewBox="0 0 100 48"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <linearGradient id="flapShadow" x1="0.5" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="hsl(30, 10%, 20%)" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points="0,0 100,0 50,48" fill="url(#flapShadow)" />
            </svg>
          </div>
        </div>
      </div>

      {/* Wax seal — at the tip of the top flap where it meets the body */}
      <div
        className={`absolute left-1/2 z-[10] -translate-x-1/2 ${
          phase === "seal" ? "animate-seal-crack" : ""
        } ${phase === "flap" || phase === "fading" ? "envelope-seal-vanish" : ""}`}
        style={{
          top: "43%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src={waxSeal}
          alt="Wax seal"
          className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-lg"
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
