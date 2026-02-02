import { DarkMode, LightMode } from "@mui/icons-material"
import { IconButton } from "@mui/joy"
import { useTheme } from "../hooks"

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <IconButton
      variant="outlined"
      color="neutral"
      onClick={toggleTheme}
      sx={{
        borderRadius: "sm",
      }}
    >
      {theme === "light" ? <DarkMode /> : <LightMode />}
    </IconButton>
  )
}
