import CssBaseline from "@mui/joy/CssBaseline"
import { CssVarsProvider } from "@mui/joy/styles"
import type { ReactNode } from "react"

export function StyleContainer({ children }: { children: ReactNode }) {
  return (
    <CssVarsProvider>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  )
}
