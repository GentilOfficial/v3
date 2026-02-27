import {techStack} from "@/config/content.config";

export default function TechStack() {
    const {title} = techStack

    return (
        <div className="flex min-h-180 flex-col items-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-center">{title}</h2>
        </div>
    );
}
