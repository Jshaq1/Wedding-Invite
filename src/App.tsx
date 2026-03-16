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
      <TextSection />
      <ScheduleSection />
      <LocationSection />
      <FAQSection />
      <GallerySection />
      <RSVPSection />
    </div>
  );
}

export default App;
