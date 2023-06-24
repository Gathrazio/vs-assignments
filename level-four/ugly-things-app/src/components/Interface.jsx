import {UglyContext} from "../uglyContext"
import {useContext, useEffect} from "react"


export default function Interface () {

    const {currentThing, updateThing, postUglyThing} = useContext(UglyContext);

    function handleFormSubmit (e) {
        e.preventDefault()
        postUglyThing()
    }

    return (
        <div className="interface-wrapper">
            <form name="interface-form" className="interface-form" onSubmit={handleFormSubmit}>
                <div className="input-wrapper">
                    <input type="text" placeholder="Title" value={currentThing.title} name="title" onChange={updateThing} className="interface-title"/>
                    <input type="url" placeholder="Image Url" value={currentThing.imgUrl} name="imgUrl" onChange={updateThing} className="interface-image" />
                    <input type="text" placeholder="Description" value={currentThing.description} name="description" onChange={updateThing} className="interface-description" />
                </div>
                <button className="interface-submit">Submit Thing</button>
            </form>
        </div>
    )
}