import { runFunctionWithInput } from "./input-fetcher"
import { getCalibration, getCalibrationWithWords } from "./day01/day01"
import * as dotenv from "dotenv"

dotenv.config()

const run = async () => {
  console.log(await runFunctionWithInput("1", getCalibration))
  console.log(await runFunctionWithInput("1", getCalibrationWithWords))
}

run()
