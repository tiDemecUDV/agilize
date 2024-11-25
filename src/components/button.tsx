import type { ButtonHTMLAttributes, ReactElement } from 'react'

import { cn } from '@/lib/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactElement
  isLoading?: boolean
}

export function Button({
  icon,
  disabled,
  isLoading,
  children,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <button
      disabled={isDisabled}
      className={cn(
        'w-fit h-9 flex items-center justify-center gap-2 bg-primary hover:bg-sky-700 disabled:bg-primary text-sm font-semibold text-white rounded-[10px] shadow-sm whitespace-nowrap disabled:cursor-not-allowed px-4 transition duration-300',
        className,
      )}
      {...props}
    >
      {!!icon && !isLoading && icon}
      {isLoading && (
        <div className="size-4 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}
