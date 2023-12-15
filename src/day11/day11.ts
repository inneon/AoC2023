import { AoCFunction } from "../helpers/aocFunction"
import { splitToGrid } from "../helpers/inputParsing"

export const getEmptyRowsAndCols = (
  input: string,
): { rows: number[]; cols: number[] } => {
  const grid = splitToGrid(input)

  const rows = grid
    .map((row, i) => ({ row, i }))
    .filter(({ row }) => row.every((cell) => cell === "."))
    .map(({ i }) => i)

  const cols = grid[0]
    .map((_, i) => i)
    .filter((i) => grid.every((row) => row[i] === "."))

  return { rows, cols }
}

export const getDistances =
  (emptySpace: number): AoCFunction<number> =>
  (input: string) => {
    const grid = splitToGrid(input)
    const { rows, cols } = getEmptyRowsAndCols(input)

    const galaxies = grid.reduce<{ x: number; y: number }[]>(
      (accumulator, row, y) => {
        return [
          ...accumulator,
          ...row
            .map((cell, x) => ({ cell, x, y }))
            .filter(({ cell }) => cell === "#")
            .map(({ x, y }) => ({ x, y })),
        ]
      },
      [],
    )

    return (
      galaxies.reduce((total, { x, y }) => {
        return (
          total +
          galaxies.reduce((subtotal, other) => {
            const xDist =
              Math.abs(x - other.x) +
              cols.filter(
                (i) => Math.min(x, other.x) < i && i < Math.max(x, other.x),
              ).length *
                emptySpace
            const yDist =
              Math.abs(y - other.y) +
              rows.filter(
                (i) => Math.min(y, other.y) < i && i < Math.max(y, other.y),
              ).length *
                emptySpace
            // console.log(
            //   `distance from (${x}, ${y}) to (${other.x}, ${other.y}) is ${
            //     xDist + yDist
            //   } `,
            // )
            return subtotal + xDist + yDist
          }, 0)
        )
      }, 0) / 2
    )
  }

export const getSimpleDistance = getDistances(1)

export const getGalaticDistance = getDistances(999999)
