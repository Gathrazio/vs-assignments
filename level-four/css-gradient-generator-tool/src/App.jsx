import React, {useState} from 'react'
import './App.css'
import LeftBlock from './components/LeftBlock'
import RightBlock from './components/RightBlock'

export default function App() {

  const [gradientAngle, setGradientAngle] = useState(50);
  const [gradientList, setGradientList] = useState([
    {
        number: 1,
        hex: "#4e125e"
    },
    {
        number: 2,
        hex: "#529cb7"
    }
  ]);

  function addGradient () {
      setGradientList(prev => [...prev, {
          number: prev[prev.length - 1].number + 1,
          hex: "#ffffff"
      }])
  }

  function changeGradient (e) {
    const {name, value} = e.target;
    gradientList.forEach((gradient, index) => {
      if (gradient.number === Number(name)) {
        setGradientList(prev => prev.toSpliced(index, 1, {
          ...prev[index],
          hex: value
        }))
      }
    })
  }

  function popGradient () {
    setGradientList(prev => prev.slice(0, prev.length - 1))
  }

  function changeGradientAngle (e) {
    const {value} = e.target;
    setGradientAngle(value)
  }

  return (
    <div className="app-wrapper">
      <LeftBlock gradientList={gradientList} 
                 gradientAngle={gradientAngle}
      />
      <RightBlock gradientList={gradientList} 
                  addGradient={addGradient} 
                  popGradient={popGradient}
                  changeGradient={changeGradient} 
                  gradientAngle={gradientAngle} 
                  changeGradientAngle={changeGradientAngle}
                  newGradient={addGradient}
      />
    </div>
  )
}