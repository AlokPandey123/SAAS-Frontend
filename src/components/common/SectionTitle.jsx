const SectionTitle = ({ eyebrow, title, subtitle }) => {
  return (
    <div className="space-y-2">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">{title}</h2>
      {subtitle ? <p className="max-w-2xl text-zinc-600">{subtitle}</p> : null}
    </div>
  )
}

export default SectionTitle
