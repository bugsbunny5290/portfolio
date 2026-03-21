import { ExperienceHighlights } from "@/components/home/experience-highlights";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { TechHighlights } from "@/components/home/tech-highlights";

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Hero />
      <div className="max-w-6xl mx-auto px-6 md:px-24 pb-12 sm:pb-24">
        <hr className="section-divider mb-8 sm:mb-16" />
        <Features />
        <hr className="section-divider my-8 sm:my-16" />
        <ExperienceHighlights />
        <hr className="section-divider my-8 sm:my-16" />
        <TechHighlights />
      </div>
    </>
  );
}
