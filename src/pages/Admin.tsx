import { useState } from "react";

const Admin = () => {
  const [rsvps, setRsvps] = useState(() => {
    return JSON.parse(localStorage.getItem("wedding-rsvps") || "[]");
  });

  const clearRsvps = () => {
    localStorage.removeItem("wedding-rsvps");
    setRsvps([]);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display italic text-foreground" style={{ fontSize: 32 }}>
            Admin Panel
          </h1>
          <a href="/" className="font-body text-taupe underline" style={{ fontSize: 13 }}>
            ← Back to invitation
          </a>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-foreground" style={{ fontSize: 22 }}>
              RSVP Responses ({rsvps.length})
            </h2>
            {rsvps.length > 0 && (
              <button
                onClick={clearRsvps}
                className="px-4 py-2 rounded bg-destructive text-destructive-foreground font-body"
                style={{ fontSize: 12 }}
              >
                Clear All
              </button>
            )}
          </div>

          {rsvps.length === 0 ? (
            <p className="font-body text-taupe" style={{ fontSize: 14 }}>
              No RSVPs yet.
            </p>
          ) : (
            <div className="space-y-4">
              {rsvps.map((rsvp: any, i: number) => (
                <div
                  key={i}
                  className="bg-card rounded-sm p-6 border border-sand"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="font-body text-taupe uppercase" style={{ fontSize: 9, letterSpacing: "0.2em" }}>Name</p>
                      <p className="font-body text-foreground mt-1" style={{ fontSize: 14 }}>{rsvp.name}</p>
                    </div>
                    <div>
                      <p className="font-body text-taupe uppercase" style={{ fontSize: 9, letterSpacing: "0.2em" }}>Guests</p>
                      <p className="font-body text-foreground mt-1" style={{ fontSize: 14 }}>{rsvp.guests}</p>
                    </div>
                    <div>
                      <p className="font-body text-taupe uppercase" style={{ fontSize: 9, letterSpacing: "0.2em" }}>Attending</p>
                      <p className="font-body text-foreground mt-1" style={{ fontSize: 14 }}>
                        {rsvp.attending === "yes" ? "✓ Yes" : "✗ No"}
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-taupe uppercase" style={{ fontSize: 9, letterSpacing: "0.2em" }}>Meal</p>
                      <p className="font-body text-foreground mt-1" style={{ fontSize: 14 }}>{rsvp.meal || "—"}</p>
                    </div>
                  </div>
                  {rsvp.message && (
                    <div className="mt-4 pt-4 border-t border-sand">
                      <p className="font-body text-taupe italic" style={{ fontSize: 13 }}>"{rsvp.message}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
