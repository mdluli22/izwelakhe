import type { SVGProps } from "react";

const paths = {
  strategy: "M4 20V10m8 10V4m8 16v-7M2 20h20",
  construction: "m14 5 5 5M3 21l8-8m-3-3 6-6 6 6-6 6z",
  property: "m3 10 9-7 9 7M5 9v12h14V9M9 21v-7h6v7",
  layers: "m12 3 10 5-10 5L2 8zM2 12l10 5 10-5M2 16l10 5 10-5",
  mail: "M3 5h18v14H3zM3 5l9 7 9-7",
  clock: "M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  location: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  check: "m5 12 4 4L19 6",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "m6 6 12 12M6 18 18 6",
  arrowRight: "M4 12h16m-6-6 6 6-6 6",
  arrowUpRight: "M5 19 19 5M5 5h14v14",
  arrowUp: "M12 20V4m-6 6 6-6 6 6",
  diamond: "m12 3 9 9-9 9-9-9z",
} as const;

export type IconName = keyof typeof paths;

export default function Icon({ name, style, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }} {...props}>
      <path d={paths[name]} />
    </svg>
  );
}
