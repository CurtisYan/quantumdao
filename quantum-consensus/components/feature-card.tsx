import { Card, CardContent } from "@/components/ui/card"
import { Atom, Network, LinkIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: "Atom" | "Network" | "Link"
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const IconComponent = () => {
    switch (icon) {
      case "Atom":
        return <Atom className="h-10 w-10 text-primary" />
      case "Network":
        return <Network className="h-10 w-10 text-primary" />
      case "Link":
        return <LinkIcon className="h-10 w-10 text-primary" />
      default:
        return <Atom className="h-10 w-10 text-primary" />
    }
  }

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-primary/10 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <div className="p-1">
        <div className="h-2 w-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-t-sm"></div>
      </div>
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <IconComponent />
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-foreground/70">{description}</p>
      </CardContent>
    </Card>
  )
}

