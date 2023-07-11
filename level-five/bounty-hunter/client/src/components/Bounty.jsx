import { useState } from 'react'
import InfoForm from './InfoForm'

export default function Bounty (props) {
    const [editToggle, setEditToggle] = useState(true)
    return (
        <div className="bounty-wrapper">
            {editToggle ?
            <>
                <div className="content-wrapper">
                    <h2 className="thing-title">Name: {props.firstName} {props.lastName}</h2>
                    <h4 className="thing-description">Currently alive: {props.isAlive ? "yes" : "no"}</h4>
                    <h4 className="thing-description">Political affiliation: {props.type}</h4>
                    <h3 className="thing-description">Bounty: ${props.price}</h3>
                </div>
                <div className="button-wrapper">
                    <button className="block-button edit" onClick={() => setEditToggle(prev => !prev)}>Edit</button>
                    <button className="block-button delete">Delete</button>
                </div>
            </>
            :
            <>
                <div className="info-form-wrapper">
                    <InfoForm btnText="Save" submitAction={props.submitAction} {...props} />
                </div>
            </>
            }
        </div>
    )
}