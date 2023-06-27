import Item from './Item'

export default function womensClothing (props) {
    const womensClothingElements = props.items.map(item => <Item
        key={item.id}
        name={item.title}
        picture={item.image}
        price={item.price}
        rating={item.rating.rate}
    />)

    return (
        <div className="womensclothing-wrapper main">
            {props && womensClothingElements}
        </div>
    )
}