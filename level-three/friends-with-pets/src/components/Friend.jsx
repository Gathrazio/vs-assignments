import React from 'react'
import Pet from './Pet'

export default function Friend (props) {
    const petElements = props.pets.map(pet => <Pet key={pet.id} {...pet}/>)
    return (
        <div className="friend-box">
            <div className="friend-name-age">
                <div className='friend-name'>{props.name}</div>
                <div className="friend-age">Age: {props.age}</div>
            </div>
            <div className="pets">Pets:</div>
            {petElements}
        </div>
    )
}
