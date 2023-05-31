import React from 'react'
import icons from '../assets/icons.png'

export default function Footer () {
    return (
        <>
            <div className="footer">
                <hr />
                <div className="icon-box">
                    <img className="icons" src={icons}/>
                    Copyright © Your Website 2023
                </div>
            </div>
        </>
    )
}