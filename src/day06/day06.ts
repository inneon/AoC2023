import { AoCFunction } from "../helpers/aocFunction"
import { toLines } from "../helpers/inputParsing"
import { zip } from "../helpers/zip"

export const waysToWin = (time: number, distance: number) => {
  let result = 0
  for (let t = 1; t < time; t++) {
    if (t * (time - t) > distance) {
      result++
    }
  }
  return result
}

export const getWinValues: AoCFunction<number> = (input: string) => {
  const lines = toLines(input)
  const [times, distances] = lines.map((line) =>
    line
      .split(/ +/)
      .map((n) => Number(n))
      .filter((n) => !Number.isNaN(n)),
  )
  const pairs = zip(times, distances, (time, distance) => ({ time, distance }))
  return pairs
    .map(({ time, distance }) => waysToWin(time, distance))
    .reduce((accum, curr) => accum * curr, 1)
}

export const getRealWinValue: AoCFunction<number> = (input: string) => {
  const lines = toLines(input)
  const [time, distance] = lines
    .map((line) => removeSpaces(line).split(":")[1])
    .map((n) => Number(n))
  return waysToWin(time, distance)
}

const removeSpaces = (s: string) => {
  let previous = ""
  while (s !== previous) {
    previous = s
    s = s.replace(" ", "")
  }
  return s
}
