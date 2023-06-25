import { Link } from 'react-router-dom'

export default function Navbar (props) {
    return (
        <nav className="navbar-wrapper">
            <Link to="/">
                <button className={`nav-button ${props.isClicked[0] && "bordered"}`} value="home" onClick={props.handleClick}>
                    Home
                </button>
            </Link>
            <Link to="/about">
                <button className={`nav-button ${props.isClicked[1] && "bordered"}`} value="about" onClick={props.handleClick}>
                    About
                </button>
            </Link>
            <Link to="/services">
                <button className={`nav-button ${props.isClicked[2] && "bordered"}`} value="services" onClick={props.handleClick}>
                    Services
                </button>
            </Link>
        </nav>
    )
}