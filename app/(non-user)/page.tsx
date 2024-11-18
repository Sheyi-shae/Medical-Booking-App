import Layer1 from "@/components/Layer1";
import Hero from "@/components/ui/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex  flex-col items-center w-full ">
    <Hero/>
    <Layer1/>
    </main>
  );
}
