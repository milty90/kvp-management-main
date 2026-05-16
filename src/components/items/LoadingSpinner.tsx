interface LoadingSpinnerProps {
  text?: string;
}

export default function LoadingSpinner({ text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-t-6 border-blue-500"></div>
      {text && <p className="text-text-primary pl-4 mt-10">{text}</p>}
    </div>
  );
}
