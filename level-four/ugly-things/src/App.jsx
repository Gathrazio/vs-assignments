import TitleBar from './components/TitleBar'
import Interface from './components/Interface'
import UglyThingsList from './components/UglyThingsList'

import './App.css'


export default function App () {
  return (
    <div className="app-wrapper">
      <TitleBar />
      <Interface />
      <UglyThingsList />
    </div>
  )
}