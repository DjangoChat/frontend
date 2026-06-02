import { CssBaseline } from "@mui/joy"
import { CssVarsProvider } from "@mui/joy/styles"
import type { ReactNode } from "react"

export function StyleContainer({ children }: { children: ReactNode }) {
  return (
    <CssVarsProvider defaultMode="light" disableTransitionOnChange>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  )
}
