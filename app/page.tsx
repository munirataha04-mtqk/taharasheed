import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import About from "@/components/About";
import Contact from "@/components/Contact";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProjects />
      <About />
      <Contact />
    </>
  );
}