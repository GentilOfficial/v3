import {Button} from "@/components/ui/button";

export default function Home() {
  return (
      <div className="py-4 flex gap-4">
        <div className="flex flex-col gap-8">
          <div className="h-8 w-32 rounded-md border-foreground/5 bg-foreground/5 backdrop-blur-2xl"></div>
          <h1 className="text-5xl">
            <span className="block">Lorem Ipsum</span><span>dolor sit amet.</span>
          </h1>
          <p className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi facilis in ipsa maiores possimus reiciendis voluptatem!</p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg">A</Button>
            <Button variant="secondary" size="lg">B</Button>
          </div>
        </div>
      </div>
  )
}
