import {ThemeContext} from '../themeContext'
import {useContext} from 'react'

export default function Footer () {
    const {theme} = useContext(ThemeContext)
    return (
        <div className={`footer-wrapper ${theme}`}>
            <div className="company">
                Bright Futures LLC
            </div>
            <div className="comment">
                Have a complaint? We don't care.
            </div>
        </div>
    )
}