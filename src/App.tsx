import Hero from "./components/Hero";
import TextSection from "./components/TextSection";
import ScheduleSection from "./components/ScheduleSection";
import LocationSection from "./components/LocationSection";
import GallerySection from "./components/GallerySection";
import FAQSection from "./components/FAQSection";
import RSVPSection from "./components/RSVPSection";

function App() {
  return (
    <div>
      <Hero />
      <div style={{ position: "relative", zIndex: 1, transform: "translateZ(0)" }}>
        <TextSection />
        <ScheduleSection />
        <LocationSection />
        <FAQSection />
        <GallerySection />
        <RSVPSection />
      </div>
    </div>
  );
}

export default App;
