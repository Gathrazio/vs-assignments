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
import './App.css'

export default function App () {

  // fake store api related state and functions

  const [mensClothingItems, setMensClothingItems] = useState([]);
  const [womensClothingItems, setWomensClothingItems] = useState([]);
  const [jewelryItems, setJewelryItems] = useState([]);
  const [electronicsItems, setElectronicsItems] = useState([]);

  const [cartInitialized, setCartInitialized] = useState(false);
  const [currentUsernameText, setCurrentUsernameText] = useState("");
  const [utilizedUsername, setUtilizedUsername] = useState("z");
  const [costArray, setCostArray] = useState([]);
  const [cartToggle, setCartToggle] = useState([])

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

  // cart related state

  const [cart, setCart] = useState([])
  //  {
  //    name: "item name",
  //    id: 1-20,
  //    quantity: n
  //  },
  //  ...

  useEffect (() => {
    load()
  }, [utilizedUsername])

  function handleCartAdd (e) {
    e.preventDefault()
    const {name} = e.target;
    axios.post(`https://api.vschool.io/${utilizedUsername}/thing`, { // bootstrapping the shit out of this API
            title: data[Number(name) - 1].title, // item name
            description: name, // item id
            imgUrl: ghostCart[Number(name) - 1].toString() // quantity
          }).then(() => load())
    setCartToggle(prev => [...prev, false])
  }

  console.log("cart toggle: ", cartToggle)

  let ghostCartStart = [];

  useEffect(() => {
    for (let i = 0; i < 20; i++) {
      ghostCartStart.push(1)
    }
  }, [])

  const [ghostCart, setGhostCart] = useState(ghostCartStart)

  function updateGhostCart (e) {
    const {value, name} = e.target;
    setGhostCart(prev => prev.toSpliced(Number(name.slice(1)) - 1, 1, Number(value)))
  }

  function updateThing (e) {
      const {name, value} = e.target;
      if (name.length > 11) {
          setFluidThings(prev => ({
              ...prev,
              [name]: value
          }))
      }
  }

  function load () {
      axios.get(`https://api.vschool.io/${utilizedUsername}/thing`)
          .then(res => {
            setCart(res.data)
            setCartToggle(Array.from({length: res.data.length}, (_, index) => false))
            return res.data})
  }

  useEffect(() => {
    setCostArray([])
    cart.forEach(item => appendCostArray((Number(item.imgUrl) * data[Number(item.description) - 1].price).toFixed(2)))
  }, [cart])

  function postItem () {
      fetch(`https://api.vschool.io/${utilizedUsername}/thing`, {
          method: "POST",
          body: JSON.stringify(currentThing),
          headers: {
              "Content-Type": "application/json"
          },
      }).then(() => load())
  }

  function putItem (id) {
    fetch(`https://api.vschool.io/${utilizedUsername}/thing/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            title: fluidThings[`title${id}`],
            imgUrl: fluidThings[`imgUrl${id}`],
            description: fluidThings[`description${id}`]
        }),
        headers: { "Content-Type": "application/json" }
    }).then(() => load())
  }

  function deleteItem (id) {
    fetch(`https://api.vschool.io/${utilizedUsername}/thing/${id}`, {method: "DELETE"})
    .then(() => load())
  }

  useEffect(function () {
      load()
  }, [])

  function handleUsernameInputChange (e) {
    const {value} = e.target;
    setCurrentUsernameText(value)
  }

  function handleUsernameSubmit (e) {
    e.preventDefault()
    setUtilizedUsername(currentUsernameText)
    setCartInitialized(true)
  }

  console.log(cart)

  function deleteCartItem (id) {
    axios.delete(`https://api.vschool.io/${utilizedUsername}/thing/${id}`)
    .then(() => load())
  }

  function appendCostArray (value) {
    setCostArray(prev => [...prev, value])
  }


  return (
    <div className="app-wrapper">
      <Router>
        <div className="router-wrapper">
          <Navbar handleClick={handleNavClick} cartInitialized={cartInitialized}/> 
          <Routes>
            <Route path="/" element={<Home currentUsernameText={currentUsernameText} handleChange={handleUsernameInputChange} handleSubmit={handleUsernameSubmit} cartInitialized={cartInitialized} utilizedUsername={utilizedUsername}/>} />
            <Route path="/cart" element={<Cart cartInitialized={cartInitialized} data={data} cart={cart} deleteItem={deleteCartItem} handleClick={handleNavClick} costArray={costArray} appendCostArray={appendCostArray} utilizedUsername={utilizedUsername} cartToggle={cartToggle}/>} />
            <Route path="/checkout" element={<Checkout />} />

            <Route path="/products" element={<Products 
              handleClick={handleNavClick}
              />}
              />
            
            <Route path="products/mensclothing" element={<MensClothing 
              handleClick={handleNavClick}
              handleCartAdd={handleCartAdd}
              cartInitialized={cartInitialized}
              ghostCart={ghostCart}
              updateGhostCart={updateGhostCart}
              items={mensClothingItems}
              cart={cart}/>}
              />

            <Route path="products/womensclothing" element={<WomensClothing 
              handleClick={handleNavClick}
              handleCartAdd={handleCartAdd}
              cartInitialized={cartInitialized}
              updateGhostCart={updateGhostCart}
              ghostCart={ghostCart}
              items={womensClothingItems}
              cart={cart}/>}
              />

            <Route path="products/jewelry" element={<Jewelry 
              handleClick={handleNavClick}
              handleCartAdd={handleCartAdd}
              cartInitialized={cartInitialized}
              updateGhostCart={updateGhostCart}
              ghostCart={ghostCart}
              items={jewelryItems}
              cart={cart}/>}
              />

            <Route path="products/electronics" element={<Electronics 
              handleClick={handleNavClick}
              handleCartAdd={handleCartAdd}
              cartInitialized={cartInitialized}
              updateGhostCart={updateGhostCart}
              ghostCart={ghostCart}
              items={electronicsItems}
              cart={cart}/>} 
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

            <Route path="cart/:productId" 
              element={<ProductDetails data={data} handleClick={handleNavClick}/>}
              />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  )
}