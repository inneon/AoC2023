import { getTotalWinnings, getTotalWinningsWithJokers } from "./day07"

describe("day 07", () => {
  it("should get the total winnings for the example input", () => {
    const example = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

    expect(getTotalWinnings(example)).toBe(6440)
  })

  it("should get the total winnings for the example input with jokers", () => {
    const example = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

    expect(getTotalWinningsWithJokers(example)).toBe(5905)
  })
})
