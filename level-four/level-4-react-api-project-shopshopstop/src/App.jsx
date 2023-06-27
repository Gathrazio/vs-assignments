import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react'
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

  const [mensClothingItems, setMensClothingItems] = useState([]);
  const [womensClothingItems, setWomensClothingItems] = useState([]);
  const [jewelryItems, setJewelryItems] = useState([]);
  const [electronicsItems, setElectronicsItems] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/category/men's%20clothing")
    .then(res => setMensClothingItems(res.data))
    axios.get("https://fakestoreapi.com/products/category/women's%20clothing")
    .then(res => setWomensClothingItems(res.data))
    axios.get("https://fakestoreapi.com/products/category/jewelery")
    .then(res => setJewelryItems(res.data))
    axios.get("https://fakestoreapi.com/products/category/electronics")
    .then(res => setElectronicsItems(res.data))
  }, [])

  function handleNavClick () {
    window.scroll(0, 0);
  }

  const data = [
    mensClothingItems,
    jewelryItems,
    electronicsItems,
    womensClothingItems
  ].flat();


  return (
    <div className="app-wrapper">
      <Router>
        <div className="router-wrapper">
          <Navbar handleClick={handleNavClick}/> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route path="/products" element={<Products 
              handleClick={handleNavClick}/>}
              />
            
            <Route path="products/mensclothing" element={<MensClothing 
              handleClick={handleNavClick}
              items={mensClothingItems}/>}
              />

            <Route path="products/womensclothing" element={<WomensClothing 
              handleClick={handleNavClick}
              items={womensClothingItems}/>}
              />

            <Route path="products/jewelry" element={<Jewelry 
              handleClick={handleNavClick}
              items={jewelryItems}/>}
              />

            <Route path="products/electronics" element={<Electronics 
              handleClick={handleNavClick}
              items={electronicsItems}/>} 
              />

            <Route path="products/mensclothing/:productId" 
              element={<ProductDetails data={data} handleClick={handleNavClick}/>}
              />

            <Route path="products/womensclothing/:productId" 
              element={<ProductDetails data={data} handleClick={handleNavClick}/>}
              />

            <Route path="products/jewelry/:productId" 
              element={<ProductDetails data={data} handleClick={handleNavClick}/>}
              />

            <Route path="products/electronics/:productId" 
              element={<ProductDetails data={data} handleClick={handleNavClick}/>}
              />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  )
}