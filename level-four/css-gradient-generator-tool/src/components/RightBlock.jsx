import Gradient from './Gradient'
import "../App.css"

export default function RightBlock (props) {

    const gradientElements = props.gradientList.map(gradient => <Gradient 
        key={gradient.number} 
        number={gradient.number}
        hex={gradient.hex}
        handleChange={props.changeGradient}
    />)

    return (
        <div className="right-block-wrapper block">
            <h1 className="options">
                Options
            </h1>
            {gradientElements}
            <div className="alteration-block">
                <div className="angle-block">
                    Angle:
                    <input type="number" className="angle-input" name="angle" min="0" max="180" step="1" value={props.gradientAngle} onChange={props.changeGradientAngle} />
                </div>
                <div className="button-block">
                {props.gradientList.length > 2 && 
                    <button onClick={props.popGradient}>-</button>}
                <button onClick={props.newGradient}>+</button>
                </div>
            </div>
            
        </div>
    )
}