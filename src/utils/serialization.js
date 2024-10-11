
const saveKey = (key, value) => {
  const payload = {
    key,
    value,
    timestamp: Date.now()
  }
  localStorage.setItem(key, JSON.stringify(payload))
}

const getKey = (key) => {
  const storedItem = localStorage.getItem(key)
  if (!storedItem) {
    return null
  }
  try {
    const payload = JSON.parse(storedItem)
    return payload.value
  } catch (error) {
    console.error(`Error parsing stored item for key "${key}":`, error)
    return null
  }
}

export { saveKey, getKey }