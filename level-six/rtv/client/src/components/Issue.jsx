import { useState, useContext } from 'react'
import { IssueContext } from '../context/IssueProvider.jsx'
import Comment from './Comment'


export default function Issue (props) {

    const { comments } = useContext(IssueContext);

    const relevantComments = comments.filter(comment => comment.issue === props._id)
    
    const [commentsToggle, setCommentsToggle] = useState(false);
    const [addCommentToggle, setAddCommentToggle] = useState(false);
    const [commentInput, setCommentInput] = useState('');

    function handleChange (e) {
        const { value } = e.target;
        setCommentInput(value)
    }

    function handlePost (e) {
        e.preventDefault()
        console.log("tried to post")
    }

    return (
        <div className="issue-wrapper">
            <h3 className="issue-title">{props.title}</h3>
            <p className="issue-description">{props.description}</p>
            <form onSubmit={handlePost}>
                <div className="comment-button-wrapper">
                { relevantComments.length != 0 && 
            <button type="button" className="comment-toggle-button" onClick={() => setCommentsToggle(prev => !prev)}>{commentsToggle ? "Hide" : "Show"} Comment{relevantComments.length === 1 ? '' : 's'}</button>
            } 
            <button type="button" onClick={() => setAddCommentToggle(prev => !prev)} className="comment-toggle-button comment-add-button">{addCommentToggle ? 'Cancel' : 'Add Comment'}</button>
            { addCommentToggle && <button onClick={handlePost} className="comment-toggle-button">Post</button> }
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