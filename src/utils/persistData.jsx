// Автоматическое сохранение данных каждые 5 секунд
export const setupAutoSave = (key, data, onSave) => {
  let timeoutId
  
  const save = () => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
      if (onSave) onSave()
    } catch (error) {
      console.error('Auto-save failed:', error)
    }
  }
  
  const debouncedSave = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(save, 5000)
  }
  
  return { save: debouncedSave, cleanup: () => clearTimeout(timeoutId) }
}

// Восстановление данных после перезагрузки
export const recoverData = (key, defaultData) => {
  try {
    const saved = localStorage.getItem(key)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error('Recovery failed:', error)
  }
  return defaultData
}