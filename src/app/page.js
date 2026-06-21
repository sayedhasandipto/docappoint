import About from "@/component/About";
import TopRatedDoctor from "@/component/TopRatedDoctor";
import Value from "@/component/Value";
import HeroBanner from "@/component/HeroBanner";
import StatsSection from "@/component/StatsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black w-full overflow-x-hidden">
      <HeroBanner />
      <StatsSection />
      <TopRatedDoctor />
      <Value />
      <About />
    </div>
  );
}
