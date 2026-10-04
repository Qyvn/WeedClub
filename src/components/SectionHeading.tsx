type Props = {
  eyebrow?: string
  title: string
  copy?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = 'left',
}: Props) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl text-balance">
        {title}
      </h2>
      {copy && (
        <p className="mt-3 text-base leading-relaxed text-ink-soft md:text-lg">
          {copy}
        </p>
      )}
    </div>
  )
}
