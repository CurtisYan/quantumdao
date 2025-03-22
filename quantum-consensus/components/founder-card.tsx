import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface FounderCardProps {
  name: string
  title: string
  description: string
  imagePath: string
  style: "tech" | "metallic"
}

export default function FounderCard({ name, title, description, imagePath, style }: FounderCardProps) {
  return (
    <Card className="bg-background/50 backdrop-blur-sm border-primary/10 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <div className="p-1">
        <div
          className={`h-2 w-full ${style === "tech" ? "bg-gradient-to-r from-cyan-500 to-purple-600" : "bg-gradient-to-r from-purple-600 to-cyan-500"} rounded-t-sm`}
        ></div>
      </div>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-1/3 aspect-square rounded-lg overflow-hidden">
            <div
              className={`absolute inset-0 ${style === "tech" ? "bg-gradient-to-br from-cyan-500/20 to-purple-600/20" : "bg-gradient-to-br from-purple-600/20 to-cyan-500/20"}`}
            ></div>
            <Image
              src={imagePath || "/placeholder.svg"}
              alt={name}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 ${style === "tech" ? "bg-gradient-to-t from-background to-transparent" : "bg-gradient-to-t from-background to-transparent"} opacity-40`}
            ></div>
          </div>
          <div className="w-full md:w-2/3">
            <h3
              className={`text-xl font-bold mb-1 group-hover:${style === "tech" ? "text-cyan-400" : "text-purple-400"} transition-colors`}
            >
              {name}
            </h3>
            <p className="text-sm text-primary mb-4">{title}</p>
            <p className="text-foreground/70 text-sm">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

