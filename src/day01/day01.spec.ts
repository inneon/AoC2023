import { getCalibration, getCalibrationWithWords } from "./day01"

describe("day 1", () => {
  it("gets the calibration in the example", () => {
    const example = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`
    expect(getCalibration(example)).toBe(142)
  })

  it("gets the calibration in the example with words", () => {
    const example = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`
    expect(getCalibrationWithWords(example)).toBe(281)
  })
})
