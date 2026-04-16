import { ButtonDeleteSkill } from './ButtonDeleteSkill'

interface Props {
  id: number
  name: string
}

export const CardSoftSkill = ({ id, name }: Props) => {
  return (
    <div className="flex flex-col justify-between h-full bg-white border border-neutral-medium/20 rounded-xl p-4 gap-3 hover:shadow-md transition-shadow">
      <span className="text-primary font-semibold">
        {name}
      </span>

      <div className="flex justify-end">
        <ButtonDeleteSkill
          id={id}
          route="soft-skills"
          queryKey={['user', 'skills', 'soft']}
        />
      </div>
    </div>
  )
}
