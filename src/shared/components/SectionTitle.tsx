interface Props {
  title: string
  description: string
}

export const SectionTitle = ({ title, description }: Props) => {
  return (
    <div className="border-l-4 border-primary pl-4">
      <h2 className="text-2xl font-bold text-background-dark">{title}</h2>
      <p className="text-neutral-medium/70">{description}</p>
    </div>
  )
}
