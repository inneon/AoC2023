import { runFunctionWithInput } from "./input-fetcher"
import { getCalibration, getCalibrationWithWords } from "./day01/day01"
import { getPossibleGames, getPowersForGames } from "./day02/day02"
import * as dotenv from "dotenv"
import { sumGearRatios, sumPartNumbers } from "./day03/day03"

dotenv.config()

const run = async () => {
  console.log(await runFunctionWithInput("1", getCalibration))
  console.log(await runFunctionWithInput("1", getCalibrationWithWords))
  console.log(await runFunctionWithInput("2", getPossibleGames))
  console.log(await runFunctionWithInput("2", getPowersForGames))
  console.log(await runFunctionWithInput("3", sumPartNumbers))
  console.log(await runFunctionWithInput("3", sumGearRatios))
}

run()
