function SectionTitle({ title, actionLabel }) {
  return (
    <header className="mb-8 flex items-center justify-between border-b-2 border-slate-900 pb-2">
      <h2 className="section-heading">{title}</h2>
      {actionLabel ? (
        <a href="#" className="text-sm font-bold text-primary transition hover:underline">
          {actionLabel}
        </a>
      ) : null}
    </header>
  )
}

export default SectionTitle
