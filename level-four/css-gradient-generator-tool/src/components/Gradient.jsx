import "../App.css"

export default function Gradient (props) {
    return (
        <div className="gradient-wrapper">
            <div className="title">
                Color {props.number}
            </div>
            <div className="hex">
                {props.hex}
            </div>
            <div className="color-input">
                <input type="color" name={props.number} value={props.hex} onChange={props.handleChange} />
            </div>
        </div>
    )
}