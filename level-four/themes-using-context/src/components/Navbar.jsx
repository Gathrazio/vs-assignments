import {ThemeContext} from '../themeContext'
import {useContext} from 'react'


export default function Navbar () {
    const {theme} = useContext(ThemeContext)
    return (
        <div className={`navbar-wrapper ${theme}`}>
            <h1>Home</h1>
            <h1>About</h1>
            <h1>Contact</h1>
        </div>
    )
}