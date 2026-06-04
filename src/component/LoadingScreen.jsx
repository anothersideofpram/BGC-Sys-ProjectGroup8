export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300">
      <div className="h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-pink-600 text-sm animate-pulse font-medium">Loading...</p>
    </div>
  );
}