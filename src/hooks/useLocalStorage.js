import React from 'react'

export function useLocalStorage(key) {
  const [localStorageValue, setLocalStorageValue] = React.useState('')
  React.useEffect(() => {
    window.addEventListener('storage', () => {
      const newValue = localStorage.getItem(key)
      setLocalStorageValue(newValue)
    })
    return () => {
      window.removeEventListener('storage')
    }
  }, [])
  const updateLocalStorageValue = (newValue) => {
    setLocalStorageValue(newValue)
    localStorage.setItem(key, newValue)
  }
  return { localStorageValue, updateLocalStorageValue }
}
