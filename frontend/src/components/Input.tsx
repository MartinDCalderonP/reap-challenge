import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const Input = ({ className = '', ...props }: InputProps) => (
  <input
    className={`border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
    {...props}
  />
)

export default Input
