import Item from '../item-components/Item'
import { IconContext } from 'react-icons'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export default function MensClothing (props) {

    /*
        cart={cart}
        ghostCart={ghostCart}
        items={mensClothingItems}
        cartInitialized={cartInitialized}
        handleClick={handleNavClick}
        handleCartAdd={handleCartAdd}
        updateGhostCart={updateGhostCart}
    */

    const mensClothingElements = props.items.map(item => <Item
        id={item.id}
        key={item.id}
        cart={props.cart}
        name={item.title}
        price={item.price}
        picture={item.image}
        category="mensclothing"
        rating={item.rating.rate}
        ghostCart={props.ghostCart}
        cartInitialized={props.cartInitialized}
        handleClick={props.handleClick}
        handleCartAdd={props.handleCartAdd}
        updateGhostCart={props.updateGhostCart}
    />)

    const navigate = useNavigate();

    return (
        <>
            <div className="category-title-wrapper">
                <button className="back-from-category" onClick={() => {
                    props.handleClick()
                    navigate(-1)
                }}>
                    <IconContext.Provider value={{ className: 'react-icons back' }}>
                        <IoArrowBack />
                    </IconContext.Provider>
                </button>
                <div className="category-title-text">Men's Clothing</div>
            </div>
            <div className="mensclothing-wrapper main">
                {props && mensClothingElements}
            </div>
        </>
    )
}