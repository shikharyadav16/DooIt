
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./features/auth/Login"
import Signup from "./features/auth/Signup"
import AuthChecker from './utils/checkAuth';

function App() {


  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/dashboard'
          element={
            <AuthChecker>
              <Home />
            </AuthChecker>
          }
        />

        {/* Catch all */}
        <Route path='*' element={<Navigate to='/dashboard' />} />
      </Routes>
    </>
  )
}

export default App
