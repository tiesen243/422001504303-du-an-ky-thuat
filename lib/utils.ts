import Constants from 'expo-constants'

export const getBaseUrl = () => {
  let localhost: string | undefined

  if (typeof window !== 'undefined' && window.location) {
    localhost = window.location.hostname
  } else {
    const debuggerHost = Constants.expoConfig?.hostUri
    localhost = debuggerHost?.split(':')[0]
  }

  if (!localhost) return 'https://example.com'
  else return `http://${localhost}:3000`
}
