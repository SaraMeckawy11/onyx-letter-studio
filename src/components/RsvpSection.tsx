import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface RsvpData {
  name: string;
  guests: string;
  attending: string;
  meal: string;
  message: string;
}

const RsvpSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<RsvpData>({
    name: "",
    guests: "1",
    attending: "yes",
    meal: "",
    message: "",
  });

  const handleChange = (field: keyof RsvpData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("wedding-rsvps") || "[]");
    existing.push({ ...form, timestamp: new Date().toISOString() });
    localStorage.setItem("wedding-rsvps", JSON.stringify(existing));
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-transparent border-0 border-b border-sand text-foreground font-body placeholder:text-taupe/50 py-3 outline-none focus:border-champagne transition-colors";

  return (
    <section className="py-24 px-6">
      <div
        ref={ref}
        className={`w-full max-w-md mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mx-auto w-[60px] h-px bg-sand mb-10" />

        <p
          className="font-body uppercase text-taupe mb-12"
          style={{ fontSize: 10, letterSpacing: "0.35em" }}
        >
          {t("Kindly Respond", "نرجو الرد")}
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder={t("Your full name", "الاسم الكامل")}
              required
              className={inputClass}
              style={{ fontSize: 15, letterSpacing: "0.05em" }}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-taupe block mb-2" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  {t("Number of Guests", "عدد الضيوف")}
                </label>
                <select
                  value={form.guests}
                  onChange={(e) => handleChange("guests", e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-sand text-foreground font-body py-3 outline-none focus:border-champagne"
                  style={{ fontSize: 15 }}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={String(n)}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-body text-taupe block mb-2" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  {t("Attending", "الحضور")}
                </label>
                <select
                  value={form.attending}
                  onChange={(e) => handleChange("attending", e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-sand text-foreground font-body py-3 outline-none focus:border-champagne"
                  style={{ fontSize: 15 }}
                >
                  <option value="yes">{t("Joyfully Accept", "بكل سرور")}</option>
                  <option value="no">{t("Regretfully Decline", "نعتذر بأسف")}</option>
                </select>
              </div>
            </div>

            <input
              type="text"
              value={form.meal}
              onChange={(e) => handleChange("meal", e.target.value)}
              placeholder={t("Meal preference (optional)", "تفضيل الوجبة (اختياري)")}
              className={inputClass}
              style={{ fontSize: 15, letterSpacing: "0.05em" }}
            />

            <textarea
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder={t("A message for the couple (optional)", "رسالة للعروسين (اختياري)")}
              rows={3}
              className={`${inputClass} resize-none`}
              style={{ fontSize: 15, letterSpacing: "0.05em" }}
            />

            <div className="text-center pt-4">
              <button
                type="submit"
                className="inline-block px-10 py-3 rounded-full bg-foreground text-background font-body uppercase transition-colors duration-300 hover:bg-champagne"
                style={{ fontSize: 12, letterSpacing: "0.2em" }}
              >
                {t("RSVP Now", "تأكيد الحضور")}
              </button>
            </div>
          </form>
        ) : (
          <div className="animate-fade-up space-y-4">
            <svg width="48" height="48" viewBox="0 0 48 48" className="mx-auto">
              <circle cx="24" cy="24" r="22" fill="none" stroke="hsl(var(--champagne))" strokeWidth="1" />
              <path d="M15 24 L21 30 L33 18" fill="none" stroke="hsl(var(--champagne))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-checkmark" />
            </svg>
            <p className="font-display italic text-foreground" style={{ fontSize: 22 }}>
              {t("Thank You", "شكراً لكم")}
            </p>
            <p className="font-body text-taupe" style={{ fontSize: 13, letterSpacing: "0.08em" }}>
              {t("We look forward to celebrating with you", "نتطلع للاحتفال معكم")}
            </p>
          </div>
        )}

        <div className="mx-auto w-[60px] h-px bg-sand mt-16" />
      </div>
    </section>
  );
};

export default RsvpSection;
