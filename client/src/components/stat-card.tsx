import { Card, CardContent } from "@/components/ui/card"
interface StatCardProps {
  title: string
  value: number
  variant?: "default" | "high" | "medium" | "low"
}
export function StatCard({ title, value, variant = "default" }: StatCardProps) {
  const variantStyles = {
    default: "bg-card",
    high: "bg-red-50 dark:bg-red-900/10",
    medium: "bg-yellow-50 dark:bg-yellow-900/10",
    low: "bg-blue-50 dark:bg-blue-900/10",
  }
  const textStyles = {
    default: "text-foreground",
    high: "text-red-600 dark:text-red-400",
    medium: "text-yellow-600 dark:text-yellow-400",
    low: "text-blue-600 dark:text-blue-400",
  }
  return (
    <Card className={variantStyles[variant]}>
      <CardContent className="pt-6">
        <div className={`text-2xl font-bold ${textStyles[variant]}`}>{value}</div>
        <p className={`text-sm ${textStyles[variant]}/80`}>{title}</p>
      </CardContent>
    </Card>
  )
}
