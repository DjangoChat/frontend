import { Button } from "@mui/joy"
import { useTheme } from "../hooks"

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button variant="outlined" onClick={toggleTheme}>
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </Button>
  )
}
