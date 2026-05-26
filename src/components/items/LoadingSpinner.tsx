interface LoadingSpinnerProps {
  text?: string;
  size?: "small" | "medium" | "large";
}

export default function LoadingSpinner({
  text,
  size = "medium",
}: LoadingSpinnerProps) {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "h-12 w-12 border-t-4";
      case "large":
        return "h-32 w-32 border-t-8";
      case "medium":
      default:
        return "h-24 w-24 border-t-6";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className={`animate-spin rounded-full ${getSizeClasses()} border-blue-500`}
      ></div>
      {text && <p className="text-text-primary pl-4 mt-10">{text}</p>}
    </div>
  );
}
