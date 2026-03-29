import { useState } from "react";
import envelopeTexture from "@/assets/envelope-texture.jpg";
import waxSeal from "@/assets/wax-seal.png";

interface SplashScreenProps {
  onOpen: () => void;
}

const SplashScreen = ({ onOpen }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"idle" | "seal" | "flap" | "reveal" | "fading">("idle");

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("seal");
    setTimeout(() => setPhase("flap"), 500);
    setTimeout(() => setPhase("reveal"), 1800);
    setTimeout(() => {
      setPhase("fading");
      onOpen();
    }, 3200);
  };

  // More realistic pointed flap with visible fold lines
  const flapPath = "M0,0 L100,0 L52,42 Q50,45 48,42 L0,0 Z";

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
          overflow: "visible",
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

        {/* Inner card / letter that rises up */}
        <div
          className={`absolute left-[8%] right-[8%] z-[3] ${
            phase === "reveal" || phase === "fading" ? "envelope-letter-rise" : ""
          }`}
          style={{
            top: "10%",
            bottom: "8%",
            borderRadius: "2px",
            background: "hsl(var(--background))",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            border: "1px solid hsl(30, 18%, 88%)",
          }}
        >
          {/* Decorative content hint on the letter */}
          <div className="flex flex-col items-center justify-center h-full opacity-60 px-4">
            <div className="w-12 h-[1px] bg-muted-foreground/30 mb-3" />
            <p className="font-display text-muted-foreground/50 text-sm tracking-[0.2em] italic">
              You're Invited
            </p>
            <div className="w-12 h-[1px] bg-muted-foreground/30 mt-3" />
          </div>
        </div>

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
              phase === "flap" || phase === "reveal" || phase === "fading" ? "envelope-flap-open" : ""
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
                {/* Subtle overlay for depth */}
                <path d={flapPath} fill="hsl(34, 20%, 78%)" opacity="0.06" />
                {/* Visible fold lines on the triangle */}
                <line x1="0" y1="0" x2="48" y2="42" stroke="hsl(30, 15%, 72%)" strokeWidth="0.4" opacity="0.6" />
                <line x1="100" y1="0" x2="52" y2="42" stroke="hsl(30, 15%, 72%)" strokeWidth="0.4" opacity="0.6" />
                <line x1="0" y1="0" x2="100" y2="0" stroke="hsl(30, 15%, 72%)" strokeWidth="0.3" opacity="0.4" />
              </svg>
            </div>

            {/* Flap back (lighter inside) */}
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}>
              <svg viewBox="0 0 100 55" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                <path d={flapPath} fill="hsl(34, 22%, 88%)" />
                <line x1="0" y1="0" x2="48" y2="42" stroke="hsl(30, 15%, 78%)" strokeWidth="0.3" opacity="0.4" />
                <line x1="100" y1="0" x2="52" y2="42" stroke="hsl(30, 15%, 78%)" strokeWidth="0.3" opacity="0.4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Wax seal */}
        <div
          className={`absolute left-1/2 z-[10] ${
            phase === "seal" ? "animate-seal-crack" : ""
          } ${phase === "flap" || phase === "reveal" || phase === "fading" ? "envelope-seal-vanish" : ""}`}
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
