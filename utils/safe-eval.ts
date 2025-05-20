/**
 * Safe JSON parsing function, replacing eval
 * @param jsonString JSON string
 * @returns The parsed object
 */
export function safeJSONParse<T>(jsonString: string): T {
  try {
    return JSON.parse(jsonString) as T
  } catch (error) {
    console.error("JSON 解析错误:", error)
    throw new Error("无效的 JSON 字符串")
  }
}

/**
 * Safe function executor, replacing new Function() or eval
 * @param fn The function to execute
 * @param args Function arguments
 * @returns Function execution result
 */
export function safeExecute<T, A extends any[]>(fn: (...args: A) => T, ...args: A): T {
  return fn(...args)
}

/**
 * Safe timer, replacing string-based setTimeout
 * @param callback Callback function
 * @param delay Delay time (milliseconds)
 * @returns Timer ID
 */
export function safeSetTimeout(callback: () => void, delay: number): NodeJS.Timeout {
  return setTimeout(callback, delay)
}

/**
 * Safe timer, replacing string-based setInterval
 * @param callback Callback function
 * @param delay Delay time (milliseconds)
 * @returns Timer ID
 */
export function safeSetInterval(callback: () => void, delay: number): NodeJS.Timeout {
  return setInterval(callback, delay)
}
