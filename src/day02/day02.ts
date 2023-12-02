import { AoCFunction } from "../helpers/aocFunction"
import { toLines } from "../helpers/inputParsing"

interface GameDescription {
  gameNumber: number
  samples: { red: number; green: number; blue: number }[]
}

export const getPossibleGames: AoCFunction<number> = (input: string) => {
  const games = toLines(input).map(parse)
  const possibleGames = games.filter(isPossible)
  return possibleGames.reduce(
    (subtotal, { gameNumber }) => subtotal + gameNumber,
    0,
  )
}

export const getPowersForGames: AoCFunction<number> = (input: string) => {
  const games = toLines(input).map(parse)
  const powers = games.map(powerForGame)
  return powers.reduce((subtotal, curr) => subtotal + curr)
}

const parse = (line: string): GameDescription => {
  const [gameDescription, rest] = line.split(":")
  const samples = rest.split(";")

  const gameMatch = /Game (\d+)/.exec(gameDescription)
  if (!gameMatch) throw Error("Invalid input line")

  return {
    gameNumber: Number(gameMatch[1]),
    samples: samples.map((sample) => {
      const redMatch = /(\d+) red/.exec(sample)
      const greenMatch = /(\d+) green/.exec(sample)
      const blueMatch = /(\d+) blue/.exec(sample)

      return {
        red: redMatch ? Number(redMatch[1]) : 0,
        blue: blueMatch ? Number(blueMatch[1]) : 0,
        green: greenMatch ? Number(greenMatch[1]) : 0,
      }
    }),
  }
}

const isPossible = ({ samples }: GameDescription): boolean => {
  return samples.every(({ red, green, blue }) => {
    return red <= 12 && green <= 13 && blue <= 14
  })
}

const powerForGame = ({ samples }: GameDescription): number => {
  const { red, green, blue } = samples.reduce((accum, curr) => ({
    red: accum.red > curr.red ? accum.red : curr.red,
    green: accum.green > curr.green ? accum.green : curr.green,
    blue: accum.blue > curr.blue ? accum.blue : curr.blue,
  }))

  return red * green * blue
}
