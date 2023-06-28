import { IconContext } from 'react-icons'
import { AiFillPropertySafety } from 'react-icons/ai'
import { BiSolidUserPlus } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

export default function Home (props) {
    return (
        <div className="home-wrapper main">
            {props.cartInitialized ? 
                <div className="user-greeting-wrapper">
                    Happy shopping, {props.utilizedUsername}!
                </div> : 
                <div className="cart-initialization-wrapper">
                <form name="cart-initialization" className="cart-initialization" onSubmit={props.handleSubmit}>
                    <button className="add-user">
                        <IconContext.Provider value={{ className: 'react-icons back' }}>
                            <BiSolidUserPlus />
                        </IconContext.Provider>
                    </button>
                    <div className="cart-initialization-package">
                        <div className="cart-initialization-text">Enter a username to initialize/retrieve a cart!</div>
                        <input type="text" placeholder="Username (no spaces)" required className="cart-initialization-input" name="username" value={props.currentUsernameText} onChange={props.handleChange}/>
                    </div>
                </form>
            </div>}
            
            <h1 className="shop-title">THE SHOPSHOP STOP</h1><h1 className="title under">Your ultimate shopping destination</h1>
            <p className="home-text">Amazon who? That's right, we are the best in town and we know it. At <span>THE SHOPSHOP STOP</span>, make yourself at home! Buy anything your heart desires, assuming your heart has desires. We have all the latest tech for back to school and rich individuals who want to feel something. This includes HDDs, SSDs, industrial strength (and industrially priced) graphics cards, bottom of the line CPUs, and much more. We encourage all those who wish to shop to initialize a cart and browse all of our magnificent wares, including clothing for him and her and jewelry, jewelry galore. Just try not to get lost in the beauty of it all.</p>
            <h1 className="title under">Find what you need, when you need it</h1>
            <p className="home-text bottom-para">Our company mantra is as follows: "Be the very best, that no one ever was". Isn't it just perfect? Our intention is to eventually take over the world, one insignificant item after the other. We hope you find what you need with our site, because if not then that sucks a lot. Just call our support personnel and we might pick up the phone. Have a great day, and enjoy the monumental feats of our mediocre company!</p>
        </div>
    )
}