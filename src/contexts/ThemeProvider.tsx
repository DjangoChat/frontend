import type { ReactNode } from "react"
import { createContext } from "react"
import { LOCAL_STORAGE_KEYS, type Theme } from "../types"
import { useLocalStorage } from "../hooks"

export type ThemeContextType = {
  theme: Theme
  toogleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<Theme>(
    LOCAL_STORAGE_KEYS.THEME,
    "light",
  )

  const toogleTheme = () => {
    setTheme(t => (t === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toogleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
