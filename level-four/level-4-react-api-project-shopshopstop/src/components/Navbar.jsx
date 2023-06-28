import { Link } from 'react-router-dom'
import { IconContext } from "react-icons";
import { AiFillHome } from 'react-icons/ai';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { HiShoppingCart } from 'react-icons/hi';

export default function Navbar (props) {
    return (
        <nav className="navbar-wrapper">
            <Link to="/" className="link">
                <button className={`nav-button home`} value="home" onClick={props.handleClick}>
                <div className="navbutton-interior-container">
                    <IconContext.Provider value={{ className: 'react-icons' }}>
                        <AiFillHome />
                    </IconContext.Provider>
                    <h4 className="nav-button-lettering home-lettering">Home</h4>
                </div>
                </button>
            </Link>
            <Link to="/products" className="link">
                <button className={`nav-button products`} value="products" onClick={props.handleClick}>
                <div className="navbutton-interior-container">
                    <IconContext.Provider value={{ className: 'react-icons' }}>
                        <BiSolidPurchaseTag />
                    </IconContext.Provider>
                    <h4 className="nav-button-lettering product-lettering">Products</h4>
                </div>
                </button>
            </Link>
            <Link to="/cart" className="link">
                <button className={`nav-button cart${props.cartInitialized ? "" : " not-initialized"}`} value="cart" onClick={props.handleClick}>
                <div className="navbutton-interior-container">
                    <IconContext.Provider value={{ className: 'react-icons' }}>
                        <HiShoppingCart />
                    </IconContext.Provider>
                    <h4 className="nav-button-lettering cart-lettering">Cart</h4>
                </div>
                </button>
            </Link>
        </nav>
    )
}