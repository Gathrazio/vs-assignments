import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useState} from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Footer from './components/Footer'
import './App.css'

export default function App() {

  const [isClicked, setIsClicked] = useState([true, false, false])

  function handleClick (e) {
    const {value} = e.target;
    if (value === "home") {
      setIsClicked([true, false, false])
    } else if (value === "about") {
      setIsClicked([false, true, false])
    } else {
      setIsClicked([false, false, true])
    }
  }

  return (
    <div className="app-wrapper">
      <Router>
        <Navbar isClicked={isClicked} handleClick={handleClick}/> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}