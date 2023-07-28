import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider.jsx'


export default function Comment (props) {

    const { users } = useContext(UserContext);

    const [commentAuthor, setCommentAuthor] = useState('');

    useEffect(() => {
        const author = users.find(user => user._id === props.author);
        setCommentAuthor(author.username)
    }, [])

    return (
        <div className="comment-wrapper">
            <p className="comment-author">@{commentAuthor}</p>
            <p className="comment-body">{props.body}</p>
        </div>
    )
}