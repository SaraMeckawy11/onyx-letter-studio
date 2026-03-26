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
    setTimeout(() => {
      setPhase("fading");
      onOpen();
    }, 2800);
  };

  const flapPath = "M0,0 L100,0 L56,38 Q50,44 44,38 L0,0 Z";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background cursor-pointer ${
        phase === "fading" ? "envelope-entire-fade" : ""
      }`}
      onClick={handleClick}
    >
      {/* Envelope container */}
      <div
        className="relative"
        style={{
          width: "min(85vw, 420px)",
          height: "min(55vw, 280px)",
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
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
                <path d={flapPath} fill="hsl(34, 20%, 78%)" opacity="0.08" />
              </svg>
            </div>

            {/* Flap back */}
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}>
              <svg viewBox="0 0 100 55" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                <path d={flapPath} fill="hsl(34, 22%, 86%)" />
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
