import React, {useState} from 'react'

const ThemeContext = React.createContext()

function ThemeContextProvider (props) {

    const [theme, setTheme] = useState(false);
    function toggleTheme () {
        console.log('setting theme')
        setTheme(prev => !prev)
    }

    return (
        <ThemeContext.Provider value={{theme: theme ? 'light' : 'dark', toggleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeContextProvider}