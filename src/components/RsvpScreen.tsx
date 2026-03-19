import { useState } from "react";

const RsvpScreen = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md text-center">
        {/* Top rule */}
        <div className="mx-auto w-[60px] h-px bg-sand mb-10" />

        <p
          className="font-body uppercase text-taupe mb-12"
          style={{ fontSize: 10, letterSpacing: "0.35em" }}
        >
          Kindly Respond
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your email address"
              required
              className="w-full bg-transparent border-0 border-b border-sand text-foreground font-body placeholder:text-taupe/50 text-center py-3 outline-none focus:border-champagne transition-colors"
              style={{ fontSize: 15, letterSpacing: "0.08em" }}
            />

            <button
              type="submit"
              className="inline-block px-10 py-3 rounded-full bg-foreground text-background font-body uppercase transition-colors duration-300 hover:bg-champagne"
              style={{ fontSize: 12, letterSpacing: "0.2em" }}
            >
              RSVP Now
            </button>
          </form>
        ) : (
          <div className="animate-fade-up space-y-4">
            {/* Checkmark */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              className="mx-auto"
            >
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="hsl(var(--champagne))"
                strokeWidth="1"
              />
              <path
                d="M15 24 L21 30 L33 18"
                fill="none"
                stroke="hsl(var(--champagne))"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-checkmark"
              />
            </svg>
            <p className="font-display italic text-foreground" style={{ fontSize: 22 }}>
              Thank You
            </p>
            <p className="font-body text-taupe" style={{ fontSize: 13, letterSpacing: "0.08em" }}>
              We look forward to celebrating with you
            </p>
          </div>
        )}

        {/* Bottom rule */}
        <div className="mx-auto w-[60px] h-px bg-sand mt-16" />
      </div>
    </section>
  );
};

export default RsvpScreen;
