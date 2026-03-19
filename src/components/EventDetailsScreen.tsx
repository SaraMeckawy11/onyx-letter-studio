import { MapPin, Clock } from "lucide-react";

interface DetailBlockProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailBlock = ({ icon, label, value }: DetailBlockProps) => (
  <div className="flex flex-col items-center gap-3 py-8 px-6">
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

interface EventDetailsScreenProps {
  venue?: string;
  time?: string;
}

const EventDetailsScreen = ({
  venue = "The Grand Riad, Marrakech",
  time = "Six O'Clock in the Evening",
}: EventDetailsScreenProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl">
        {/* Top rule */}
        <div className="mx-auto w-[60px] h-px bg-sand mb-10" />

        <p
          className="text-center font-body uppercase text-taupe mb-12"
          style={{ fontSize: 10, letterSpacing: "0.35em" }}
        >
          Celebration Details
        </p>

        <div
          className="bg-card rounded-sm grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-sand"
          style={{
            boxShadow: "0 4px 24px hsl(30, 14%, 75%, 0.1)",
          }}
        >
          <DetailBlock
            icon={<MapPin size={24} strokeWidth={1} />}
            label="Venue"
            value={venue}
          />
          <DetailBlock
            icon={<Clock size={24} strokeWidth={1} />}
            label="Time"
            value={time}
          />
        </div>

        {/* Bottom rule */}
        <div className="mx-auto w-[60px] h-px bg-sand mt-10" />
      </div>
    </section>
  );
};

export default EventDetailsScreen;
