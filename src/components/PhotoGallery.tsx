import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const placeholderImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&h=500&fit=crop",
];

const PhotoGallery = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
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
            {t("Moments Together", "لحظاتنا معاً")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {placeholderImages.map((src, i) => (
            <GalleryImage key={i} src={src} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const GalleryImage = ({ src, index }: { src: string; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-sm group cursor-pointer transition-all duration-700 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <img
        src={src}
        alt=""
        className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
    </div>
  );
};

export default PhotoGallery;
