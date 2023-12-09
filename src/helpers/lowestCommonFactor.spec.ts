import { lowestCommonMultiple } from "./lowestCommonFactor"

describe("lowest common multiple", () => {
  it("should do LCMs of numbers with no common factors", () => {
    expect(lowestCommonMultiple(2, 3, 5)).toBe(30)
  })

  it("should do LCMs of numbers with common factors", () => {
    expect(lowestCommonMultiple(6, 9)).toBe(18)
  })
})
