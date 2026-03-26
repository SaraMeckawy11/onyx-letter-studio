import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface HeroSectionProps {
  name1?: string;
  name2?: string;
  date?: string;
  tagline?: string;
}

const HeroSection = ({
  name1 = "Amira",
  name2 = "Sami",
  date = "June 21, 2026",
  tagline = "Together, forever begins",
}: HeroSectionProps) => {
  const { t, isRTL } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      <div
        className={`text-center max-w-lg transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mx-auto w-[60px] h-px bg-sand mb-10" />

        <p
          className="font-body uppercase text-taupe mb-8"
          style={{ fontSize: 10, letterSpacing: "0.35em" }}
        >
          {t("You are cordially invited to the wedding of", "أنتم مدعوون بكل حب لحفل زفاف")}
        </p>

        <div className="space-y-1">
          <h1
            className={`font-display italic text-foreground ${isRTL ? "font-arabic" : ""}`}
            style={{
              fontSize: "clamp(44px, 8vw, 64px)",
              lineHeight: 1.1,
            }}
          >
            {name1}
          </h1>
          <p
            className="font-display italic text-champagne"
            style={{
              fontSize: "clamp(36px, 6vw, 52px)",
              lineHeight: 1.2,
            }}
          >
            &amp;
          </p>
          <h1
            className={`font-display italic text-foreground ${isRTL ? "font-arabic" : ""}`}
            style={{
              fontSize: "clamp(44px, 8vw, 64px)",
              lineHeight: 1.1,
            }}
          >
            {name2}
          </h1>
        </div>

        <div className="mx-auto w-[60px] h-px bg-sand mt-10 mb-6" />

        <p
          className="font-body uppercase text-taupe"
          style={{ fontSize: 13, letterSpacing: "0.2em" }}
        >
          {date}
        </p>

        <p
          className="font-display italic text-champagne mt-6"
          style={{ fontSize: 18 }}
        >
          {t(tagline, "معًا، تبدأ الأبدية")}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
