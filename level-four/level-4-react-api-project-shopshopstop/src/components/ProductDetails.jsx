import { useParams } from "react-router-dom"
import { IconContext } from 'react-icons'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export default function ProductDetails (props) {

    const {productId} = useParams();
    let thisProduct;
    if (props.data.length > 19) {
        thisProduct = props.data.find(product => {
        return product.id === Number(productId);
    })}

    const navigate = useNavigate();
    const displayCondition = Boolean(props.data.length > 19);

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
                    <div className="category-title-text">Item Details</div>
            </div>
            <div className="productdetails-wrapper partition">
                <div className="productdetails-wrapper-interior">
                    <div className="pd-title-wrapper">
                        <img src={displayCondition && thisProduct.image} className="item-pic" />
                        <h1 className="pd-title">{displayCondition && thisProduct.title}</h1>
                        <p className="pd-description">{displayCondition && thisProduct.description}</p>
                        <p className="pd-price">Current Price: ${displayCondition && thisProduct.price}</p>
                        <p className="pd-rating">Average rating: {displayCondition && thisProduct.rating.rate} out of 5, from a total of {displayCondition && thisProduct.rating.count} reviews.</p>
                        <div className="cart-interface-wrapper">
                            <button className="add-cart-button pd-button">Add to Cart</button>
                            <div className="quantity-input-wrapper">
                                <div className="quantity">
                                    Quantity:
                                </div>
                                <input className="quantity-input pd-input" type="number" min="0" step="1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}