// generate await function for local storage
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const get = async (key: string): Promise<any | null> => {
  wait(1000)
  return JSON.parse(localStorage.getItem(key) || 'null')
}

export const set = async (key: string, value: unknown): Promise<void> => {
  wait(1000)
  localStorage.setItem(key, JSON.stringify(value))
}

export const remove = async (key: string): Promise<void> => {
  wait(1000)
  localStorage.removeItem(key)
}