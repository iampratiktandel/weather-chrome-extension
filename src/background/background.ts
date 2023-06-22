import { setStoredCities, setStoredOptions } from "../utils/storage"

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({
    hasAutoOverlay: false,
    homeCity: '',
    tempScale: 'metric'
  })
})
