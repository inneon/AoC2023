export const toSplitLines = (input: string): string[][] =>
  input.split("\n").reduce<string[][]>(
    (prev, curr) => {
      if (curr === "") {
        return [[], ...prev]
      }
      const [bag, ...rest] = prev
      return [[...bag, curr], ...rest]
    },
    [[]],
  )

export const toLines = (input: string): string[] => input.split("\n")
