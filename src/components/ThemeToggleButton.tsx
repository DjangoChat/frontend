import { DarkMode, LightMode } from "@mui/icons-material"
import { IconButton } from "@mui/joy"
import { useTheme } from "../hooks"

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <IconButton
      variant="outlined"
      color="neutral"
      size="sm"
      onClick={toggleTheme}
      sx={{
        borderRadius: "sm",
        height: 36,
        width: 36,
      }}
    >
      {theme === "light" ? <DarkMode /> : <LightMode />}
    </IconButton>
  )
}
