import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/login'
import SignIn from './pages/signin'
import GetStarted from './pages/GetStarted'

function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Routes>     
        
    </>
  )

}



export default App