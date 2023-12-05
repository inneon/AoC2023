import { AoCFunction } from "../helpers/aocFunction"
import { toSplitLines } from "../helpers/inputParsing"

export const findClosestLocation: AoCFunction<number> = (input: string) => {
  const almanac = new Almanac(input)

  const mappings = [
    almanac.seedsToSoil,
    almanac.soilToFertilizer,
    almanac.fertilizerToWater,
    almanac.waterToLight,
    almanac.lightToTemperature,
    almanac.temperatureToHumidity,
    almanac.humidityToLocation,
  ]

  const locations = mappings.reduce<number[]>(
    (seeds, mapping) => seeds.map((seed) => performMapping(seed, mapping)),
    almanac.seeds,
  )

  return Math.min(...locations)
}

interface Mapping {
  source: number
  dest: number
  range: number
}

class Almanac {
  readonly seeds: number[]
  readonly seedsToSoil: Mapping[]
  readonly soilToFertilizer: Mapping[]
  readonly fertilizerToWater: Mapping[]
  readonly waterToLight: Mapping[]
  readonly lightToTemperature: Mapping[]
  readonly temperatureToHumidity: Mapping[]
  readonly humidityToLocation: Mapping[]

  constructor(input: string) {
    const [
      [seeds],
      seedsToSoil,
      soilToFertilizer,
      fertilizerToWater,
      waterToLight,
      lightToTemperature,
      temperatureToHumidity,
      humidityToLocation,
    ] = toSplitLines(input)

    this.seeds = seeds
      .split(" ")
      .map(Number)
      .filter((n) => !Number.isNaN(n))
    this.seedsToSoil = this.toMapping(seedsToSoil)
    this.soilToFertilizer = this.toMapping(soilToFertilizer)
    this.fertilizerToWater = this.toMapping(fertilizerToWater)
    this.waterToLight = this.toMapping(waterToLight)
    this.lightToTemperature = this.toMapping(lightToTemperature)
    this.temperatureToHumidity = this.toMapping(temperatureToHumidity)
    this.humidityToLocation = this.toMapping(humidityToLocation)
  }

  private toMapping(section: string[]) {
    const mapping = /(\d+) (\d+) (\d+)/
    return section
      .map((line) => mapping.exec(line))
      .filter((match): match is RegExpExecArray => !!match)
      .map(([_all, source, dest, range]) => ({
        source: Number(source),
        dest: Number(dest),
        range: Number(range),
      }))
  }
}

export const performMapping = (from: number, mapping: Mapping[]) => {
  const relevantMapping = mapping.find(
    (m) => m.dest <= from && from < m.dest + m.range,
  )
  if (!relevantMapping) {
    return from
  }

  const offset = from - relevantMapping.dest

  return relevantMapping.source + offset
}

export const performMappingForRange = (
  from: number,
  length: number,
  mapping: Mapping[],
  depth: number = 0,
): { from: number; length: number }[] => {
  if (length === 0) {
    return []
  }
  if (depth > 5) return []

  const relevantMappings = mapping.filter(
    (m) => from < m.dest + m.range && from + length >= m.dest,
  )
  if (relevantMappings.length === 0) {
    return [{ from, length }]
  }

  const firstMapping = relevantMappings.sort((m1, m2) => m1.dest - m2.dest)[0]

  const offset = from - firstMapping.dest
  const nextFrom = firstMapping.source + offset
  const run = nextFrom - firstMapping.dest - firstMapping.range
  const nextLength = Math.max(0, length - run)
  console.log({ from, length, firstMapping, offset, nextFrom, run, nextLength })
  return [
    {
      from: nextFrom,
      length: run,
    },
    ...performMappingForRange(from + run, nextLength, mapping, depth + 1),
  ]
}
