import Item from '../item-components/Item'
import { IconContext } from 'react-icons'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export default function womensClothing (props) {

    /*
        cart={cart}
        ghostCart={ghostCart}
        items={womensClothingItems}
        cartInitialized={cartInitialized}
        handleClick={handleNavClick}
        handleCartAdd={handleCartAdd}
        updateGhostCart={updateGhostCart}
    */

    const womensClothingElements = props.items.map(item => <Item
        key={item.id}
        id={item.id}
        cart={props.cart}
        name={item.title}
        price={item.price}
        picture={item.image}
        category="womensclothing"
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
                    <div className="category-title-text">Women's Clothing</div>
                </div>
            <div className="womensclothing-wrapper main">
                {props && womensClothingElements}
            </div>
        </>
    )
}