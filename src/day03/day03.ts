import { AoCFunction } from "../helpers/aocFunction"
import { Coord } from "../helpers/coord"
import { splitToGrid } from "../helpers/inputParsing"

interface NumberDesription {
  value: number
  from: Coord
  to: Coord
}

interface SymbolDescription {
  value: string
  at: Coord
}

interface Schematic {
  numbers: NumberDesription[]
  symbols: SymbolDescription[]
}

export const sumPartNumbers: AoCFunction<number> = (input: string) => {
  const { numbers, symbols } = parseSchematic(input)
  const partNumbers = numbers.filter((number) =>
    symbols.some((s) => adjacentTo(number, s)),
  )
  return partNumbers.reduce<number>(
    (accumulator, { value }) => accumulator + value,
    0,
  )
}

export const sumGearRatios: AoCFunction<number> = (input: string) => {
  const { numbers, symbols } = parseSchematic(input)
  const cogs = symbols.filter(({ value }) => value === "*")

  return cogs
    .map((cog) => {
      const adjacentNumbers = numbers.filter((number) =>
        adjacentTo(number, cog),
      )
      return {
        cog,
        adjacentNumbers,
      }
    })
    .filter(({ adjacentNumbers }) => adjacentNumbers.length === 2)
    .map(({ adjacentNumbers }) => {
      const [num1, num2] = adjacentNumbers
      return num1.value * num2.value
    })
    .reduce((accumulator, current) => accumulator + current, 0)
}

const parseSchematic = (input: string): Schematic => {
  const grid = splitToGrid(input)

  const symbols = grid.reduce<SymbolDescription[]>((accum, line, y) => {
    return [
      ...accum,
      ...line.reduce<SymbolDescription[]>((accumulator, current, x) => {
        if (current !== "." && Number.isNaN(Number(current))) {
          return [...accumulator, { value: current, at: { x, y } }]
        }
        return accumulator
      }, []),
    ]
  }, [])

  const numbers = grid.reduce<NumberDesription[]>((accum, line, y) => {
    const { numberDescriptor, partialNumber } = line.reduce<{
      numberDescriptor: NumberDesription[]
      partialNumber?: { value: number; from: number }
    }>(
      ({ numberDescriptor, partialNumber }, current, x) => {
        if (!Number.isNaN(Number(current))) {
          if (partialNumber) {
            partialNumber.value = partialNumber.value * 10 + Number(current)
            return { numberDescriptor, partialNumber }
          }
          return {
            numberDescriptor,
            partialNumber: { value: Number(current), from: x },
          }
        } else if (partialNumber) {
          return {
            numberDescriptor: [
              ...numberDescriptor,
              {
                value: partialNumber.value,
                from: { y, x: partialNumber.from },
                to: { y, x: x - 1 },
              },
            ],
          }
        }
        return { numberDescriptor, partialNumber }
      },
      { numberDescriptor: [] },
    )

    const maybeLastNumber = partialNumber
      ? [
          {
            value: partialNumber.value,
            from: {
              y,
              x: partialNumber.from,
            },
            to: { y, x: line.length - 1 },
          },
        ]
      : []
    return [...accum, ...numberDescriptor, ...maybeLastNumber]
  }, [])

  return {
    numbers,
    symbols,
  }
}

const adjacentTo = (
  number: NumberDesription,
  symbol: SymbolDescription,
): boolean => {
  if (
    number.from.y - 1 <= symbol.at.y &&
    symbol.at.y <= number.to.y + 1 &&
    number.from.x - 1 <= symbol.at.x &&
    symbol.at.x <= number.to.x + 1
  ) {
    return true
  }
  return false
}
