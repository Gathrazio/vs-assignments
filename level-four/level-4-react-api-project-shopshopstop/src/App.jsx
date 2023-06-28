import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react'
import Navbar from './components-&-assets/static-components/Navbar'
import Home from './components-&-assets/top-navigable-components/Home'
import Footer from './components-&-assets/static-components/Footer'
import Products from './components-&-assets/top-navigable-components/Products'
import Cart from './components-&-assets/top-navigable-components/Cart'
import Checkout from './components-&-assets/unused-components/Checkout'
import MensClothing from './components-&-assets/product-components/MensClothing'
import WomensClothing from './components-&-assets/product-components/WomensClothing'
import Jewelry from './components-&-assets/product-components/Jewelry'
import Electronics from './components-&-assets/product-components/Electronics'
import ProductDetails from './components-&-assets/item-components/ProductDetails'
import './App.css'

export default function App () {

  let ghostCartStart = [];

  // fake store api related state

  const [mensClothingItems, setMensClothingItems] = useState([]);
  const [womensClothingItems, setWomensClothingItems] = useState([]);
  const [jewelryItems, setJewelryItems] = useState([]);
  const [electronicsItems, setElectronicsItems] = useState([]);


  // cart related state

  const [cart, setCart] = useState([]);
  const [ghostCart, setGhostCart] = useState(ghostCartStart);
  const [cartInitialized, setCartInitialized] = useState(false);
  const [currentUsernameText, setCurrentUsernameText] = useState("");
  const [utilizedUsername, setUtilizedUsername] = useState("z");
  const [costArray, setCostArray] = useState([]);
  const [cartToggle, setCartToggle] = useState([]);

  

  // data array which is essentially a piece of state

  const data = [
    mensClothingItems,
    jewelryItems,
    electronicsItems,
    womensClothingItems
  ].flat();



  // functions used to alter state and keep things in the application tidy


  function handleNavClick () {
    window.scroll(0, 0);
  }

  // load() updates the cart state with the ugly things API and rebuilds the cartToggle state, used for cart edits

  function load () {
    axios.get(`https://api.vschool.io/${utilizedUsername}/thing`)
      .then(res => {
        setCart(res.data)
        if (res.data.length) {
          setCartToggle(Array.from({length: res.data.length}, (_, index) => ({toggle: false, quantity: Number(res.data[index].imgUrl)})))
        }})
  }

  // handleCartAdd() posts a new item to the ugly things API and then calls load(). ALso

  function handleCartAdd (e) {
    e.preventDefault()
    const {name} = e.target;
    axios.post(`https://api.vschool.io/${utilizedUsername}/thing`, { // bootstrapping the shit out of this API
      title: data[Number(name) - 1].title, // item name
      description: name, // item id
      imgUrl: ghostCart[Number(name) - 1].toString() // quantity
    }).then(() => load())
  }

  // updates ghostCart, which is the state that controls the quantity inputs for every item under the products navigation

  function updateGhostCart (e) {
    const {value, name} = e.target;
    setGhostCart(prev => prev.toSpliced(Number(name.slice(1)) - 1, 1, Number(value)))
  }

  // toggles the toggle property of the cartToggle state, used in swapping buttons and swapping text with an input during cart edits

  function toggleEditToggle (index) {
    setCartToggle(prev => prev.toSpliced(index, 1, {...prev[index], toggle: !prev[index].toggle}))
  }

  // updates the quantity property of the cartToggle State

  function updateCartToggleQuantity(e, index) {
    const {value} = e.target;
    setCartToggle(prev => prev.toSpliced(index, 1, {toggle: prev[index].toggle, quantity: value}))
  }

  // updates a cart item with a new quantity

  function updateCartItem (index) {
    axios.put(`https://api.vschool.io/${utilizedUsername}/thing/${cart[index]._id}`, {imgUrl: cartToggle[index].quantity})
      .then(() => load())
      .then(() => toggleEditToggle(index))
  }

  // controls the state for the username input field

  function handleUsernameInputChange (e) {
    const {value} = e.target;
    setCurrentUsernameText(value)
  }

  // controls the submit of the username form

  function handleUsernameSubmit (e) {
    e.preventDefault()
    setUtilizedUsername(currentUsernameText)
    setCartInitialized(true)
  }

  // deletes an item from the user's cart by deleting it from the ugly things api and calling load()

  function deleteCartItem (id) {
    axios.delete(`https://api.vschool.io/${utilizedUsername}/thing/${id}`)
    .then(() => load())
  }

  // adds another item bundle cost to the costArray state, used in calculating the cost of the user's cart

  function appendCostArray (value) {
    setCostArray(prev => [...prev, value])
  }


  // useEffect() calls in <App />

  // initial useEffect() upon page load to get the fake store info

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

  // calls load() whenever utilizedUsername changes -- it will only change once during a single instance of the app

  useEffect (() => {
    load()
  }, [utilizedUsername])

  // generates the starting values of ghostCart upon page load

  useEffect(() => {
    for (let i = 0; i < 20; i++) {
      ghostCartStart.push(1)
    }
  }, [])

  // upon changes to the cart, the costArray state is purged and re-generated with the new cart
  
  useEffect(() => {
    setCostArray([])
    cart.forEach(item => appendCostArray((Number(item.imgUrl) * data[Number(item.description) - 1].price).toFixed(2)))
  }, [cart])



  return (
    <div className="app-wrapper">
      <Router>
        <div className="router-wrapper">
          <Navbar handleClick={handleNavClick} cartInitialized={cartInitialized}/> 
          <Routes>

            <Route 
              path="/"
              element={<Home 
                cartInitialized={cartInitialized}
                utilizedUsername={utilizedUsername}
                currentUsernameText={currentUsernameText}
                handleSubmit={handleUsernameSubmit} 
                handleChange={handleUsernameInputChange}
              />}
            />

            <Route
              path="/cart"
              element={<Cart
                data={data}
                cart={cart}
                costArray={costArray}
                cartToggle={cartToggle}
                cartInitialized={cartInitialized}
                utilizedUsername={utilizedUsername}
                deleteItem={deleteCartItem}
                handleClick={handleNavClick}
                updateCartItem={updateCartItem}
                appendCostArray={appendCostArray}
                toggleEditToggle={toggleEditToggle}
                updateCartToggleQuantity={updateCartToggleQuantity}
              />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/products"
              element={<Products 
                handleClick={handleNavClick}
              />}
            />
            
            <Route
              path="products/mensclothing"
              element={<MensClothing 
                cart={cart}
                ghostCart={ghostCart}
                items={mensClothingItems}
                cartInitialized={cartInitialized}
                handleClick={handleNavClick}
                handleCartAdd={handleCartAdd}
                updateGhostCart={updateGhostCart}
              />}
            />

            <Route
              path="products/womensclothing"
              element={<WomensClothing 
                cart={cart}
                ghostCart={ghostCart}
                items={womensClothingItems}
                cartInitialized={cartInitialized}
                handleClick={handleNavClick}
                handleCartAdd={handleCartAdd}
                updateGhostCart={updateGhostCart}
              />}
            />

            <Route
              path="products/jewelry"
              element={<Jewelry 
                cart={cart}
                items={jewelryItems}
                ghostCart={ghostCart}
                cartInitialized={cartInitialized}
                handleClick={handleNavClick}
                handleCartAdd={handleCartAdd}
                updateGhostCart={updateGhostCart}
              />}
            />

            <Route
              path="products/electronics"
              element={<Electronics 
                cart={cart}
                ghostCart={ghostCart}
                items={electronicsItems}
                cartInitialized={cartInitialized}
                handleClick={handleNavClick}
                handleCartAdd={handleCartAdd}
                updateGhostCart={updateGhostCart}
              />}
            />

            <Route
              path="products/mensclothing/:productId"
              element={<ProductDetails
                data={data}
                handleClick={handleNavClick}
              />}
            />

            <Route
              path="products/womensclothing/:productId"
              element={<ProductDetails
                data={data}
                handleClick={handleNavClick}
              />}
            />

            <Route
              path="products/jewelry/:productId"
              element={<ProductDetails
                data={data}
                handleClick={handleNavClick}
              />}
            />

            <Route
              path="products/electronics/:productId"
              element={<ProductDetails
                data={data}
                handleClick={handleNavClick}
              />}
            />

            <Route
              path="cart/:productId"
              element={<ProductDetails
                data={data}
                handleClick={handleNavClick}
              />}
            />

          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  )
}