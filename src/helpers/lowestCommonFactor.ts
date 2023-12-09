export const lowestCommonMultiple = (...inputs: number[]): number => {
  const lcm = (a: number, b: number) =>
    (a / greatestCommonDenominator(a, b)) * b

  return inputs.reduce((prev, curr) => lcm(prev, curr), 1)
}

const greatestCommonDenominator = (a: number, b: number): number =>
  b === 0 ? a : greatestCommonDenominator(b, a % b)
