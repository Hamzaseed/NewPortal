import Icon from './Icon'

function NewsletterCard({
  title,
  description,
  placeholder,
  buttonLabel,
  note,
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  inputClassName = '',
  buttonClassName = '',
  noteClassName = '',
  iconName = 'mail',
  iconClassName = 'absolute -bottom-8 -right-8 h-40 w-40 text-white/10',
}) {
  return (
    <section className={`relative overflow-hidden bg-[#6b1421] p-8 text-white shadow-editorial ${className}`.trim()}>
      <div className="relative z-10">
        <h3 className={`mb-2 font-display text-2xl font-bold ${titleClassName}`.trim()}>{title}</h3>
        <p className={`mb-6 text-sm leading-6 text-white/80 ${descriptionClassName}`.trim()}>{description}</p>
        <form className="space-y-4">
          <input
            type="email"
            placeholder={placeholder}
            className={`w-full border border-white/20 bg-white/12 px-4 py-3 text-sm text-white outline-none ring-2 ring-transparent transition placeholder:text-white/60 focus:border-white/40 focus:ring-white/30 ${inputClassName}`.trim()}
          />
          <button
            type="submit"
            className={`w-full bg-white py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#6b1421] transition hover:bg-white/90 ${buttonClassName}`.trim()}
          >
            {buttonLabel}
          </button>
        </form>
        {note ? <p className={`mt-4 text-center text-[10px] italic text-white/60 ${noteClassName}`.trim()}>{note}</p> : null}
      </div>
      {iconName ? <Icon name={iconName} className={iconClassName} /> : null}
    </section>
  )
}

export default NewsletterCard
