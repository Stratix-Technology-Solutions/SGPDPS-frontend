interface LoadingSpinnerProps {
  message?: string
}

export function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <div className="py-6 sm:py-10">
      <div className="max-w-2xl mx-auto px-3 sm:px-0">
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            {message && <p className="text-sm text-neutral-medium mt-2">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
