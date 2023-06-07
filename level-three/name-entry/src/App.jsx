import { useState } from 'react'
import './App.css'

export default function App() {

  const [written, setWritten] = useState("");
  const [names, setNames] = useState([]);

  function updateWritten (e) {
    const {value} = e.target;
    setWritten(value)
  }

  function addName (e) {
    setNames(prev => [...prev, written])
  }

  const nameElements = names.map(name => <li>{name}</li>)


  return (
    <div className="wrapper">
      <input type="text" onChange={updateWritten} value={written}></input>
      <button onClick={addName}>Submit</button>
      <h1>{written}</h1>
      <ol>{nameElements}</ol>
    </div>
  )
}