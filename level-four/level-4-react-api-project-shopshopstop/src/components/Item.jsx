
export default function Item (props) {
    return (
        <div className="item-wrapper" onClick={props.handleClick}>
            <img src={props.picture} className="item-pic" />
            <h2 className="item-title">{props.name}</h2>
            <div className="price-rating-wrapper">
                <p>Price: ${props.price} </p>
                <p>Rating (out of 5): {props.rating} </p>
            </div>
            <div className="cart-interface-wrapper">
                <button className="add-cart-button">Add to Cart</button>
                Quantity:
                <input className="quantity-input" type="number" min="0" step="1" />
            </div>
        </div>
    )
}