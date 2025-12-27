import { Outlet } from 'react-router'
import './App.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import BottomNav from './Components/BottomNav/BottomNav'

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <div className='max-w-7xl mx-auto w-full'>
        <Header />
      </div>

      <main className='flex-1 w-full pb-16 sm:pb-0'>
        <div className='max-w-7xl mx-auto sm:w-11/12 sm:p-4'>
          <Outlet />
        </div>
      </main>

      <div className='w-full'>
        <Footer />
      </div>

      {/* Mobile bottom navigation (shows only on small screens) */}
      <BottomNav />
    </div>
  )
}

export default App
