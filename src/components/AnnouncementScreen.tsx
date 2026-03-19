interface AnnouncementScreenProps {
  name1?: string;
  name2?: string;
  date?: string;
}

const AnnouncementScreen = ({
  name1 = "Amira",
  name2 = "Sami",
  date = "Saturday, the Twenty-First of June",
}: AnnouncementScreenProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="text-center max-w-lg">
        {/* Top rule */}
        <div className="mx-auto w-[60px] h-px bg-sand mb-10" />

        {/* Label */}
        <p
          className="font-body uppercase text-taupe mb-8"
          style={{ fontSize: 10, letterSpacing: "0.35em" }}
        >
          You are cordially invited to
        </p>

        {/* Names */}
        <div className="space-y-1">
          <h1
            className="font-display italic text-foreground animate-fade-up"
            style={{
              fontSize: "clamp(44px, 8vw, 64px)",
              lineHeight: 1.1,
              animationDelay: "0ms",
            }}
          >
            {name1}
          </h1>
          <p
            className="font-display italic text-champagne animate-fade-up"
            style={{
              fontSize: "clamp(36px, 6vw, 52px)",
              lineHeight: 1.2,
              animationDelay: "150ms",
            }}
          >
            &amp;
          </p>
          <h1
            className="font-display italic text-foreground animate-fade-up"
            style={{
              fontSize: "clamp(44px, 8vw, 64px)",
              lineHeight: 1.1,
              animationDelay: "300ms",
            }}
          >
            {name2}
          </h1>
        </div>

        {/* Bottom rule */}
        <div className="mx-auto w-[60px] h-px bg-sand mt-10 mb-6" />

        {/* Date */}
        <p
          className="font-body uppercase text-taupe animate-fade-up"
          style={{
            fontSize: 13,
            letterSpacing: "0.2em",
            animationDelay: "450ms",
          }}
        >
          {date}
        </p>
      </div>
    </section>
  );
};

export default AnnouncementScreen;
