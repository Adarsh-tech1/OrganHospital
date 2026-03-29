import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import HowItWorks from "../components/home/HowItWorks";
import VideoSection from "../components/home/VideoSection";
import Schemes from "../components/home/Schemes";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <VideoSection />
      <Schemes />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;
