import { useEffect, useState } from 'react'

export default function InfoForm (props) {
    const defaultValues = {
            firstName: props.firstName || '',
            lastName: props.lastName || '', 
            isAlive: props.isAlive || false,
            price: props.price || 0,
            type: props.type || 'Jedi'
        };
    const [inputValues, setInputValues] = useState(defaultValues)

    function handleChange (e) {
        const {name, value, type, checked} = e.target;
        setInputValues(prev => ({...prev, [name]: type === "checkbox" ? checked : value}))
    }

    function handleSubmit (e) {
        e.preventDefault()
        if (props.firstName) {
            props.submitAction(inputValues, props._id)
        } else {
            props.submitAction(inputValues)
            setInputValues(defaultValues)
        }
    }

    useEffect(() => {
        setInputValues(defaultValues)
    }, [props.currentBounties])

    return (
        <form className="infoform-wrapper" name="info-form" onSubmit={handleSubmit}>
            <div className="inputs-row1">
                <input type="text" name="firstName" className="text-num-input" value={inputValues.firstName} onChange={handleChange} placeholder="First name" required />
                <input type="text" name="lastName" className="text-num-input" value={inputValues.lastName} onChange={handleChange} placeholder="Last name" required />
                <div className="checkbox-wrapper">
                    <input type="checkbox" className="living-checkbox" name="isAlive" checked={inputValues.isAlive} onChange={handleChange}/>
                    <div className="label-wrapper">
                        <label htmlFor="isAlive">Living?</label>
                    </div>
                    
                </div>
            </div>
            
            <div className="inputs-row2">
                <div className="price-wrapper">
                    <label htmlFor="price">Bounty: $</label>
                    <input type="number" min="0" step="1" value={inputValues.price} name="price" className="text-num-input num-input" onChange={handleChange} />
                </div>
                <div className="type-wrapper">
                    <input type="radio" className="type-radio" name="type" value="Jedi" checked={inputValues.type === "Jedi"} onChange={handleChange} />
                    <div className="label-wrapper">
                        <label htmlFor="Jedi" className="jedi-label">Jedi</label> 
                    </div>
                    <input type="radio" className="type-radio" name="type" value="Sith" checked={inputValues.type === "Sith"} onChange={handleChange} />
                    <div className="label-wrapper">
                        <label htmlFor="Sith">Sith</label>
                    </div>
                </div>
                <button>{props.btnText}</button>
            </div>
        </form>
    )
}