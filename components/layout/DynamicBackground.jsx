"use client"
import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {motion} from "motion/react";
import Image from "next/image";
import {useTheme} from "next-themes";

const ColorBends = dynamic(() => import("@/components/ui/ColorBends"), {
    ssr: false,
});

const MOBILE_BACKGROUNDS = {
    light: "/assets/mobile-background-light.webp",
    dark: "/assets/mobile-background-dark.webp",
};

const MASK = "mask-[linear-gradient(to_bottom,white,transparent)]";

export default function DynamicBackground() {
    const [isMobile, setIsMobile] = useState(null);
    const {resolvedTheme} = useTheme();

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");

        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener("change", update);

        return () => mq.removeEventListener("change", update);
    }, []);

    if (isMobile === null) return (<div className="absolute inset-x-0 top-0 -z-20 h-screen"/>);

    const mobileBg = MOBILE_BACKGROUNDS[resolvedTheme] ?? MOBILE_BACKGROUNDS.dark;

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.8, ease: [0.25, 0.5, 0.75, 0.25]}}
            className="absolute inset-x-0 top-0 -z-20 h-screen opacity-60 md:blur-md overflow-hidden pointer-events-none will-change-transform"
        >
            {isMobile ? (
                <Image
                    sizes="100vw"
                    src={mobileBg}
                    fill
                    alt="Hero background"
                    role="presentation"
                    style={{objectFit: "cover"}}
                    loading="eager"
                    priority
                    className={MASK}
                />
            ) : (
                <ColorBends
                    rotation={80}
                    speed={0.25}
                    colors={["#D22F27", "#E27022"]}
                    transparent
                    autoRotate={0.45}
                    scale={1}
                    frequency={1}
                    warpStrength={1}
                    mouseInfluence={0}
                    parallax={0}
                    noise={0}
                    className={MASK}
                />
            )}
        </motion.div>
    );
}