
export default function Issue (props) {
    return (
        <div className="issue-wrapper">
            <h3 className="issue-title">{props.title}</h3>
            <p className="issue-description">{props.description}</p>
        </div>
    )
}