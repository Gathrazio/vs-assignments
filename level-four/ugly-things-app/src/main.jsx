import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {UglyContextProvider} from './uglyContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(<UglyContextProvider><App /></UglyContextProvider>)