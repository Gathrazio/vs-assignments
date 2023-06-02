import React from 'react'

export default function Pet (props) {
    return (
        <div className="pet-box">
            <div className="pet-name">Name: <span className="pet-name-text">{props.name}</span></div>
            <div className="pet-breed">Breed: <span className="pet-breed-text">{props.breed}</span></div>
        </div>
    )
}