import * as DialogPrimitive from '@radix-ui/react-dialog'

export function Dialog(props) {
  return <DialogPrimitive.Root {...props} />
}

export function DialogTrigger(props) {
  return <DialogPrimitive.Trigger {...props} />
}

export function DialogPortal(props) {
  return <DialogPrimitive.Portal {...props} />
}

export function DialogOverlay({ className = '', ...props }) {
  return (
    <DialogPrimitive.Overlay
      className={`fixed inset-0 z-40 bg-black/50 ${className}`.trim()}
      {...props}
    />
  )
}
