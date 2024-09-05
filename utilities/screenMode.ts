import { useState } from "react"
import { Appearance } from "react-native"

const useScreenMode = () => {
  // const [mode, setMode] = useState<string>(Appearance.getColorScheme() ?? 'light')
  const [mode, setMode] = useState<string>('dark')

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }

  return {
    mode,
    toggleMode,
  }

}

export default useScreenMode
