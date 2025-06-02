import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <main className='font-display p-2'>
        <Outlet />
    </main>
  )
}

export default DefaultLayout