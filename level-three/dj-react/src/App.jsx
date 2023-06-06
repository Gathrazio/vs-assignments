import { useState } from 'react'
import Container from "./components/Container"
import Controls from "./components/Controls"
import './App.css'
import divineFailure from "./assets/divine_failure.mp3"

export default function App() {
  const [colors, setColors] = useState(["white", "white", "white", "white"])
  const [borders, setBorders] = useState(["2", "2", "2", "2"])
  const [straightGas, setGas] = useState(new Audio(divineFailure))

  // I don't know why I am allowed to do this, but it comes out of necessity as I am not sure how to use setGas to change the volume property of the audio object (not a regular js object)
  straightGas.volume = 0.2;

  function djSmallChanger () {
    if (colors[0] != "white"){
      setColors(["white", "white", "white", "white"]);
    } else {
      setColors(["black", "black", "black", "black"])
    }
    setBorders(["2", "2", "2", "2"])
  }

  function partyDJChanger () {
    setColors(prevState => ["purple", "purple", prevState[2], prevState[3]])
  }

  function professionalLeft () {
    setColors(prevState => [prevState[0], prevState[1], "blue", prevState[3]])
  }

  function professionalRight () {
    setColors(prevState => [prevState[0], prevState[1], prevState[2], "blue"])
  }

  const professional = {
    left: professionalLeft,
    right: professionalRight
  }

  function topLeftFunc () {
    if (colors[1] === "white") {
      setColors(prevState => [prevState[0], "orange", prevState[2], "orange"])
    } else {
      setColors(prevState => ["pink", prevState[1], prevState[2], prevState[3]])
    }
    setBorders(["4", "2", "2", "2"])
  }

  function topRightFunc () {
    if (colors[0] === "pink") {
      setColors(prevState => [prevState[0], "aquamarine", "cyan", prevState[3]])
    } else {
      setColors(prevState => ["grey", prevState[1], prevState[2], prevState[3]])
    }
    setBorders(["2", "4", "2", "2"])
  }

  function bottomLeftFunc () {
    if (colors[1] === "aquamarine") {
      setColors(prevState => [prevState[0], "yellow", "teal", "red"])
    } else {
      setColors(["red", "green", "white", "gold"])
    }
    setBorders(["2", "2", "4", "2"])
  }

  function bottomRightFunc () {
    setBorders(["2", "2", "2", "4"])
    setColors(prevState => [prevState[0], prevState[1], prevState[2], "yellow"])
  }

  const bigTime = {
    topLeft: topLeftFunc,
    topRight: topRightFunc,
    bottomLeft: bottomLeftFunc,
    bottomRight: bottomRightFunc
  }

  function playMusic(){
    if (straightGas.paused){
      straightGas.play();
    } else {
      straightGas.pause()
    }
  }


  return (
    <div className="wrapper">
      <Container borders={borders} colors={colors}/>
      <Controls small={djSmallChanger} party={partyDJChanger} pro={professional} big={bigTime} play={playMusic}/>
    </div>
  )
}