"use client"
import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {motion} from "motion/react";
import Image from "next/image";
import {useTheme} from "next-themes";
import {cn} from "@/lib/utils";

const ColorBends = dynamic(() => import("@/components/ui/ColorBends"), {
    ssr: false,
});

export default function DynamicBackground() {
    const [isMobile, setIsMobile] = useState(false);
    const {theme} = useTheme();

    useEffect(() => {
        const handleResize = () => {
            requestAnimationFrame(() => {
                setIsMobile(window.innerWidth <= 768);
            });
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mobileBackgrounds = {
        light: "/assets/mobile-background-light.webp",
        dark: "/assets/mobile-background-dark.webp",
    };

    const mobileBg = mobileBackgrounds[theme] || mobileBackgrounds.dark;

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5, ease: [0.25, 0.5, 0.75, 0.25]}}
            className="absolute -z-20 size-full max-h-screen opacity-60 blur-sm md:blur-md overflow-hidden"
        >
            {isMobile ? (
                <Image
                    src={mobileBg}
                    width={1920}
                    height={1080}
                    alt="Background"
                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                    loading="eager"
                    className={cn(
                        "mask-[linear-gradient(to_bottom,white,transparent)]"
                    )}
                />
            ) : (
                <ColorBends
                    rotation={80}
                    speed={0.25}
                    colors={["#004cff", "#1100ff", "#006eff", "#263fc0"]}
                    transparent
                    autoRotate={0.45}
                    scale={1}
                    frequency={1}
                    warpStrength={1}
                    mouseInfluence={0}
                    parallax={0}
                    noise={0}
                    className={cn(
                        "mask-[linear-gradient(to_bottom,white,transparent)]"
                    )}
                />
            )}
        </motion.div>
    );
}
