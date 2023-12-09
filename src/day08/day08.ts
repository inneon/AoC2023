import { AoCFunction } from "../helpers/aocFunction"
import { toLines } from "../helpers/inputParsing"
import { lowestCommonMultiple } from "../helpers/lowestCommonFactor"
import { Queue } from "../helpers/queue"

interface Network {
  [fromNode: string]: {
    L: string
    R: string
  }
}

type InstructionQueue = Queue<"L" | "R">

export const getStepsForDirections: AoCFunction<number> = (input: string) => {
  const [directions, _, ...nodes] = toLines(input)

  const instructions = new Queue<"L" | "R">(
    directions.split("") as ("L" | "R")[],
  )
  const network = parseNodes(nodes)
  return getStepsForDirectionsFromTo("AAA", "ZZZ", instructions, network)
}

export const getMultiStepsForDirections: AoCFunction<number> = (
  input: string,
) => {
  const [directions, _, ...nodes] = toLines(input)

  const instructions = new Queue<"L" | "R">(
    directions.split("") as ("L" | "R")[],
  )
  const network = parseNodes(nodes)

  const journies = Object.keys(network)
    .filter((node) => node.endsWith("A"))
    .map((from) => ({
      from,
      to: from.slice(0, 2) + "Z",
    }))

  return lowestCommonMultiple(
    ...journies.map(({ from, to }) => {
      const res = getStepsForDirectionsFromTo(from, to, instructions, network)
      console.log(`got from ${from} to ${to} in ${res} steps`)
      return res
    }),
  )
}

const getStepsForDirectionsFromTo = (
  from: string,
  to: string,
  instructions: InstructionQueue,
  network: Network,
) => {
  let current = from
  let steps = 0

  while (true) {
    if (current === to) {
      return steps
    }

    steps++
    const direction = instructions.dequeue()
    instructions.enqueue(direction)

    current = network[current][direction]
  }
}

const parseNodes = (nodes: string[]) =>
  nodes.reduce<Network>((network, currentLine) => {
    const match = /([A-Z0-9]+) = \(([A-Z0-9]+), ([A-Z0-9]+)\)/.exec(currentLine)
    if (!match) throw Error(`invalid line: ${currentLine}`)

    return { ...network, [match[1]]: { L: match[2], R: match[3] } }
  }, {})
