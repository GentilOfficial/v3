"use client"
import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {motion} from "motion/react";
import Image from "next/image";
import {useTheme} from "next-themes";

const ColorBends = dynamic(() => import("@/components/ui/ColorBends"), {
    ssr: false,
});

export default function BackgroundClient(props) {
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
            transition={{duration: 0.5, ease: "easeInOut"}}
            style={{width: "100vw", height: "100vh"}}
        >
            {isMobile ? (
                <Image
                    src={mobileBg}
                    width={1920}
                    height={1080}
                    alt="Background"
                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                />
            ) : (
                <ColorBends {...props} />
            )}
        </motion.div>
    );
}
