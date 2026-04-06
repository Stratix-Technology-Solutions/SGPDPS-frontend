import { BiSolidMessageError } from 'react-icons/bi'

export const BannerMessageError = ({ message }: { message: string }) => {
  return (
    <div className="bg-red-600 border border-red-700 text-white rounded-2xl px-4 py-3 text-center">
      <BiSolidMessageError className="w-6 h-6 inline" />
      <span> {message}</span>
    </div>
  )
}
