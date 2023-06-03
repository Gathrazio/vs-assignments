import React, {useState} from 'react'

export default function DiceBox () {
    let rands;
    let setRands;
    function produceRands () {
        [rands, setRands] = useState([
        Math.floor(Math.random() * 6 + 1),
        Math.floor(Math.random() * 6 + 1),
        Math.floor(Math.random() * 6 + 1),
        Math.floor(Math.random() * 6 + 1),
        Math.floor(Math.random() * 6 + 1)
        ])  
    }

    function reRollRands () {
        setRands([
            Math.floor(Math.random() * 6 + 1),
            Math.floor(Math.random() * 6 + 1),
            Math.floor(Math.random() * 6 + 1),
            Math.floor(Math.random() * 6 + 1),
            Math.floor(Math.random() * 6 + 1)
            ])
    }

    produceRands()
    const randsElements = rands.map(rand => <span className="rand-box">{rand}</span>)

    return (
        <div className="dice-box-native">
        <div className="dice-box">
            {randsElements}
        </div>
        <button onClick={reRollRands}>Re-roll</button>
        </div>
        
    )
}