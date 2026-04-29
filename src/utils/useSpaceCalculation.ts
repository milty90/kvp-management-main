import type React from "react";
import { useEffect, useRef, useState } from "react";

interface UseSpaceCalculationProps {
  dependencies?: React.DependencyList;
}

export function useSpaceCalculation({
  dependencies = [],
}: UseSpaceCalculationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightMeasureRef = useRef<HTMLDivElement>(null);
  const [hasEnoughSpace, setHasEnoughSpace] = useState(true);

  useEffect(() => {
    const calculateSpace = () => {
      const containerW =
        containerRef.current?.getBoundingClientRect().width ?? 0;
      const leftW = leftRef.current?.getBoundingClientRect().width ?? 0;
      const rightW =
        rightMeasureRef.current?.getBoundingClientRect().width ?? 0;

      const buffer = 16;
      setHasEnoughSpace(containerW - leftW >= rightW + buffer);
    };

    calculateSpace();

    const ro = new ResizeObserver(calculateSpace);
    if (containerRef.current) ro.observe(containerRef.current);
    if (leftRef.current) ro.observe(leftRef.current);
    if (rightMeasureRef.current) ro.observe(rightMeasureRef.current);

    return () => ro.disconnect();
  }, dependencies);

  return { containerRef, leftRef, rightMeasureRef, hasEnoughSpace };
}
