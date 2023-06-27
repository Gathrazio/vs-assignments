import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Products from './components/Products'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import MensClothing from './components/MensClothing'
import WomensClothing from './components/WomensClothing'
import Jewelry from './components/Jewelry'
import Electronics from './components/Electronics'
import ProductDetails from './components/ProductDetails'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

export default function App () {

  function handleNavClick () {
    window.scroll(0, 0);
  }

  console.log(axios)

  return (
    <div className="app-wrapper">
      <Router>
      <Navbar handleClick={handleNavClick}/> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/mensclothing" element={<MensClothing />} />
          <Route path="/womensclothing" element={<WomensClothing />} />
          <Route path="/jewelry" element={<Jewelry />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/productdetails:productId" element={<ProductDetails />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}