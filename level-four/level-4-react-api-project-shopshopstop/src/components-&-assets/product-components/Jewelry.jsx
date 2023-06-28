import Item from '../item-components/Item'
import { IconContext } from 'react-icons'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export default function Jewelry (props) {

    /*
        cart={cart}
        items={jewelryItems}
        ghostCart={ghostCart}
        cartInitialized={cartInitialized}
        handleClick={handleNavClick}
        handleCartAdd={handleCartAdd}
        updateGhostCart={updateGhostCart}
    */

    const jewelryElements = props.items.map(item => <Item
        id={item.id}
        key={item.id}
        cart={props.cart}
        name={item.title}
        category="jewelry"
        price={item.price}
        picture={item.image}
        rating={item.rating.rate}
        ghostCart={props.ghostCart}
        cartInitialized={props.cartInitialized}
        handleClick={props.handleClick}
        handleCartAdd={props.handleCartAdd}
        updateGhostCart={props.updateGhostCart}
    />)

    const navigate = useNavigate()

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
                    <div className="category-title-text">Jewelry</div>
            </div>
            <div className="jewelry-wrapper main">
                {props && jewelryElements}
            </div>
        </>
    )
}