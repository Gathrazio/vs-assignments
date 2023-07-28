import { useState, useContext } from 'react'
import { IssueContext } from '../context/IssueProvider.jsx'
import Comment from './Comment'
import renderDate from '../dateRenderer.js'
import axios from 'axios';
import { IconContext } from "react-icons";
import { AiOutlineLike, AiOutlineDislike, AiFillDislike, AiFillLike } from 'react-icons/ai'

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default function Issue (props) {

    const { comments, addComment } = useContext(IssueContext);

    const relevantComments = comments.filter(comment => comment.issue === props._id)
    
    const [commentsToggle, setCommentsToggle] = useState(false);
    const [addCommentToggle, setAddCommentToggle] = useState(false);
    const [likeToggle, setLikeToggle] = useState(false);
    const [dislikeToggle, setDislikeToggle] = useState(false);
    const [commentInput, setCommentInput] = useState('');

    function handleChange (e) {
        const { value } = e.target;
        setCommentInput(value)
    }

    function handlePost (e) {
        e.preventDefault()
        userAxios.post(`/api/protected/comments`, {
            body: commentInput,
            issue: props._id
        })
            .then(res => addComment(res.data))
            .catch(err => console.log(err))
        setCommentInput('')
    }

    function handleLikeToggle () {
        if (dislikeToggle) {
            setDislikeToggle(prev => !prev)
        }
        setLikeToggle(prev => !prev)
    }

    function handleDislikeToggle () {
        if (likeToggle) {
            setLikeToggle(prev => !prev)
        }
        setDislikeToggle(prev => !prev)
    }



    return (
        <div className="issue-wrapper">  
            <div className="issue-title-line">
                <p className="date"><b>@{JSON.parse(localStorage.getItem("user")).username}</b> &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; <em>{renderDate(props.createdAt)}</em></p>
                <h3 className="issue-title">{props.title}</h3>
            </div>
            <p className="issue-description">{props.description}</p>
            <form onSubmit={handlePost}>
                <div className="comment-button-likes-wrapper">
                <div className="comment-button-wrapper">
                { relevantComments.length != 0 && 
            <button type="button" className="comment-toggle-button" onClick={() => setCommentsToggle(prev => !prev)}>{commentsToggle ? "Hide" : "Show"} Comment{relevantComments.length === 1 ? '' : 's'}</button>
            } 
            <button type="button" onClick={() => setAddCommentToggle(prev => !prev)} className="comment-toggle-button comment-add-button">{addCommentToggle ? 'Cancel' : 'Add Comment'}</button>
            { addCommentToggle && <button className="comment-toggle-button">Post</button> }
            </div>
            <div className="likes-block">
            <IconContext.Provider value={{ className: 'react-icons' }}>
                
                <div className="like-dislike-wrapper">
                    <div>5</div>
                    <div onClick={handleLikeToggle} className="like-wrapper">
                        { likeToggle ? 
                        <AiFillLike />
                        :
                        <AiOutlineLike />
                        }
                        
                    </div>
                    <div>3</div>
                    <div onClick={handleDislikeToggle} className="dislike-wrapper">
                    { dislikeToggle ? 
                        <AiFillDislike />
                        :
                        <AiOutlineDislike />
                        }
                    </div>
                </div>
            </IconContext.Provider>
            </div>
            </div>
            { addCommentToggle && <textarea onChange={handleChange} value={commentInput} className="comment-input" placeholder="Say something..." required></textarea>}
            </form>
            
            
            
            {commentsToggle &&
            <div>
                {
                    relevantComments.map(comment => <Comment key={comment._id} {...comment} />)
                }
            </div>
            }
        </div>
    )
}