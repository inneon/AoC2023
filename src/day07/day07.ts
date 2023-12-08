import { AoCFunction } from "../helpers/aocFunction"
import { toLines } from "../helpers/inputParsing"

const getTotalWinningsWithStrategy =
  (useJokers: boolean) => (input: string) => {
    return toLines(input)
      .map((line) => {
        const [hand, bid] = line.split(" ")

        return { score: scoreHand(hand, useJokers), bid: Number(bid), hand }
      })
      .sort((hand1, hand2) => hand1.score - hand2.score)
      .reduce((prev, curr, i) => {
        return prev + (i + 1) * curr.bid
      }, 0)
  }

export const getTotalWinnings: AoCFunction<number> =
  getTotalWinningsWithStrategy(false)

export const getTotalWinningsWithJokers: AoCFunction<number> =
  getTotalWinningsWithStrategy(true)

const scoreHand = (hand: string, useJokers: boolean) => {
  const cardToValueMapping = useJokers ? cardToValueWithJokers : cardToValue
  return hand
    .split("")
    .reduce(
      (accum, card) => accum * 100 + cardToValueMapping[card],
      scoreHandType(hand, useJokers),
    )
}

const cardToValue: { [card: string]: number } = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
}

const cardToValueWithJokers: { [card: string]: number } = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  J: 1,
  Q: 12,
  K: 13,
  A: 14,
}

enum HandType {
  fiveOfAKind = 6,
  fourOfAKind = 5,
  fullHouse = 4,
  threeOfAKind = 3,
  twoPair = 2,
  pair = 1,
  highCard = 0,
}

const scoreHandType = (hand: string, useJokers: boolean) => {
  const histogram = hand
    .split("")
    .reduce<{ [key: string]: number }>((prev, curr) => {
      if (!prev[curr]) {
        prev[curr] = 1
      } else {
        prev[curr]++
      }
      return prev
    }, {})

  const { group1, group2 } = getLargestGroups(histogram, useJokers)

  if (group1 === 5) {
    return HandType.fiveOfAKind
  }
  if (group1 === 4) {
    return HandType.fourOfAKind
  }
  if (group1 === 3 && group2 === 2) {
    return HandType.fullHouse
  }
  if (group1 === 3) {
    return HandType.threeOfAKind
  }
  if (group1 === 2 && group2 === 2) {
    return HandType.twoPair
  }
  if (group1 === 2) {
    return HandType.pair
  }
  return HandType.highCard
}

const getLargestGroups = (
  histogram: { [key: string]: number },
  useJokers: boolean,
) => {
  const jokerBonus = useJokers ? histogram["J"] ?? 0 : 0
  histogram["J"] = useJokers ? 0 : histogram["J"] ?? 0
  const [group1, group2] = Object.values(histogram).sort().reverse()
  return { group1: group1 + jokerBonus, group2 }
}
