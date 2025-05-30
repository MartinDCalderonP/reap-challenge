import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  color?: 'primary' | 'secondary' | 'danger' | 'gray'
  fullWidth?: boolean
}

const colorMap = {
  primary: 'bg-green-800 hover:bg-green-900 text-white',
  secondary: 'bg-gray-700 hover:bg-gray-800 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  gray: 'bg-gray-300 hover:bg-gray-400 text-gray-800'
}

const Button = ({
  children,
  className = '',
  color = 'primary',
  disabled,
  fullWidth = false,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    className={`rounded font-semibold py-2 px-4 text-lg transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
      colorMap[color]
    }${fullWidth ? ' w-full' : ''} ${className}`}
    disabled={disabled}
    type={type}
    {...props}
  >
    {children}
  </button>
)

export default Button
