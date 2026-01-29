import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { StyleContainer } from "./containers"
import router from "./routers/index.router"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <StyleContainer>
        <RouterProvider router={router} />
      </StyleContainer>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
