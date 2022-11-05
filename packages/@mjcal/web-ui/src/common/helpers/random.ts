export const randomInteger = (from: number, to: number): number => {
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

export const pickOneRandomly = <X>(xs: readonly X[]): X => pickRandom(xs, 1)[0]!;

export const pickRandom = <X>(xs: readonly X[], n: number): X[] => {
  return shuffle(xs).slice(0, n);
};

export const shuffle = <X>([...xs]: readonly X[]): X[] => {
  for (let i = 0; i < xs.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = xs[i]!;
    xs[i] = xs[j]!;
    xs[j] = temp;
  }

  return xs;
};
