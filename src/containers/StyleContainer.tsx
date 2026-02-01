import { ScopedCssBaseline } from "@mui/joy"
import { CssVarsProvider } from "@mui/joy/styles"
import type { ReactNode } from "react"
import { useContext, useState } from "react"
import { ThemeContext } from "../contexts/ThemeProvider"

export function StyleContainer({ children }: { children: ReactNode }) {
  const [root, setRoot] = useState<HTMLElement | null>(null)
  const themeContext = useContext(ThemeContext)

  return (
    <CssVarsProvider
      colorSchemeNode={root}
      defaultMode={themeContext?.theme ?? "light"}
    >
      <ScopedCssBaseline
        ref={element => {
          setRoot(element)
        }}
      >
        {children}
      </ScopedCssBaseline>
    </CssVarsProvider>
  )
}
