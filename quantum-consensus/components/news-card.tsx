import { Card, CardContent } from "@/components/ui/card"

interface NewsCardProps {
  title: string
  date: string
  category: string
  description: string
}

export default function NewsCard({ title, date, category, description }: NewsCardProps) {
  return (
    <Card className="bg-background/50 backdrop-blur-sm border-primary/10 overflow-hidden">
      <div className="p-1">
        <div className="h-2 w-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-t-sm"></div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{category}</div>
          <div className="text-xs text-foreground/60">{date}</div>
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-foreground/70 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

