type WhiteButtonProps = {
  icon?: string;
  children: React.ReactNode;
};

export default function WhiteButton({
  icon = "/done.svg",
  children,
}: WhiteButtonProps) {
  return (
    <button
      className="
          inline-flex items-center gap-2 px-4 py-2 rounded-lg
          bg-white hover:bg-gray-50
          text-gray-700 hover:text-gray-900 text-sm font-medium
          border border-gray-200 hover:border-gray-300
          shadow-[0_1px_2px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.05)]
          hover:shadow-[0_1px_3px_rgba(0,0,0,0.1),0_3px_8px_rgba(0,0,0,0.08)]
          active:scale-[0.98] active:bg-gray-100
          transition-all duration-150
        "
    >
      {icon ? (
        <img src={icon ? icon : "/done.svg"} alt="Icon" className="h-4 w-4 " />
      ) : null}
      {children}
    </button>
  );
}
