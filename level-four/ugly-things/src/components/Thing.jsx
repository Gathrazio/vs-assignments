export default function Thing (props) {

    const displayCondition = (id) => Boolean(props.fluidThings[`title${id}`] || props.fluidThings[`title${id}`] === "")

    return (
        <div className="thing-wrapper">
            {displayCondition(props.thing._id) ? <div className="edit-input-wrapper">
                <input className="edit-title-input"></input>
                <input className="edit-img-url-input"></input>
                <input className="edit-description-input"></input>
            </div> : <div className="content-wrapper">
                <h1>{props.thing.title}</h1>
                <img src={props.thing.imgUrl} />
                <h3>{props.thing.description}</h3>
            </div>}
        </div>
    )
}