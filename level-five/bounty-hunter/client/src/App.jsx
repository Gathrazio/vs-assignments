import './App.css'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Interface from './components/Interface'
import Bounty from './components/Bounty'

export default function App() {

  const [currentBounties, setCurrentBounties] = useState([]);

  useEffect(() => {
    load()
  }, [])

  function load () {
    fetch('api/bounties')
      .then(res => res.json())
      .then(data => setCurrentBounties(data))
  }

  function addBounty (bounty) {
    fetch('api/bounties', {
      method: "POST",
      body: JSON.stringify(bounty),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => load())
      .catch(err => console.log(err))
  }

  function updateBounty (bounty, id) {
    fetch(`api/bounties/${id}`, {
      method: "PUT",
      body: JSON.stringify(bounty),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => load())
      .catch(err => console.log(err))
  }

  function deleteBounty (id) {
    fetch(`api/bounties/${id}`, {
      method: "DELETE"
    })
      .then(res => load())
  }

  const bountyElements = currentBounties.map(bounty => <Bounty {...bounty} key={bounty._id} submitAction={updateBounty} currentBounties={currentBounties} deleteBounty={deleteBounty}/>)

  return (
    <div className="app-wrapper">
      <Navbar />
      <Interface submitAction={addBounty}/>
      <div className="bounty-list-wrapper">
        {bountyElements}
      </div>
    </div>
  )
}