import { Outlet } from 'react-router-dom'
import { Navbar } from '../components'
import { Footer } from '../container'

const Layout = () => {

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
export default Layout