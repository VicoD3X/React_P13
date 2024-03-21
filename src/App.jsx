import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import SignIn from './pages/sign-in';
import UserIn from './pages/user-in'
import './App.css'

function App() {
  return (
    <>
     <Router>
        <Routes>
          <Route path="/home/" element={<Home />} />
          <Route path="/home/sign-in" element={<SignIn />} />
          <Route path="/user/" element={<UserIn />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
