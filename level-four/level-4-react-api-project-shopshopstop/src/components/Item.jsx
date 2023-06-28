import { useNavigate } from 'react-router-dom';

export default function Item (props) {

    const navigate = useNavigate();

    function handleClick () {
        props.handleClick()
        navigate(`${props.id}`)
    }

    const itemInCart = Boolean(props.cart.find(item => Number(item.description) === props.id))

    return (
        <div className="item-wrapper">
            {itemInCart && <div className="cart-tag">IN CART</div>}
            <img src={props.picture} className="item-pic" />
            <h2 className="item-title" onClick={handleClick}>{props.name}</h2>
            <div className="price-rating-wrapper">
                <p>Price: ${props.price} </p>
                <p>Rating: {props.rating}/5 </p>
            </div>
            {props.cartInitialized && !itemInCart &&
            <form className="cart-interface-wrapper" name={props.id} onSubmit={props.handleCartAdd}>
                <button className="add-cart-button pd-button">
                    Add to Cart
                </button>
                <div className="quantity-input-wrapper">
                    <div className="quantity">
                        Quantity:
                    </div>
                    <input className="quantity-input pd-input" name={`#${props.id}`} type="number" min="1" step="1" required value={props.ghostCart[Number(props.id) - 1]} onChange={props.updateGhostCart}/>
                </div>
            </form>}
            
        </div>
    )
}