import { useState } from "react";
import envelopeTexture from "@/assets/envelope-texture.jpg";
import waxSeal from "@/assets/wax-seal.png";

interface SplashScreenProps {
  onOpen: () => void;
}

const SplashScreen = ({ onOpen }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"idle" | "opening" | "exiting">("idle");

  const handleClick = () => {
    if (phase !== "idle") return;
    
    setPhase("opening");
    
    // After flaps fully open, start exit
    setTimeout(() => {
      setPhase("exiting");
      setTimeout(onOpen, 600);
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {/* Envelope body background with texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${envelopeTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Inner card revealed beneath flaps */}
      <div
        className={`absolute inset-0 z-[1] flex items-center justify-center bg-background transition-opacity duration-500 ${
          phase === "opening" || phase === "exiting" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-center">
          <p className="font-body uppercase text-xs tracking-[0.35em] text-taupe mb-4">
            Wedding Invitation
          </p>
          <h1 className="font-display italic text-4xl sm:text-5xl text-foreground">
            A & S
          </h1>
        </div>
      </div>

      {/* TOP FLAP - triangle pointing down, folds upward */}
      <div
        className={`absolute top-0 left-0 right-0 z-[5] ${
          phase === "opening" || phase === "exiting" ? "envelope-flap-top" : ""
        }`}
        style={{
          height: "50%",
          transformOrigin: "top center",
          perspective: "1200px",
        }}
      >
        <div
          className={`w-full h-full ${
            phase === "opening" || phase === "exiting" ? "envelope-flap-top-inner" : ""
          }`}
          style={{
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
          }}
        >
          <svg
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <defs>
              <pattern id="topFlapTex" patternUnits="objectBoundingBox" width="1" height="1">
                <image href={envelopeTexture} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
              </pattern>
            </defs>
            <polygon points="0,0 100,0 50,50" fill="url(#topFlapTex)" />
            <polygon points="0,0 100,0 50,50" fill="hsl(34, 22%, 88%)" opacity="0.12" />
            <line x1="0" y1="0" x2="50" y2="50" stroke="hsl(30, 14%, 78%)" strokeWidth="0.2" />
            <line x1="100" y1="0" x2="50" y2="50" stroke="hsl(30, 14%, 78%)" strokeWidth="0.2" />
          </svg>
        </div>
      </div>

      {/* BOTTOM FLAP - triangle pointing up, folds downward */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-[5] ${
          phase === "opening" || phase === "exiting" ? "envelope-flap-bottom" : ""
        }`}
        style={{
          height: "50%",
          transformOrigin: "bottom center",
          perspective: "1200px",
        }}
      >
        <div
          className={`w-full h-full ${
            phase === "opening" || phase === "exiting" ? "envelope-flap-bottom-inner" : ""
          }`}
          style={{
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
          }}
        >
          <svg
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <defs>
              <pattern id="bottomFlapTex" patternUnits="objectBoundingBox" width="1" height="1">
                <image href={envelopeTexture} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
              </pattern>
            </defs>
            <polygon points="0,50 100,50 50,0" fill="url(#bottomFlapTex)" />
            <polygon points="0,50 100,50 50,0" fill="hsl(30, 14%, 82%)" opacity="0.15" />
            <line x1="0" y1="50" x2="50" y2="0" stroke="hsl(30, 14%, 78%)" strokeWidth="0.2" />
            <line x1="100" y1="50" x2="50" y2="0" stroke="hsl(30, 14%, 78%)" strokeWidth="0.2" />
          </svg>
        </div>
      </div>

      {/* LEFT FLAP - triangle pointing right, folds left */}
      <div
        className={`absolute top-0 left-0 bottom-0 z-[4] ${
          phase === "opening" || phase === "exiting" ? "envelope-flap-left" : ""
        }`}
        style={{
          width: "50%",
          transformOrigin: "left center",
          perspective: "1200px",
        }}
      >
        <div
          className={`w-full h-full ${
            phase === "opening" || phase === "exiting" ? "envelope-flap-left-inner" : ""
          }`}
          style={{
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
          }}
        >
          <svg
            viewBox="0 0 50 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <defs>
              <pattern id="leftFlapTex" patternUnits="objectBoundingBox" width="1" height="1">
                <image href={envelopeTexture} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
              </pattern>
            </defs>
            <polygon points="0,0 0,100 50,50" fill="url(#leftFlapTex)" />
            <polygon points="0,0 0,100 50,50" fill="hsl(30, 14%, 85%)" opacity="0.18" />
            <line x1="0" y1="0" x2="50" y2="50" stroke="hsl(30, 14%, 78%)" strokeWidth="0.2" />
            <line x1="0" y1="100" x2="50" y2="50" stroke="hsl(30, 14%, 78%)" strokeWidth="0.2" />
          </svg>
        </div>
      </div>

      {/* RIGHT FLAP - triangle pointing left, folds right */}
      <div
        className={`absolute top-0 right-0 bottom-0 z-[4] ${
          phase === "opening" || phase === "exiting" ? "envelope-flap-right" : ""
        }`}
        style={{
          width: "50%",
          transformOrigin: "right center",
          perspective: "1200px",
        }}
      >
        <div
          className={`w-full h-full ${
            phase === "opening" || phase === "exiting" ? "envelope-flap-right-inner" : ""
          }`}
          style={{
            transformOrigin: "right center",
            transformStyle: "preserve-3d",
          }}
        >
          <svg
            viewBox="0 0 50 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <defs>
              <pattern id="rightFlapTex" patternUnits="objectBoundingBox" width="1" height="1">
                <image href={envelopeTexture} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
              </pattern>
            </defs>
            <polygon points="50,0 50,100 0,50" fill="url(#rightFlapTex)" />
            <polygon points="50,0 50,100 0,50" fill="hsl(30, 14%, 85%)" opacity="0.18" />
            <line x1="50" y1="0" x2="0" y2="50" stroke="hsl(30, 14%, 78%)" strokeWidth="0.2" />
            <line x1="50" y1="100" x2="0" y2="50" stroke="hsl(30, 14%, 78%)" strokeWidth="0.2" />
          </svg>
        </div>
      </div>

      {/* Wax seal at the center intersection */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[10] transition-all ${
          phase === "opening" || phase === "exiting"
            ? "opacity-0 scale-75 duration-400"
            : "duration-0"
        }`}
      >
        <img
          src={waxSeal}
          alt="Wax seal"
          className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-lg"
          draggable={false}
        />
      </div>

      {/* "Touch to open" text */}
      <p
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-[10] font-display italic text-xs tracking-[0.3em] text-taupe animate-pulse-fade select-none ${
          phase !== "idle" ? "opacity-0 transition-opacity duration-300" : ""
        }`}
        style={{ fontSize: 13 }}
      >
        touch to open
      </p>

      {/* Overall fade out for exit */}
      {phase === "exiting" && (
        <div className="absolute inset-0 z-[20] bg-background envelope-fade-in" />
      )}
    </div>
  );
};

export default SplashScreen;
