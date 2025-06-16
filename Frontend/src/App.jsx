// import {ReactModal} from 'react-modal'
import './App.css'
import AddTaskForm from './components/addTaskForm'
import HomePage from './pages/HomePage'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import{ BrowserRouter , Routes, Route} from "react-router-dom"

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/Register" element={<Register />}></Route>
            <Route path='/home' element={<HomePage />}></Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
