
import Disasters from "./components/Disasters"
import Home from "./components/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Resource from "./components/Resource"
import About from "./components/About"
import VolunteerAssignPage from "./components/VolunteerAssignPage"

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/disasters',
    element: <Disasters/>
  },
  {
    path: 'resources',
    element: <Resource/>
  },
  {
    path:'/about',
    element:<About/>
  },
  {
    path: 'Volunteers',
    element: <VolunteerAssignPage/>
  }

])

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App