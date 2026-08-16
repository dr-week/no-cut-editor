export type EasingName =
  | "linear"
  | "easeInSine" | "easeOutSine" | "easeInOutSine"
  | "easeInQuad" | "easeOutQuad" | "easeInOutQuad"
  | "easeInCubic" | "easeOutCubic" | "easeInOutCubic"
  | "easeInQuart" | "easeOutQuart" | "easeInOutQuart"
  | "easeInQuint" | "easeOutQuint" | "easeInOutQuint"
  | "easeInExpo" | "easeOutExpo" | "easeInOutExpo"
  | "easeInCirc" | "easeOutCirc" | "easeInOutCirc"
  | "easeInBack" | "easeOutBack" | "easeInOutBack"
  | "easeInElastic" | "easeOutElastic" | "easeInOutElastic"
  | "easeInBounce" | "easeOutBounce" | "easeInOutBounce"
  | "steps" | "spring"
  | "smoothstep" | "easeOutSqrt" | "easeOutCbrt" | "pulse" | "blink"
  | "wobble" | "easeOutWindup" | "easeInSpringy";

export type EasingFn = (t: number, params?: Record<string, number>) => number;

const clamp = (t: number) => Math.min(1, Math.max(0, t));

function steps(t: number, count = 5) {
  return Math.floor(clamp(t) * count) / Math.max(1, count);
}

function spring(t: number, params: Record<string, number> = {}) {
  const stiffness = params.stiffness ?? 220;
  const damping = params.damping ?? 22;
  const mass = params.mass ?? 1;
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const omega0 = Math.sqrt(stiffness / mass);
  const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
  const A = 1;
  const B = (zeta * omega0 - 0) / omegaD;
  const x = (A * Math.cos(omegaD * t) + B * Math.sin(omegaD * t)) * Math.exp(-zeta * omega0 * t);
  return 1 - x;
}

export const EASINGS: Record<EasingName, EasingFn> = {
  linear: (t) => t,
  easeInSine: (t) => 1 - Math.cos((clamp(t) * Math.PI) / 2),
  easeOutSine: (t) => Math.sin((clamp(t) * Math.PI) / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * clamp(t)) - 1) / 2,
  easeInQuad: (t) => clamp(t) * clamp(t),
  easeOutQuad: (t) => 1 - (1 - clamp(t)) * (1 - clamp(t)),
  easeInOutQuad: (t) => (clamp(t) < 0.5 ? 2 * clamp(t) * clamp(t) : 1 - Math.pow(-2 * clamp(t) + 2, 2) / 2),
  easeInCubic: (t) => clamp(t) * clamp(t) * clamp(t),
  easeOutCubic: (t) => 1 - Math.pow(1 - clamp(t), 3),
  easeInOutCubic: (t) => (clamp(t) < 0.5 ? 4 * clamp(t) ** 3 : 1 - Math.pow(-2 * clamp(t) + 2, 3) / 2),
  easeInQuart: (t) => clamp(t) ** 4,
  easeOutQuart: (t) => 1 - Math.pow(1 - clamp(t), 4),
  easeInOutQuart: (t) => (clamp(t) < 0.5 ? 8 * clamp(t) ** 4 : 1 - Math.pow(-2 * clamp(t) + 2, 4) / 2),
  easeInQuint: (t) => clamp(t) ** 5,
  easeOutQuint: (t) => 1 - Math.pow(1 - clamp(t), 5),
  easeInOutQuint: (t) => (clamp(t) < 0.5 ? 16 * clamp(t) ** 5 : 1 - Math.pow(-2 * clamp(t) + 2, 5) / 2),
  easeInExpo: (t) => (clamp(t) === 0 ? 0 : Math.pow(2, 10 * clamp(t) - 10)),
  easeOutExpo: (t) => (clamp(t) === 1 ? 1 : 1 - Math.pow(2, -10 * clamp(t))),
  easeInOutExpo: (t) =>
    clamp(t) === 0 ? 0 : clamp(t) === 1 ? 1 : clamp(t) < 0.5 ? Math.pow(2, 20 * clamp(t) - 10) / 2 : (2 - Math.pow(2, -20 * clamp(t) + 10)) / 2,
  easeInCirc: (t) => 1 - Math.sqrt(1 - Math.pow(clamp(t), 2)),
  easeOutCirc: (t) => Math.sqrt(1 - Math.pow(clamp(t) - 1, 2)),
  easeInOutCirc: (t) =>
    clamp(t) < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * clamp(t), 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * clamp(t) + 2, 2)) + 1) / 2,
  easeInBack: (t, p) => {
    const c1 = p?.overshoot ?? 1.70158;
    const c3 = c1 + 1;
    const x = clamp(t);
    return c3 * x * x * x - c1 * x * x;
  },
  easeOutBack: (t, p) => {
    const c1 = p?.overshoot ?? 1.70158;
    const c3 = c1 + 1;
    const x = clamp(t) - 1;
    return 1 + c3 * x * x * x + c1 * x * x;
  },
  easeInOutBack: (t, p) => {
    const c1 = p?.overshoot ?? 1.70158;
    const c2 = c1 * 1.525;
    const x = clamp(t);
    return x < 0.5 ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  },
  easeInElastic: (t, _p) => {
    const c4 = (2 * Math.PI) / 3;
    const x = clamp(t);
    return x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  },
  easeOutElastic: (t, _p) => {
    const c4 = (2 * Math.PI) / 3;
    const x = clamp(t);
    return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  },
  easeInOutElastic: (t, _p) => {
    const c5 = (2 * Math.PI) / 4.5;
    const x = clamp(t);
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5
      ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
  },
  easeInBounce: (t, _p) => 1 - EASINGS.easeOutBounce(1 - clamp(t)),
  easeOutBounce: (t) => {
    let x = clamp(t);
    const n1 = 7.5625;
    const d1 = 2.75;
    if (x < 1 / d1) return n1 * x * x;
    if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
    if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  },
  easeInOutBounce: (t) => (clamp(t) < 0.5 ? (1 - EASINGS.easeOutBounce(1 - 2 * clamp(t))) / 2 : (1 + EASINGS.easeOutBounce(2 * clamp(t) - 1)) / 2),
  steps: (t, p) => steps(t, p?.count ?? 5),
  spring: (t, p) => spring(clamp(t), p ?? {}),
  smoothstep: (t) => {
    const x = clamp(t);
    return x * x * (3 - 2 * x);
  },
  easeOutSqrt: (t) => Math.pow(clamp(t), 0.5),
  easeOutCbrt: (t) => Math.pow(clamp(t), 1 / 3),
  pulse: (t) => (clamp(t) < 0.5 ? 2 * clamp(t) : 1),
  blink: (t, p) => steps(t, p?.count ?? 2),
  wobble: (t) => {
    const x = clamp(t);
    return x + 0.06 * Math.sin(x * 6 * Math.PI);
  },
  easeOutWindup: (t) => Math.pow(clamp(t), 0.4),
  easeInSpringy: (t, p) => {
    const c1 = p?.overshoot ?? 2.5;
    const c3 = c1 + 1;
    const x = clamp(t);
    return c3 * x * x * x - c1 * x * x;
  }
};

export function getEasing(name: EasingName): EasingFn {
  return EASINGS[name] ?? EASINGS.linear;
}
