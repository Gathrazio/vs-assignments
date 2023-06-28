export default function CategorySnapshot (props) {
    return (
        <div className="categorysnapshot-wrapper" onClick={props.handleClick}>
            <h1 className="category-title">{props.name}</h1>
            <img src={props.picture} className="categorysnapshot-pic" />
            <p className="category-blurb">{props.blurb}</p>
        </div>
    )
}