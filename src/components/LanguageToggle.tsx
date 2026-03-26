import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="fixed top-4 right-4 z-40 px-3 py-1.5 rounded-full border border-sand bg-background/80 backdrop-blur-sm font-body text-foreground transition-all hover:bg-sand/30"
      style={{ fontSize: 12, letterSpacing: "0.1em" }}
    >
      {lang === "en" ? "عربي" : "EN"}
    </button>
  );
};

export default LanguageToggle;
