import { MapPin, Clock, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface DetailBlockProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay?: number;
}

const DetailBlock = ({ icon, label, value, delay = 0 }: DetailBlockProps) => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-3 py-8 px-6 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-champagne">{icon}</div>
      <p
        className="font-body uppercase text-taupe"
        style={{ fontSize: 10, letterSpacing: "0.3em" }}
      >
        {label}
      </p>
      <p className="font-display text-foreground text-center" style={{ fontSize: 22 }}>
        {value}
      </p>
    </div>
  );
};

const EventDetailsSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 px-6">
      <div className="w-full max-w-3xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mx-auto w-[60px] h-px bg-sand mb-10" />
          <p
            className="font-body uppercase text-taupe"
            style={{ fontSize: 10, letterSpacing: "0.35em" }}
          >
            {t("Celebration Details", "تفاصيل الحفل")}
          </p>
        </div>

        <div
          className="bg-card rounded-sm grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-sand"
          style={{ boxShadow: "0 4px 24px hsl(30, 14%, 75%, 0.1)" }}
        >
          <DetailBlock
            icon={<Calendar size={24} strokeWidth={1} />}
            label={t("Date", "التاريخ")}
            value={t("June 21, 2026", "٢١ يونيو ٢٠٢٦")}
            delay={0}
          />
          <DetailBlock
            icon={<Clock size={24} strokeWidth={1} />}
            label={t("Time", "الوقت")}
            value={t("Six O'Clock in the Evening", "السادسة مساءً")}
            delay={150}
          />
          <DetailBlock
            icon={<MapPin size={24} strokeWidth={1} />}
            label={t("Venue", "المكان")}
            value={t("The Grand Riad, Marrakech", "الرياض الكبير، مراكش")}
            delay={300}
          />
        </div>

        {/* Google Maps Embed */}
        <div className="mt-12 rounded-sm overflow-hidden" style={{ boxShadow: "0 4px 24px hsl(30, 14%, 75%, 0.1)" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.5!2d-8.0!3d31.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM3JzQ4LjAiTiA4wrAwMCcwMC4wIlc!5e0!3m2!1sen!2s!4v1"
            width="100%"
            height="280"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding venue location"
          />
        </div>

        <div className="mx-auto w-[60px] h-px bg-sand mt-12" />
      </div>
    </section>
  );
};

export default EventDetailsSection;
