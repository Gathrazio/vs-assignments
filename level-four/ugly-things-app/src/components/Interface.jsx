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
            <form name="interface-form" onSubmit={handleFormSubmit}>
                <div className="input-wrapper">
                    <input type="text" placeholder="Title" value={currentThing.title} name="title" onChange={updateThing} />
                    <input type="url" placeholder="Image Url" value={currentThing.imgUrl} name="imgUrl" onChange={updateThing}  />
                    <input type="text" placeholder="Description" value={currentThing.description} name="description" onChange={updateThing}  />
                </div>
                <button>Submit Thing</button>
            </form>
        </div>
    )
}