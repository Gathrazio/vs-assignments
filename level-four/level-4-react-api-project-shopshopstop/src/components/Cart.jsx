import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem'

export default function Cart (props) {

    /*
    cartInitialized={cartInitialized} data={data} cart={cart} deleteItem={deleteCartItem}
    */

    const navigate = useNavigate();

    function handleClick (id) {
        props.handleClick()
        navigate(`${id}`)
    }

    const cartItems = props.cart.map(item => <CartItem key={Number(item.description)}>
        <img src={props.data[Number(item.description) - 1].image} className="item-pic" />
        <h2 className="item-title" onClick={() => handleClick(Number(item.description))}>{item.title}</h2>
    </CartItem>)

    return (
        <div className={`cart-wrapper main ${props.cartInitialized ?'' : `wrapper-not-initialized`}`}>
            {props.cartInitialized ? 
                <div className="cart">
                    <div className="cart-text-wrapper">
                    <div className="cart-text">Your Cart</div>
                    </div>
                    {props.data && props.cart && cartItems}
                </div>
                 : 
                <div className="please-initialize">Please initialize a cart on the homepage!</div>}
        </div>
    )
}