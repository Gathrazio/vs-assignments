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
            <p className="home-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error dolorem nemo ut iste quaerat natus molestias magnam incidunt distinctio obcaecati asperiores aspernatur, sequi similique fuga praesentium, placeat porro? Quos, molestiae! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur veniam unde beatae non sed dignissimos, accusamus modi eaque qui, cupiditate numquam repellendus aspernatur amet ullam. Quaerat modi aspernatur ipsam porro. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error dolorem nemo ut iste quaerat natus molestias magnam incidunt distinctio obcaecati asperiores aspernatur, sequi similique fuga praesentium, placeat porro? Quos, molestiae! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur veniam unde beatae non sed dignissimos, accusamus modi eaque qui, cupiditate numquam repellendus aspernatur amet ullam. Quaerat modi aspernatur ipsam porro. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error dolorem nemo ut iste quaerat natus molestias magnam incidunt distinctio obcaecati asperiores aspernatur, sequi similique fuga praesentium, placeat porro? Quos, molestiae!</p>
            <h1 className="title under">Find what you need, when you need it</h1>
            <p className="home-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error dolorem nemo ut iste quaerat natus molestias magnam incidunt distinctio obcaecati asperiores aspernatur, sequi similique fuga praesentium, placeat porro? Quos, molestiae! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur veniam unde beatae non sed dignissimos, accusamus modi eaque qui, cupiditate numquam repellendus aspernatur amet ullam. Quaerat modi aspernatur ipsam porro. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error dolorem nemo ut iste quaerat natus molestias magnam incidunt distinctio obcaecati asperiores aspernatur, sequi similique fuga praesentium, placeat porro? Quos, molestiae! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur veniam unde beatae non sed dignissimos, accusamus modi eaque qui, cupiditate numquam repellendus aspernatur amet ullam. Quaerat modi aspernatur ipsam porro.</p>
        </div>
    )
}