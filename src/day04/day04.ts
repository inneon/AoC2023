import { AoCFunction } from "../helpers/aocFunction"
import { toLines } from "../helpers/inputParsing"

export const getScratchCardTotal: AoCFunction<number> = (input: string) => {
  return toLines(input).reduce((total, line) => total + getValueOf(line), 0)
}

const getValueOf = (line: string) => {
  const scratchCard = new ScratchCard(line)
  const correctNumbers = getMatchingNumbers(scratchCard)

  if (correctNumbers === 0) return 0
  return Math.pow(2, correctNumbers - 1)
}

const getMatchingNumbers = ({ winningNumbers, actualNumbers }: ScratchCard) =>
  actualNumbers.filter((n) => winningNumbers.indexOf(n) !== -1).length

export const getScratchCardTotalWithCorrectRules: AoCFunction<number> = (
  input: string,
) => {
  const cards = toLines(input).map((line) => ({
    card: new ScratchCard(line),
    quantity: 1,
  }))

  for (let current = 0; current < cards.length; current++) {
    const matching = getMatchingNumbers(cards[current].card)
    for (let i = current + 1; i < current + 1 + matching; i++) {
      cards[i].quantity += cards[current].quantity
    }
  }
  return cards.reduce((subtotal, { quantity }) => subtotal + quantity, 0)
}

class ScratchCard {
  readonly cardNumber: number
  readonly winningNumbers: number[]
  readonly actualNumbers: number[]

  constructor(line: string) {
    const matcher = /^Card +(\d)+: +([\d ]+)\| +([\d ]+)$/.exec(line)
    if (!matcher) throw Error("invalid input line: " + line)

    const [_all, cardNumber, winningNumberSection, actualNumberSection] =
      matcher
    this.cardNumber = Number(cardNumber)
    this.winningNumbers = this.parseSection(winningNumberSection)
    this.actualNumbers = this.parseSection(actualNumberSection)
  }

  private parseSection(section: string): number[] {
    return section
      .split(" ")
      .filter((token) => token != "")
      .map(Number)
  }
}
