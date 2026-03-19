import { useState } from "react";
import envelopeTexture from "@/assets/envelope-texture.jpg";
import waxSeal from "@/assets/wax-seal.png";

interface SplashScreenProps {
  onOpen: () => void;
}

const SplashScreen = ({ onOpen }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"idle" | "cracking" | "opening" | "exiting">("idle");

  const handleClick = () => {
    if (phase !== "idle") return;
    
    setPhase("cracking");
    
    setTimeout(() => setPhase("opening"), 400);
    setTimeout(() => {
      setPhase("exiting");
      setTimeout(onOpen, 800);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {/* Full-screen envelope body with texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${envelopeTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Top flap - V-shaped triangle covering top portion */}
      <div
        className={`absolute top-0 left-0 right-0 ${
          phase === "opening" || phase === "exiting" ? "envelope-flap-open" : ""
        }`}
        style={{
          height: "55vh",
          transformOrigin: "top center",
          zIndex: 10,
          perspective: "1200px",
        }}
      >
        <div
          className={`w-full h-full ${
            phase === "opening" || phase === "exiting" ? "envelope-flap-inner" : ""
          }`}
          style={{
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
          }}
        >
          <svg
            viewBox="0 0 100 55"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <defs>
              <pattern id="flapTexture" patternUnits="objectBoundingBox" width="1" height="1">
                <image
                  href={envelopeTexture}
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            </defs>
            <polygon
              points="0,0 100,0 50,55"
              fill="url(#flapTexture)"
            />
            {/* Subtle shadow/crease line */}
            <line x1="0" y1="0" x2="50" y2="55" stroke="hsl(30, 14%, 72%)" strokeWidth="0.15" />
            <line x1="100" y1="0" x2="50" y2="55" stroke="hsl(30, 14%, 72%)" strokeWidth="0.15" />
          </svg>
          {/* Slightly darker overlay on flap for depth */}
          <svg
            viewBox="0 0 100 55"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <polygon
              points="0,0 100,0 50,55"
              fill="hsl(30, 14%, 75%)"
              opacity="0.15"
            />
          </svg>
        </div>
      </div>

      {/* Bottom flap - inverted V */}
      <div
        className={`absolute bottom-0 left-0 right-0 ${
          phase === "exiting" ? "envelope-bottom-open" : ""
        }`}
        style={{
          height: "50vh",
          zIndex: 5,
        }}
      >
        <svg
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <pattern id="bottomTexture" patternUnits="objectBoundingBox" width="1" height="1">
              <image
                href={envelopeTexture}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>
          <polygon
            points="0,50 100,50 50,0"
            fill="url(#bottomTexture)"
          />
          <polygon
            points="0,50 100,50 50,0"
            fill="hsl(34, 22%, 88%)"
            opacity="0.2"
          />
          <line x1="0" y1="50" x2="50" y2="0" stroke="hsl(30, 14%, 78%)" strokeWidth="0.15" />
          <line x1="100" y1="50" x2="50" y2="0" stroke="hsl(30, 14%, 78%)" strokeWidth="0.15" />
        </svg>
      </div>

      {/* Left flap */}
      <div
        className={`absolute top-0 left-0 bottom-0 ${
          phase === "exiting" ? "envelope-left-open" : ""
        }`}
        style={{
          width: "30vw",
          zIndex: 3,
        }}
      >
        <svg
          viewBox="0 0 30 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <polygon
            points="0,0 0,100 30,50"
            fill="hsl(34, 22%, 90%)"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Right flap */}
      <div
        className={`absolute top-0 right-0 bottom-0 ${
          phase === "exiting" ? "envelope-right-open" : ""
        }`}
        style={{
          width: "30vw",
          zIndex: 3,
        }}
      >
        <svg
          viewBox="0 0 30 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <polygon
            points="30,0 30,100 0,50"
            fill="hsl(34, 22%, 90%)"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Wax Seal - centered at the meeting point of flaps */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 ${
          phase === "cracking" ? "animate-seal-crack" : ""
        } ${phase === "opening" || phase === "exiting" ? "envelope-seal-fade" : ""}`}
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
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-20 font-display italic text-xs tracking-[0.3em] text-taupe animate-pulse-fade select-none ${
          phase !== "idle" ? "opacity-0 transition-opacity duration-300" : ""
        }`}
        style={{ fontSize: 13 }}
      >
        touch to open
      </p>

      {/* Inner card (revealed when flap opens) */}
      <div
        className={`absolute inset-0 z-1 flex items-center justify-center bg-background ${
          phase === "exiting" ? "envelope-card-reveal" : "opacity-0"
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
    </div>
  );
};

export default SplashScreen;
