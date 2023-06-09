import React, {useState, useEffect} from 'react'

export default function RandomColor () {
    const [background, setBackground] = useState("");
    const [changer, setChanger] = useState(true);
    useEffect(() => {
        axios.get(`https://www.colr.org/json/color/random?timestamp=${new Date().getTime()}`)
                        .then(res => setBackground(res.data.colors[0].hex))
    }, [changer])
    return (
    <>
    <div className='rand-component' style={{backgroundColor: `#${background}`}}></div>
    <button onClick={() => setChanger(prev => !prev)}>Change Color</button>
    </>
    
    )
}