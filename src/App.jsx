import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import SignIn from './pages/sign-in';
import UserIn from './pages/user-in'
import Page404 from './components/404'
import './App.css'

function App() {
  return (
    <>
     <Router>
        <Routes>
          <Route path="/home/" element={<Home />} />
          <Route path="/home/sign-in" element={<SignIn />} />
          <Route path="/user/" element={<UserIn />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
