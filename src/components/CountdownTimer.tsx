import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CountdownTimerProps {
  weddingDate?: string;
}

const CountdownTimer = ({ weddingDate = "2026-06-21T18:00:00" }: CountdownTimerProps) => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  const calculateTimeLeft = () => {
    const diff = new Date(weddingDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft), 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  const blocks = [
    { value: timeLeft.days, label: t("Days", "أيام") },
    { value: timeLeft.hours, label: t("Hours", "ساعات") },
    { value: timeLeft.minutes, label: t("Minutes", "دقائق") },
    { value: timeLeft.seconds, label: t("Seconds", "ثوانٍ") },
  ];

  return (
    <section ref={ref} className="py-24 px-6">
      <div
        className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p
          className="font-body uppercase text-taupe mb-12"
          style={{ fontSize: 10, letterSpacing: "0.35em" }}
        >
          {t("Counting Down To", "العد التنازلي")}
        </p>

        <div className="flex justify-center gap-6 sm:gap-10">
          {blocks.map((block) => (
            <div key={block.label} className="flex flex-col items-center">
              <span
                className="font-display text-foreground tabular-nums"
                style={{ fontSize: "clamp(32px, 6vw, 56px)", lineHeight: 1 }}
              >
                {String(block.value).padStart(2, "0")}
              </span>
              <span
                className="font-body uppercase text-taupe mt-2"
                style={{ fontSize: 9, letterSpacing: "0.25em" }}
              >
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
