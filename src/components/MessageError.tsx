import { BiError } from 'react-icons/bi'

export const MessageError = ({ message }: { message: string }) => {
  return (
    <em role="alert" className="text-red-400 text-sm flex items-center gap-1 flex-wrap">
      <BiError className="w-5 h-5" />
      <span>{message}</span>
    </em>
  )
}
