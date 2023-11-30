// fail tests on console error
const error = console.error
console.error = (...data: any[]) => {
  error(...data)

  const message = data[0]
  throw message instanceof Error ? message : new Error(message)
}

// fail tests on console warn
const warn = console.warn
console.warn = (...data: any[]) => {
  warn(...data)

  const message = data[0]
  throw message instanceof Error ? message : new Error(message)
}
