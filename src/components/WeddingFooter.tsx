import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const WeddingFooter = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  return (
    <footer
      ref={ref}
      className={`py-20 px-6 text-center transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Monogram */}
      <div className="mb-8">
        <span
          className="font-display italic text-champagne"
          style={{ fontSize: 48, lineHeight: 1 }}
        >
          A
        </span>
        <span
          className="font-display italic text-sand mx-2"
          style={{ fontSize: 28 }}
        >
          &amp;
        </span>
        <span
          className="font-display italic text-champagne"
          style={{ fontSize: 48, lineHeight: 1 }}
        >
          S
        </span>
      </div>

      <p
        className="font-body text-taupe max-w-sm mx-auto"
        style={{ fontSize: 13, lineHeight: 1.8, letterSpacing: "0.05em" }}
      >
        {t(
          "Thank you for being part of our story. We can't wait to celebrate with you.",
          "شكراً لكونكم جزءاً من قصتنا. لا نستطيع الانتظار للاحتفال معكم."
        )}
      </p>

      <div className="mx-auto w-[60px] h-px bg-sand mt-10 mb-6" />

      <p
        className="font-body uppercase text-taupe"
        style={{ fontSize: 9, letterSpacing: "0.3em" }}
      >
        {t("Made with love", "صُنع بحب")}
      </p>
    </footer>
  );
};

export default WeddingFooter;
