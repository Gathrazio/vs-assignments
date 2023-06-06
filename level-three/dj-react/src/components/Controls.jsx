import React, {useState} from 'react'

export default function Controls (props) {
    return (
        <div className="buttons-container">
            <button className="dj-small button" onClick={props.small}>DJ Small</button>
            <button className="party-dj button" onClick={props.party}>Party DJ</button>
            <button className="pro-dj-left button" onClick={props.pro.left}>Left Blue</button>
            <button className="pro-dj-right button" onClick={props.pro.right}>Right Blue</button>
            <button className="big-time-top-left button" onClick={props.big.topLeft}>Top Left</button>
            <button className="big-time-top-right button" onClick={props.big.topRight}>Top Right</button>
            <button className="bit-time-bottom-left button" onClick={props.big.bottomLeft}>Bottom Left</button>
            <button className="big-time-bottom-right button" onClick={props.big.bottomRight}>Bottom Right</button>
            <button className="music button" onClick={props.play}>NoiseMaker©</button>
        </div>
    )
}