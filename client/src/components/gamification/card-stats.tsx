interface CardStatsProps {
  title: string
  value: string | number
  className?: string
}

export function CardStats({ title, value, className }: CardStatsProps) {
  return (
    <div className={`rounded-lg bg-white p-6 shadow-sm ${className}`}>
      <h3 className="text-3xl font-bold">{value}</h3>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  )
}

