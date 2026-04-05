export function SuccesModal({ message }: { message: string }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Éxito</h3>
                    <p className="text-sm text-gray-500">{message}</p>
                    <p className="text-xs text-gray-400 mt-2">Redirigiendo al login...</p>
                </div>
            </div>
        </div>
    )
}