/** Clamp a value between min and max. */
export const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

/** Map a value from one range to another, clamped. */
export const mapRange = (
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => outMin + (outMax - outMin) * clamp((val - inMin) / (inMax - inMin), 0, 1);

/** Elastic overshoot easing — items land with a physical "snap". */
export const easeOutBack = (x: number): number => {
  const c1 = 2.0;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
