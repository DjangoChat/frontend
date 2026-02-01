import { useColorScheme } from "@mui/joy/styles"

export function useTheme() {
  const { mode, setMode } = useColorScheme()

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light")
  }

  return {
    theme: mode,
    toggleTheme,
  }
}
