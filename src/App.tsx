import { Outlet } from 'react-router'
import './App.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <div className='max-w-7xl mx-auto w-full'>
        <Header />
      </div>

      <main className='flex-1 w-full'>
        <div className='max-w-7xl mx-auto sm:w-11/12 sm:p-4'>
          <Outlet />
        </div>
      </main>

      <div className='w-full'>
        <Footer />
      </div>
    </div>
  )
}

export default App
