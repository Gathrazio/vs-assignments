import { useState } from 'react'
import './App.css'

export default function App() {
  const [people, setPeople] = useState([
    {
      firstName: "John",
      lastName: "Smith"
    }
  ])

  function handleClick () {
    setPeople(prev => [...prev, {
      firstName: "Ron",
      lastName: "Edgar"
    }])
  }

  const peopleElements = people.map(person => <h1>{person.firstName} {person.lastName}</h1>)

  return (
    <>
    <div className="block" onClick={handleClick}>{peopleElements}</div>
    </>
  )
}