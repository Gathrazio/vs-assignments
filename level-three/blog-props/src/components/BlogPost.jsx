import React from 'react'

export default function BlogPost({title, subTitle, author, date}) {
    return (
        <>
            <h2 className="post-title">{title}</h2>
            <h4 className="post-subtitle">{subTitle}</h4>
            <p className="stats-text">Posted by <span className="author">{author}</span> on {date}.</p>
            <hr />
        </>
    )
}