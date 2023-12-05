import { runFunctionWithInput } from "./input-fetcher"
import * as dotenv from "dotenv"
import { getCalibration, getCalibrationWithWords } from "./day01/day01"
import { getPossibleGames, getPowersForGames } from "./day02/day02"
import { sumGearRatios, sumPartNumbers } from "./day03/day03"
import {
  getScratchCardTotal,
  getScratchCardTotalWithCorrectRules,
} from "./day04/day04"
import { findClosestLocation } from "./day05/day05"

dotenv.config()

const run = async () => {
  console.log("day 01")
  console.log(await runFunctionWithInput("1", getCalibration))
  console.log(await runFunctionWithInput("1", getCalibrationWithWords))
  console.log("day 02")
  console.log(await runFunctionWithInput("2", getPossibleGames))
  console.log(await runFunctionWithInput("2", getPowersForGames))
  console.log("day 03")
  console.log(await runFunctionWithInput("3", sumPartNumbers))
  console.log(await runFunctionWithInput("3", sumGearRatios))
  console.log("day 04")
  console.log(await runFunctionWithInput("4", getScratchCardTotal))
  console.log(
    await runFunctionWithInput("4", getScratchCardTotalWithCorrectRules),
  )
  console.log("day 05")
  console.log(await runFunctionWithInput("5", findClosestLocation))
}

run()
