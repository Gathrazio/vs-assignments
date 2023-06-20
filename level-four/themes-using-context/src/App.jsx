import './App.css'
import Navbar from './components/Navbar'
import MainBlob from './components/MainBlob'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <MainBlob />
      <Footer />
    </div>
  )
}