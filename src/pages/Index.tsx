import { useState, useEffect, useRef } from "react";
import SplashScreen from "@/components/SplashScreen";
import AnnouncementScreen from "@/components/AnnouncementScreen";
import EventDetailsScreen from "@/components/EventDetailsScreen";
import RsvpScreen from "@/components/RsvpScreen";
import ProgressBar from "@/components/ProgressBar";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setShowContent(true), 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const el = contentRef.current;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    const el = contentRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, [showContent]);

  return (
    <div className="paper-grain">
      {!isOpen && <SplashScreen onOpen={handleOpen} />}

      {showContent && (
        <>
          <ProgressBar progress={scrollProgress} />
          <div
            ref={contentRef}
            className="h-screen overflow-y-auto scroll-smooth animate-content-reveal"
          >
            <AnnouncementScreen />
            <EventDetailsScreen />
            <RsvpScreen />

            {/* Footer */}
            <div className="py-12 text-center">
              <p
                className="font-body uppercase text-taupe"
                style={{ fontSize: 9, letterSpacing: "0.3em" }}
              >
                Made with love
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
