import { forwardRef, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  errorMessage?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, errorMessage, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-0.5">
        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-900">
          <label
            htmlFor={id}
            className="w-32 shrink-0 leading-tight py-2 sm:py-0 sm:mr-2"
          >
            {label}
          </label>

          <input
            id={id}
            maxLength={80}
            className={cn(
              'w-full h-9 bg-gray-100 rounded-lg px-2.5',
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>

        {errorMessage && (
          <span className="text-xs text-red-500 sm:ml-34">{errorMessage}</span>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
