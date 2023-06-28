import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem'
import { useEffect } from 'react';

export default function Cart (props) {

    /*
    cartInitialized={cartInitialized}
    data={data} 
    cart={cart}
    deleteItem={deleteCartItem}
    handleClick={handleNavClick}
    costArray={costArray}
    appendCostArray={appendCostArray}
    utilizedUsername={utilizedUsername}
    cartToggle={cartToggle}
    toggleEditToggle={toggleEditToggle}
    updateCartToggleQuantity={updateCartToggleQuantity}
    */

    const navigate = useNavigate();

    function handleClick (id) {
        props.handleClick()
        navigate(`${id}`)
    }

    const cartTotalDisplay = (cart) => {
        if (cart.length === 1) {
            return props.costArray[0];
        } else {
            return props.costArray.reduce((a, b) => Number(a) + Number(b)).toFixed(2);
        }
    }

    function handleSave (index) {
        props.updateCartItem(index)
    }
    


    const cartItems = props.cart.map((item, index) => {
        return (<CartItem key={Number(item.description)}>
            <img src={props.data[Number(item.description) - 1].image} className="item-pic" />
            <h2 className="item-title" onClick={() => handleClick(Number(item.description))}>{item.title}</h2>
            <div className="cart-stats-wrapper">
                <div className="cart-quantity">
                    Quantity: {props.cartToggle[index].toggle ?
                        <input className="toggled-input" value={props.cartToggle[index].quantity} type="number" min="1" step="1" onChange={(e) => props.updateCartToggleQuantity(e, index)}></input> :
                        item.imgUrl}
                </div>
                <div className="cart-quantity">
                    Total Cost: ${(Number(item.imgUrl) * props.data[Number(item.description) - 1].price).toFixed(2)}
                </div>
            </div>
            <div className="cart-item-button-wrapper">
                {props.cartToggle[Number(index)].toggle ? 
                    <button className="edit-save-quantity" onClick={() => handleSave(index)}>Save Quantity</button> :
                    <button className="edit-save-quantity" onClick={() => props.toggleEditToggle(index)}>Edit Quantity</button>}
                <button className="delete-cart-item" onClick={() => props.deleteItem(item._id)}>Delete All</button>
            </div>
        </CartItem>)})

    return (
        <div className={`cart-wrapper main ${props.cartInitialized ? '' : `wrapper-not-initialized`}`}>
            {props.cartInitialized ? 
                <div className="cart">
                    <div className="cart-text-wrapper">
                    <div className="cart-text">{props.utilizedUsername}'s Cart</div>
                    </div>
                    {props.data && props.cart && cartItems}
                    {props.cart.length > 0 && <div className="cart-total-wrapper">
                        <div className="cart-total-text">
                            Cart Total: ${cartTotalDisplay(props.cart)}
                        </div>
                        <button className="checkout-button">
                            Checkout
                        </button>
                    </div>}
                    {props.cart.length === 0 && 
                    <div className="go-shop-wrapper please-initialize">
                        <div>Go Shop! Your cart is currently empty.</div>
                    </div>}
                </div>
                 : 
                <div className="please-initialize">Please initialize a cart on the homepage!</div>}
        </div>
    )
}