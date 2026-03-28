import { useEffect } from "react";

export function useClickOutside(
  ref: React.RefObject<HTMLDivElement | null>,
  onClickOutside: () => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (ref && ref.current && !ref.current.contains(target)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
}
