import {UglyContext} from '../uglyContext'
import {useContext} from 'react'
import Thing from './Thing'

export default function UglyThingsList () {
    const {uglyThings, fluidThings} = useContext(UglyContext)

    const weave = (array) => array.map((item, i) => [item, <hr key={i}/>]).flat().slice(0, -1);

    const uglyThingElements = uglyThings.map(thing => <Thing key={thing._id} thing={thing} fluidThings={fluidThings} />)

    return (
        <div className="uglythingslist-wrapper">
            {weave(uglyThingElements)}
        </div>
    )
}