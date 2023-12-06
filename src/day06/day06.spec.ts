import { getRealWinValue, getWinValues, waysToWin } from "./day06"

describe("day 06", () => {
  it("gets the number of ways to beat the race", () => {
    expect(waysToWin(7, 9)).toBe(4)
  })

  it("gets the win values for the example", () => {
    const example = `Time:      7  15   30
Distance:  9  40  200`

    expect(getWinValues(example)).toBe(288)
  })

  it("gets the real win value for the example", () => {
    const example = `Time:      7  15   30
Distance:  9  40  200`

    expect(getRealWinValue(example)).toBe(71503)
  })
})
