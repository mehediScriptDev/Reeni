import { Outlet } from 'react-router'
import './App.css'
import Header from './Components/Header/Header'

function App() {

  return (
    <>
      <div className='max-w-7xl mx-auto'>
        <Header/>
        <main className='w-11/12 mx-auto p-4'><Outlet /></main>
      </div>
    </>
  )
}

export default App
