import React from 'react'
import BlogPost from "./BlogPost"
import data from "../data"

export default function BlogList() {
    const posts = data.map(post => {
        return (
            <BlogPost 
                title={post.title}
                subTitle={post.subTitle}
                author={post.author}
                date={post.date}
            />
        )
    })
    return (
        <div className="blog-list-container">
            <div className="blog-list">
                {posts}
                <div className="button-container">
                <button className="button">Older Posts →</button>
                </div>
            </div>
        </div>
    )
}