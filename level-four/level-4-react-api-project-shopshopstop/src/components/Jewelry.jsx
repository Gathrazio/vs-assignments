import Item from './Item'

export default function Jewelry (props) {

    const jewelryElements = props.items.map(item => <Item
        key={item.id}
        name={item.title}
        picture={item.image}
        price={item.price}
        rating={item.rating.rate}
        handleClick={props.handleClick}
    />)

    return (
        <div className="jewelry-wrapper main">
            {props && jewelryElements}
        </div>
    )
}