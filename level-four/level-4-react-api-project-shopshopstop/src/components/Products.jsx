import maleClothing from '../assets/male-clothing.jpg'
import femaleClothing from '../assets/female-clothing.webp'
import jewelry from '../assets/jewelry.jpeg'
import electronics from '../assets/electronics.jpg'
import CategorySnapshot from './CategorySnapshot'

import { Navigate, useNavigate } from 'react-router-dom';

export default function Products () {

    const navigate = useNavigate();

    return (
        <div className="products-wrapper main">
            <CategorySnapshot 
                picture={maleClothing}
                name="Men's Clothing"
                blurb="Find all the latest styles for him."
                handleClick={() => navigate("/mensclothing")}
            />
            <CategorySnapshot 
                picture={femaleClothing}
                name="Women's Clothing"
                blurb="Find all the latest styles for her."
                handleClick={() => navigate("/womensclothing")}
            />
            <CategorySnapshot 
                picture={jewelry}
                name="Jewelry"
                blurb="Everyone loves shiny things!"
                handleClick={() => navigate("/jewelry")}
            />
            <CategorySnapshot 
                picture={electronics}
                name="Electronics"
                blurb="Everyone loves sparky things!"
                handleClick={() => navigate("/electronics")}
            />
        </div>
    )
}