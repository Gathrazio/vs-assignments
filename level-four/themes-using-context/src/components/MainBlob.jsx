import {useContext} from 'react'
import {ThemeContext} from '../themeContext'

export default function MainBlob () {

    const {theme, toggleTheme} = useContext(ThemeContext)

    return (
        <div className={`mainblob-wrapper ${theme}`}>
            <div className="epithet">
                Click the button to change the site theme!
            </div>
            
            <button className={theme} onClick={toggleTheme}>Toggle to {theme === 'dark' ? 'light' : 'dark'}</button>
        </div>
    )
}