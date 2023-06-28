import Item from '../item-components/Item'
import { IconContext } from 'react-icons'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export default function Electronics (props) {

    /*
        cart={cart}
        ghostCart={ghostCart}
        items={electronicsItems}
        cartInitialized={cartInitialized}
        handleClick={handleNavClick}
        handleCartAdd={handleCartAdd}
        updateGhostCart={updateGhostCart}
    */

    const electronicsElements = props.items.map(item => <Item
        key={item.id}
        id={item.id}
        name={item.title}
        cart={props.cart}
        price={item.price}
        picture={item.image}
        category="electronics"
        rating={item.rating.rate}
        ghostCart={props.ghostCart}
        handleClick={props.handleClick}
        handleCartAdd={props.handleCartAdd}
        updateGhostCart={props.updateGhostCart}
        cartInitialized={props.cartInitialized}
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
                    <div className="category-title-text">Electronics</div>
            </div>
            <div className="electronics-wrapper main">
                {props && electronicsElements}
            </div>
        </>
        
    )
}