import FeaturesSection from "@/components/home/features";
import Hero from "@/components/home/hero";
import LogoCloud from "@/components/home/logoCloud";
import OpenSourceSection from "@/components/home/openSourceSection";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <LogoCloud /> */}
      <FeaturesSection />
      <OpenSourceSection />
    </main>
  );
}
