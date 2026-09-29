/** Reference breakpoints from Vertex design standards */
export const BREAKPOINTS = {
  mobile: 375,
  tablet: 1024,
  desktop: 1440,
} as const;

export type BreakpointName = keyof typeof BREAKPOINTS;
