import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import About from './Pages/About'
import Blogs from './Pages/Blogs'
import Page404 from './Pages/Page404'
import Signup from './Pages/Singup'
import Login from './Pages/Login'


function App() {

  return (
    <>
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path='*' element={<Page404 />} />

          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
