import InfoForm from './InfoForm'

export default function Interface (props) {
    return (
        <div className="interface-wrapper">
            <InfoForm submitAction={props.submitAction} btnText="Submit"/>
        </div>
    )
}