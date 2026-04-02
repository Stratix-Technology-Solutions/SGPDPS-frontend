import { MdWarning } from 'react-icons/md'

export const InputMessageError = ({ message }: { message: string }) => {
  return (
    <em role="alert" className="text-red-400 text-sm">
      <MdWarning className="inline" />
      <span> {message}</span>
    </em>
  )
}
