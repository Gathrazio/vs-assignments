import Item from './Item'

export default function Electronics (props) {

    const electronicsElements = props.items.map(item => <Item
        key={item.id}
        name={item.title}
        picture={item.image}
        price={item.price}
        rating={item.rating.rate}
    />)

    return (
        <div className="electronics-wrapper main">
            {props && electronicsElements}
        </div>
    )
}