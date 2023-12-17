// Se importa para poder tener navegación entre varias páginas. 
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
function App() {
  

  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path="/"  element={<Home />}/>
            <Route path="/login"  element={<Login />}/>
            <Route path="/register"  element={<Register/>}/>
            <Route path="/dashboard"  element={<Dashboard />}/>

          </Routes>

        </div>
      </Router>
    </>
  )
}

export default App
