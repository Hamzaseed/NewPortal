import React from 'react'

const baseClass =
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 disabled:pointer-events-none disabled:opacity-50'

const variantClass = {
  default: 'bg-black text-white hover:bg-black/90',
  outline: 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-100',
}

export const Button = React.forwardRef(function Button(
  { className = '', variant = 'default', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`${baseClass} ${variantClass[variant] || variantClass.default} ${className}`.trim()}
      {...props}
    />
  )
})