import * as DialogPrimitive from '@radix-ui/react-dialog'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal

export function DialogOverlay({ className = '', ...props }) {
  return (
    <DialogPrimitive.Overlay
      className={`fixed inset-0 z-40 bg-black/50 ${className}`.trim()}
      {...props}
    />
  )
}