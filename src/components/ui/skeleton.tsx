import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-white dark:bg-black border border-[#EBEBEB]", className)}
      {...props}
    />
  )
}

export { Skeleton }
