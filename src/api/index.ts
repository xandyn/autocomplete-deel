import { mockData } from './mockData'

// Simulate a server delay
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

// Simulate a server request with a random delay
export const fetchData = async (query: string) => {
  await sleep(Math.random() * 1000)
  return mockData.filter((item) => item.label.toLowerCase().startsWith(query.toLowerCase()))
}
