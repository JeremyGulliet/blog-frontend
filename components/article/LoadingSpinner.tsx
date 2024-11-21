export function LoadingSpinner() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-gray-300">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-400 border-t-blue-500"></div>
      <p className="text-xl font-medium text-gray-700">
        Chargement de l&apos;article...
      </p>
    </div>
  );
}
