import Item from './Item'

export default function MensClothing (props) {
    const mensClothingElements = props.items.map(item => <Item
        key={item.id}
        name={item.title}
        picture={item.image}
        price={item.price}
        rating={item.rating.rate}
    />)

    return (
        <div className="mensclothing-wrapper main">
            {props && mensClothingElements}
        </div>
    )
}