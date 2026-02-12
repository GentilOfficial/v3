import {Button} from "@/components/ui/button";

export default function Home() {
  return (
      <div className="py-4 flex gap-4">
        <div className="flex flex-col gap-8">
          <div className="h-8 w-32 rounded-md border-foreground/5 bg-foreground/5 backdrop-blur-2xl"></div>
          <h1 className="text-5xl">
            <span className="block">Premium Agency</span><span>for Creatives.</span>
          </h1>
          <p className="text-muted-foreground">Harnessing the power of artificial intelligence to evolutionize industries and enhance human experiences.</p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg">Connect With Us</Button>
            <Button variant="secondary" size="lg">What i Landing?</Button>
          </div>
        </div>
      </div>
  )
}
