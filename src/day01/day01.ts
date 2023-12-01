import { AoCFunction } from "../helpers/aocFunction"
import { toLines } from "../helpers/inputParsing"

const getCalibrationForTokenSet = (tokenSet: TokenSet) => (input: string) => {
  const lines = toLines(input)
  return lines.reduce<number>(
    (total, line) => total + calibrationForLine(line, tokenSet),
    0,
  )
}

const calibrationForLine = (line: string, tokenSet: TokenSet): number => {
  const nums: number[] = []
  for (let i = 0; i < line.length; i++) {
    Object.entries(tokenSet).forEach(([key, value]) => {
      if (line.substring(i).startsWith(key)) {
        nums.push(value)
      }
    })
  }
  const first = nums[0]
  const last = nums[nums.length - 1]
  return first * 10 + last
}

type TokenSet = { [token: string]: number }

const numeralTokens: TokenSet = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "0": 0,
}

const wordTokens: TokenSet = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

export const getCalibration: AoCFunction<number> =
  getCalibrationForTokenSet(numeralTokens)

export const getCalibrationWithWords: AoCFunction<number> =
  getCalibrationForTokenSet({ ...numeralTokens, ...wordTokens })
