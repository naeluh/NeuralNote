import * as React from "react"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, value, onValueChange, min, max, step, ...props }, ref) => {
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value)
    onValueChange?.([newValue])
  }

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value?.[0] ?? min}
      onChange={handleChange}
      className={cn(
        "w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer",
        "accent-primary",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Slider.displayName = "Slider"

export { Slider }


