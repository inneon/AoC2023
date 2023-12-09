import { getMultiStepsForDirections, getStepsForDirections } from "./day08"

describe("day 08", () => {
  it("should find the number of steps for the example", () => {
    const example = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`

    expect(getStepsForDirections(example)).toBe(2)
  })

  it("should find the number of steps for the second example", () => {
    const example = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`

    expect(getStepsForDirections(example)).toBe(6)
  })
})
