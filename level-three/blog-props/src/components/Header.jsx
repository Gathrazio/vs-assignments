import React from 'react'
import Navbar from "./Navbar"
import "../App.css"

export default function Header() {
    return (
        <>
            <div className="header-block">
                <div className="text-block">
                    <h2 className="title-text">Clean Blog</h2>
                    <h4 className="subtitle-text">A Blog Theme by Start Bootstrap</h4>
                </div>
                <Navbar />
            </div>
        </>
    )
}