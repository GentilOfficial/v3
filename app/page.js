import Hero from "@/components/sections/root/hero";
import Carousel from "@/components/sections/root/carousel";


export default function Home() {
    return (
        <div className="flex flex-col gap-4">
            <Hero/>
            <Carousel/>
        </div>
    )
}
