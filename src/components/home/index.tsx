import Particles from "@/components/ui/particles";
import { AnimatedBeamQ2 } from "./animated-beam";

export function Home() {
  return (
    <div className="relative flex-1 flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-6xl font-semibold text-center bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent py-2">
        Q<span className="text-lg">2</span> Ingressos
      </h1>

      <h3 className="font-light text-center text-wrap">
        Controle total do seu evento na palma da sua mão!
      </h3>

      <Particles
        className="absolute inset-0 z-0"
        quantity={600}
        ease={80}
        color="#3427e6"
        refresh
      />

      <AnimatedBeamQ2 />
    </div>
  );
}
