import { useState } from 'react'

export default function InfoForm (props) {
    const defaultValues = {
            firstName: '',
            lastName: '', 
            isAlive: false,
            price: 0,
            type: 'jedi'
        };
    const [inputValues, setInputValues] = useState(defaultValues)

    function handleChange (e) {
        const {name, value, type, checked} = e.target;
        setInputValues(prev => ({...prev, [name]: type === "checkbox" ? checked : value}))
    }

    function handleSubmit (e) {
        e.preventDefault()
        // post or put using functions from props
        setInputValues(defaultValues)
    }

    return (
        <form className="infoform-wrapper" name="info-form" onSubmit={handleSubmit}>
            <div className="inputs-row1">
                <input type="text" name="firstName" value={inputValues.firstName} onChange={handleChange} placeholder="First name" required />
                <input type="text" name="lastName" value={inputValues.lastName} onChange={handleChange} placeholder="Last name" required />
            </div>
            <div className="inputs-row2">
                <div className="checkbox-wrapper">
                    <input type="checkbox" name="isAlive" checked={inputValues.isAlive} onChange={handleChange}/>
                    <label for="isAlive">Living?</label>
                </div>
                <div className="price-wrapper">
                    <input type="number" min="0" step="0.1" value={inputValues.price} name="price" onChange={handleChange} />
                    <label for="price"></label>
                </div>
                <div className="type-wrapper">
                    <input type="radio" name="type" value="jedi" checked={inputValues.type === "jedi"} onChange={handleChange} />
                    <label for="sith">Jedi</label>
                    <input type="radio" name="type" value="sith" checked={inputValues.type === "sith"} onChange={handleChange} />
                    <label for="sith">Sith</label>
                </div>
                
                
            </div>
        </form>
    )
}