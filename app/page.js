import Hero from "@/components/sections/root/hero";
import TechStack from "@/components/sections/root/tech-stack";


export default function Home() {
    return (
        <div className="flex flex-col gap-4">
            <Hero/>
            <TechStack/>
        </div>
    )
}
