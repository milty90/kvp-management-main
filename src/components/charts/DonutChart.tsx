import { useEffect, useMemo, useState } from "react";
import type { Kvp } from "../../types";

interface DonutChartProps {
  kvps: Kvp[];
}

export const DonutChart = ({ kvps }: DonutChartProps) => {
  const planCount = kvps.filter((k) => k.state === "Plan").length;
  const doCount = kvps.filter((k) => k.state === "Do").length;
  const checkCount = kvps.filter((k) => k.state === "Check").length;
  const actCount = kvps.filter((k) => k.state === "Act").length;

  const segments = useMemo(
    () => [
      { label: "Plan", value: planCount, color: "#F59E0B" },
      { label: "Do", value: doCount, color: "#3B82F6" },
      { label: "Check", value: checkCount, color: "#7C3AED" },
      { label: "Act", value: actCount, color: "#10B981" },
    ],
    [planCount, doCount, checkCount, actCount],
  );

  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const duration = 900;
    let frameId = 0;
    let startTime = 0;

    setAnimationProgress(0);

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      setAnimationProgress(easedProgress);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [segments]);

  const finalTotal = segments.reduce((sum, segment) => sum + segment.value, 0);
  const total = finalTotal * animationProgress;
  const nonZeroSegmentCount = segments.filter(
    (segment) => segment.value > 0,
  ).length;

  const size = 300;
  const center = size / 2;
  const radius = 110;
  const strokeWidth = 25;
  const gapAngle = 0.4;
  const startAngle = -Math.PI / 2;

  const polarToCartesian = (angle: number) => ({
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
  });

  const describeArc = (arcStart: number, arcEnd: number) => {
    const start = polarToCartesian(arcStart);
    const end = polarToCartesian(arcEnd);
    const largeArcFlag = arcEnd - arcStart > Math.PI ? 1 : 0;

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  let currentAngle = startAngle;
  const drawableAngle = Math.PI * 2 - nonZeroSegmentCount * gapAngle;

  const arcs = segments
    .filter((segment) => segment.value > 0 && finalTotal > 0)
    .map((segment) => {
      const fullSweep = (segment.value / finalTotal) * drawableAngle;
      const sweep = fullSweep * animationProgress;
      const arcStart = currentAngle;
      const arcEnd = arcStart + sweep;
      currentAngle = arcEnd + gapAngle * animationProgress;

      return {
        ...segment,
        d: describeArc(arcStart, arcEnd),
      };
    });

  const hexToRgb = (hex: string) => {
    const normalized = hex.replace("#", "");
    const bigint = parseInt(normalized, 16);

    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const mixColor = (fromHex: string, toHex: string, t: number) => {
    const from = hexToRgb(fromHex);
    const to = hexToRgb(toHex);

    const r = Math.round(from.r + (to.r - from.r) * t);
    const g = Math.round(from.g + (to.g - from.g) * t);
    const b = Math.round(from.b + (to.b - from.b) * t);

    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "30px",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          position: "relative",
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
          />

          {arcs.map((arc) => (
            <path
              key={arc.label}
              d={arc.d}
              fill="none"
              stroke={mixColor("#D1D5DB", arc.color, animationProgress)}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          ))}
        </svg>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: "28px", fontWeight: 700, lineHeight: 1 }}>
            {Math.round(total)}
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "#6B7280",
              letterSpacing: "0.08em",
            }}
          >
            Gesamt
          </span>
        </div>
      </div>

      <div style={{ display: "grid", gap: "16px" }}>
        {segments.map((segment) => (
          <div
            key={segment.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "16px",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: segment.color,
                display: "inline-block",
              }}
            />
            <span>{segment.label}</span>
            <span style={{ color: "#6B7280" }}>{segment.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
