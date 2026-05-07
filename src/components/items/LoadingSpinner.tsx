export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-t-6 border-blue-500"></div>
    </div>
  );
}
