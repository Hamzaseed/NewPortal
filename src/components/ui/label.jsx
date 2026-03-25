import React from 'react'

export const Label = React.forwardRef(function Label(
  { className = '', ...props },
  ref,
) {
  return (
    <label
      ref={ref}
      className={`mb-1 inline-block text-sm font-medium text-slate-700 ${className}`.trim()}
      {...props}
    />
  )
})