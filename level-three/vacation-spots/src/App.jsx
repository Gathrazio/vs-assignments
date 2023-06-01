import React from 'react'
import './App.css'
import vacationData from './vacationData'
import Card from './components/Card'

export default function App() {
  const vacaCards = vacationData.map(spot => <Card key={spot.id} {...spot}/>)
  return (
    <div className="card-container">
      {vacaCards}
    </div>
  )
}