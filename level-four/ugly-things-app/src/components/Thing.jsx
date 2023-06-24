import {UglyContext} from '../uglyContext'
import {useContext} from 'react'
import '../App.css'

export default function Thing (props) {

    const {deleteUglyThing, putUglyThing, initializeEdit, updateThing} = useContext(UglyContext)
    const displayCondition = (id) => Boolean(props.fluidThings[`title${id}`] || props.fluidThings[`title${id}`] === "")
    console.log(props.fluidThings)

    return (
        <div className="thing-wrapper">
            {displayCondition(props.thing._id) ? <div className="edit-input-wrapper">
                <input className="edit-title-input" name={`title${props.thing._id}`} value={props.fluidThings[`title${props.thing._id}`]} onChange={updateThing}></input>
                <input className="edit-img-url-input" name={`imgUrl${props.thing._id}`} value={props.fluidThings[`imgUrl${props.thing._id}`]} onChange={updateThing}></input>
                <input className="edit-description-input" name={`description${props.thing._id}`} value={props.fluidThings[`description${props.thing._id}`]} onChange={updateThing}></input>
            </div> : <div className="content-wrapper">
                <h1 className="thing-title">{props.thing.title}</h1>
                <img className="thing-image" src={props.thing.imgUrl} />
                <h3 className="thing-description">{props.thing.description}</h3>
            </div>}
            <div className="alteration-buttons-wrapper">
                <button onClick={displayCondition(props.thing._id) ? () => putUglyThing(props.thing._id) : () => initializeEdit(props.thing._id)}>{displayCondition(props.thing._id) ? "Save" : "Edit"}</button>
                <button onClick={() => deleteUglyThing(props.thing._id)} className="delete-button">Delete</button>
            </div>
            
        </div>
    )
}