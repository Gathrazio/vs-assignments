export default function LeftBlock (props) {

    const hexString = props.gradientList.map(gradient => gradient.hex).join(", ");
    const backgroundString = `linear-gradient(${props.gradientAngle}deg, ${hexString})`;
    const styles = {
        background: backgroundString
    }
    const mozString = `-moz-background: linear-gradient(${props.gradientAngle}deg, ${hexString})`

    return (
        <div className="left-block-wrapper block">
            <div className="gradient" style={styles}></div>
            <textarea readOnly className='text' value={`background: ${backgroundString};\n-moz-background: ${backgroundString};\n-webkit: ${backgroundString};`}>
            </textarea>
        </div>
    )
}