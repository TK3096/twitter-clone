import React from 'react'

import { cn } from '@/lib/utils'

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FloatingInput: React.FC<FloatingInputProps> = React.forwardRef<
  HTMLInputElement,
  FloatingInputProps
>(({ className, type, id, label, error, ...props }, ref) => {
  return (
    <div
      className={cn(
        'relative border-2 rounded-md space-y-0 px-3 py-2 focus-within:border-2 focus-within:border-white focus-within:border-solid',
        error && 'focus-within:border-red-500',
      )}
    >
      <input
        ref={ref}
        id={id}
        placeholder=' '
        type={type}
        className='bg-transparent w-full text-md outline-none border-none px-4 pt-3 text-white peer'
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          'absolute left-4 top-3 scale-75 transform duration-150 peer-placeholder-shown:scale-100 peer-focus:scale-75 -translate-y-3 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 text-white',
          error && 'text-red-500',
        )}
      >
        {label}
      </label>
    </div>
  )
})

FloatingInput.displayName = 'FloatingInput'
