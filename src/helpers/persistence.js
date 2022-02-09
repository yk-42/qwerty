export const persistIntoLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}
