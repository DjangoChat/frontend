import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router"
import {
  ContextContainer,
  SnackbarContainer,
  StyleContainer,
} from "./containers"
import { store } from "./redux"
import router from "./routers"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <ContextContainer>
          <StyleContainer>
            <RouterProvider router={router} />
            <SnackbarContainer />
          </StyleContainer>
        </ContextContainer>
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
