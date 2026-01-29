import { createBrowserRouter } from "react-router"
import { App } from "../App"
import { ROUTES } from "./path.router"

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <App />,
    index: true,
  },
])

export default router
