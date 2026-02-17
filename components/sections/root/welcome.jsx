import welcome from "@/config/content.config";
import routes from "@/config/routes.config";
import {Terminal, AnimatedSpan, TypingAnimation} from "@/components/ui/terminal";

export default function Welcome() {
    const { terminal, title, secondTitle, description } = welcome;
    return (
        <div className="flex flex-col lg:flex-row gap-4 min-h-180">
            <div className="flex flex-col gap-8 flex-1">
                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl">
                    <span className="block">{title}</span>
                    <span>{secondTitle}</span>
                </h1>
                <p className="text-muted-foreground max-w-4/5">{description}</p>
            </div>

            <div className="flex-1 flex items-start justify-center lg:justify-end">
                <Terminal className="max-w-lg h-fit">
                    <TypingAnimation>{terminal.command}</TypingAnimation>

                    {terminal.output.map((line, i) => (
                        <AnimatedSpan key={i}>{line}</AnimatedSpan>
                    ))}

                    {routes.map((route, i) => (
                        <AnimatedSpan key={`route-${i}`}>
                            {i === 0 ? "┌" : i === routes.length - 1 ? "└" : "├"} ○ {route.href}
                        </AnimatedSpan>
                    ))}

                    <AnimatedSpan></AnimatedSpan>
                    <TypingAnimation>{terminal.success}</TypingAnimation>
                </Terminal>
            </div>
        </div>
    )
}