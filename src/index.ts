import { runFunctionWithInput } from "./input-fetcher"
import { placeholder } from "./day01/day01"
import * as dotenv from "dotenv"

dotenv.config()

const run = async () => {
  console.log(await runFunctionWithInput("1", placeholder))
}

run()
