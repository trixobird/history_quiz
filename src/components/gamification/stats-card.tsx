import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  gradient?: string
}

export function StatsCard({ label, value, icon: Icon, gradient }: StatsCardProps) {
  return (
    <Card className="overflow-hidden">
      {gradient && <div className={`h-1 bg-gradient-to-r ${gradient}`} />}
      <CardContent className="flex items-center gap-4 pt-4">
        <div className="rounded-lg bg-primary/10 p-3">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}
