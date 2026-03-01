import Hero from "@/components/sections/root/hero";
import TechStack from "@/components/sections/root/tech-stack";
import FAQ from "@/components/sections/root/faq";


export default function Home() {
    return (
        <div className="flex flex-col gap-4">
            <Hero/>
            <TechStack/>
            <FAQ/>
        </div>
    )
}
