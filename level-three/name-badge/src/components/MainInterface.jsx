import React, {useState} from 'react'
import Badge from './Badge'

export default function MainInterface () {
    const [badgeData, setBadgeData] = useState([]);
    const [formData, setFormData] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            pOB: '',
            phone: '',
            favFood: '',
            selfDigest: ''
        }
    )

    function handleChange (e) {
        const {value, name} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    
    function handleSubmit (e) {
        e.preventDefault()
        setBadgeData(prev => [
            ...prev,
            formData
        ])
        setFormData(
            {
                firstName: '',
                lastName: '',
                email: '',
                pOB: '',
                phone: '',
                favFood: '',
                selfDigest: ''
            }
        )
    }

    const badgeElements = badgeData.map((badge, index) => <Badge 
        badge={{...badge, index}} 
        key={badge.firstName}
    />)

    return (
        <div className="god-wrapper">
            <div className="wrapper">
                <form name="interface--form" onSubmit={handleSubmit} className="interface--form">
                    <input type="text" onChange={handleChange} name="firstName" className="interface--first-name interface" value={formData.firstName} placeholder="First Name" minLength="3" required/>
                    <input type="text" onChange={handleChange} name="lastName" className="interface--last-name interface" value={formData.lastName} placeholder="Last Name" minLength="3" required/>
                    <input type="email" onChange={handleChange} name="email" className="interface--email interface" value={formData.email} placeholder="Email" minLength="3" required/>
                    <input type="text" onChange={handleChange} name="pOB" className="interface--POB interface" value={formData.pOB} placeholder="Place of Birth" minLength="3" required/>
                    <input type="number" onChange={handleChange} name="phone" className="interface--phone interface" value={formData.phone} placeholder="Phone" minLength="3"  required/>
                    <input type="text" onChange={handleChange} name="favFood" className="interface--fav-food interface" value={formData.favFood} placeholder="Favorite Food" minLength="3" required/>
                    <textarea onChange={handleChange} name="selfDigest" className="interface--self-digest" cols="15" rows="5" value={formData.selfDigest} placeholder="Tell us about yourself!"  required></textarea>
                    <button className='interface--button'>Submit</button>
                </form>
            </div>
            {badgeElements}
        </div>
    )
}