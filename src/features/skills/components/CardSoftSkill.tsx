interface Props {
  name: string
}

export const CardSoftSkill = ({ name }: Props) => {
  return (
    <div className="text-center px-4 py-3 rounded-xl border border-neutral-light transition-colors cursor-pointer">
      <span className="text-primary font-semibold">
        {name}
      </span>
    </div>
  )
}
