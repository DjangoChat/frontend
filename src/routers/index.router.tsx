import { createBrowserRouter } from "react-router"
import { ROUTES_KEYS } from "../constants"
import { LandingPage } from "../features/public/screens"

const router = createBrowserRouter([
  {
    path: ROUTES_KEYS.ROOT,
    element: <LandingPage />,
    index: true,
  },
])

export default router
