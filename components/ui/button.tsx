import * as React from "react"
import { cn } from "../cn"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
  size?: "default" | "lg" | "sm"
  asChild?: boolean
}

export function Button({ className, variant = "default", size = "default", asChild, children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none disabled:opacity-50"
  const variants = {
    default: "bg-green-500 text-black hover:bg-green-400",
    outline: "border border-white/40 bg-transparent text-white hover:bg-white/10"
  }
  const sizes = {
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    sm: "px-3 py-1 text-xs"
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
      className: cn(base, variants[variant], sizes[size], className),
    })
  }

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}