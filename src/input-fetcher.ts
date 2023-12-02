import axios from "axios"
import { AoCFunction } from "./helpers/aocFunction"
import fs from "fs"

const getInput = async (day: string, cookie: string): Promise<string> => {
  const inputDirectory = "./inputs"
  const localFileName = `${inputDirectory}/day${day}.txt`
  if (!fs.existsSync(inputDirectory)) {
    fs.mkdirSync(inputDirectory)
  }
  if (fs.existsSync(localFileName)) {
    return fs.readFileSync(localFileName, "utf-8")
  }

  const response = await axios.get(
    `https://adventofcode.com/2023/day/${day}/input`,
    {
      headers: {
        cookie,
      },
    },
  )

  const data: string = response.data
  fs.writeFileSync(localFileName, data.trim(), "utf-8")
  return data.trim()
}

export const runFunctionWithInput = async <T>(
  day: string,
  f: AoCFunction<T>,
): Promise<T> => {
  const cookie = process.env.COOKIE
  if (!cookie) {
    throw Error("The COOKIE has not been set in the process env.")
  }

  const input = await getInput(day, cookie)

  return f(input)
}
