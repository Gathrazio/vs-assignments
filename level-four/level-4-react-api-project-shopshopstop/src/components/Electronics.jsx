import Item from './Item'
import { IconContext } from 'react-icons'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export default function Electronics (props) {

    const electronicsElements = props.items.map(item => <Item
        key={item.id}
        id={item.id}
        category="electronics"
        name={item.title}
        picture={item.image}
        price={item.price}
        rating={item.rating.rate}
        handleClick={props.handleClick}
        handleCartAdd={props.handleCartAdd}
        ghostCart={props.ghostCart}
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
                    <div className="category-title-text">Electronics</div>
            </div>
            <div className="electronics-wrapper main">
                {props && electronicsElements}
            </div>
        </>
        
    )
}