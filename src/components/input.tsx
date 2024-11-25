import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { forwardRef, useState, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  errorMessage?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, label, errorMessage, className, ...props }, ref) => {
    const isPasswordInput = type === 'password'

    const [isHidden, setIsHidden] = useState(isPasswordInput)

    return (
      <div className="flex flex-col gap-0.5">
        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-900">
          <label
            htmlFor={id}
            className="w-32 shrink-0 leading-tight py-2 sm:py-0 sm:mr-2"
          >
            {label}
          </label>

          <div className="w-full relative">
            <input
              id={id}
              type={isPasswordInput && !isHidden ? 'text' : type}
              className={cn(
                'w-full h-9 bg-gray-100 rounded-lg px-2.5',
                className,
              )}
              ref={ref}
              {...props}
            />

            {isPasswordInput && (
              <div
                onClick={() => setIsHidden((prevState) => !prevState)}
                className="absolute top-1/2 transl right-2.5 -translate-y-1/2 cursor-pointer"
              >
                {isHidden ? (
                  <EyeIcon className="size-5 text-gray-900" />
                ) : (
                  <EyeSlashIcon className="size-5 text-gray-900" />
                )}
              </div>
            )}
          </div>
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
