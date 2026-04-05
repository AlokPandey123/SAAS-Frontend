import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'
import Header from '../components/common/Header'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#fffdf7] text-zinc-900">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
