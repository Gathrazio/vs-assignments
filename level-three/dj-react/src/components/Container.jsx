import React, {useState} from "react"
import Square from './Square'

export default function Container (props) {
    return (
        <div className="squares-container">
            <Square color={props.colors[0]} border={props.borders[0]}/>
            <Square color={props.colors[1]} border={props.borders[1]}/>
            <Square color={props.colors[2]} border={props.borders[2]}/>
            <Square color={props.colors[3]} border={props.borders[3]}/>
        </div>
    )
}