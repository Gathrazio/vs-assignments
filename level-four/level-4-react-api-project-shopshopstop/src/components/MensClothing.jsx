import Item from './Item'
import { IconContext } from 'react-icons'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export default function MensClothing (props) {
    const mensClothingElements = props.items.map(item => <Item
        key={item.id}
        id={item.id}
        category="mensclothing"
        name={item.title}
        picture={item.image}
        price={item.price}
        rating={item.rating.rate}
        handleClick={props.handleClick}
        handleCartAdd={props.handleCartAdd}
        ghostCart={props.ghostCart}
        updateGhostCart={props.updateGhostCart}
        cartInitialized={props.cartInitialized}
        cart={props.cart}
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