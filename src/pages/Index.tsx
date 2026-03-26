import { useState, useEffect, useRef } from "react";
import SplashScreen from "@/components/SplashScreen";
import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import OurStory from "@/components/OurStory";
import EventDetailsSection from "@/components/EventDetailsSection";
import RsvpSection from "@/components/RsvpSection";
import PhotoGallery from "@/components/PhotoGallery";
import WeddingFooter from "@/components/WeddingFooter";
import LanguageToggle from "@/components/LanguageToggle";
import ProgressBar from "@/components/ProgressBar";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setShowContent(true);
    setTimeout(() => setIsOpen(true), 1200);
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
    <LanguageProvider>
      <div className="paper-grain">
        {!isOpen && <SplashScreen onOpen={handleOpen} />}

        {showContent && (
          <>
            <ProgressBar progress={scrollProgress} />
            <LanguageToggle />
            <div
              ref={contentRef}
              className="h-screen overflow-y-auto scroll-smooth animate-content-reveal"
            >
              <HeroSection />
              <CountdownTimer />
              <OurStory />
              <EventDetailsSection />
              <RsvpSection />
              <PhotoGallery />
              <WeddingFooter />
            </div>
          </>
        )}
      </div>
    </LanguageProvider>
  );
};

export default Index;
