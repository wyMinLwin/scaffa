import DefaultLayout from '@/layouts/DefaultLayout'
import HomeView from '@/modules/home/HomeView'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "",
                element: <HomeView />,
            }
        ]
    }
])
const Wrapper = () => {
  return (
    <>
        <RouterProvider router={router}>

        </RouterProvider>
    </>
  )
}

export default Wrapper