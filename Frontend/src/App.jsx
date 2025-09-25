
import Disasters from "./components/Disasters"
import Home from "./components/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Resource from "./components/Resource"
import About from "./components/About"
import VolunteerAssignPage from "./components/VolunteerAssignPage"
import Donate from "./components/Donate"
import Alert from "./components/alert"
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
  },
  {
    path: 'donate',
    element:<Donate/>
  },
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/alerts',
    element: <Alert/>
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