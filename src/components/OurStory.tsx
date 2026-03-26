import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface TimelineEvent {
  year: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2019",
    title: "First Meeting",
    titleAr: "اللقاء الأول",
    description: "A chance encounter at a friend's gathering turned into hours of conversation.",
    descriptionAr: "لقاء بالصدفة في تجمع أصدقاء تحول إلى ساعات من الحديث.",
  },
  {
    year: "2020",
    title: "First Date",
    titleAr: "أول موعد",
    description: "Coffee turned into dinner, dinner into a moonlit walk by the river.",
    descriptionAr: "قهوة تحولت إلى عشاء، والعشاء إلى نزهة على ضوء القمر.",
  },
  {
    year: "2023",
    title: "The Proposal",
    titleAr: "طلب الزواج",
    description: "Under a canopy of stars, one question changed everything.",
    descriptionAr: "تحت سماء مرصعة بالنجوم، سؤال واحد غيّر كل شيء.",
  },
  {
    year: "2026",
    title: "Forever Begins",
    titleAr: "بداية الأبدية",
    description: "The day we say 'I do' and begin our greatest adventure.",
    descriptionAr: "اليوم الذي نقول فيه 'أقبل' ونبدأ أعظم مغامرة.",
  },
];

const TimelineItem = ({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.2);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex items-center gap-6 sm:gap-10 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${isEven ? "flex-row" : "flex-row-reverse"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`flex-1 ${isEven ? "text-right" : "text-left"}`}>
        <p className="font-display text-champagne" style={{ fontSize: 14 }}>
          {event.year}
        </p>
        <h3 className="font-display italic text-foreground mt-1" style={{ fontSize: 22 }}>
          {t(event.title, event.titleAr)}
        </h3>
        <p className="font-body text-taupe mt-2" style={{ fontSize: 13, lineHeight: 1.6 }}>
          {t(event.description, event.descriptionAr)}
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-champagne" />
      </div>

      <div className="flex-1" />
    </div>
  );
};

const OurStory = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mx-auto w-[60px] h-px bg-sand mb-10" />
          <p
            className="font-body uppercase text-taupe"
            style={{ fontSize: 10, letterSpacing: "0.35em" }}
          >
            {t("Our Story", "قصتنا")}
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-sand -translate-x-1/2" />

          <div className="space-y-16">
            {timelineEvents.map((event, i) => (
              <TimelineItem key={event.year} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
