import React, {useState} from 'react'

export default function Square (props) {
    const styles = {
        backgroundColor: props.color,
        border: `${props.border}px solid black`
    }
    return (
        <div className="square" style={styles}></div>
    )
}