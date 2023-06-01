import React from 'react'
import '../App.css'

export default function Card (props) {
    let backgroundColor;
    switch (props.timeToGo) {
        case "Summer":
            backgroundColor = "yellow";
            break;
        case "Winter":
            backgroundColor = "cyan";
            break;
        case "Fall":
            backgroundColor = "orange";
            break;
        case "Spring":
            backgroundColor = "green";
    }
    let priceTag;
    if (props.price < 500) {
        priceTag = '$'
    } else if (props.price < 1000) {
        priceTag = '$$'
    } else {
        priceTag = '$$$'
    }
    return (
        <div className={`card-box ${backgroundColor}`}>
            <div className="price-tag">{priceTag}</div>
            <img src={`../../public/assets/${props.picture}`} className="picture" />
            <div className='title'>{props.place}</div>
            <div className="season-price"><div className="season">{props.timeToGo}</div><div className="price">${props.price}</div></div>
        </div>
    )
}