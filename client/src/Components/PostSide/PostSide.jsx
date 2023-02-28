import React from 'react'
import "./PostSide.scss"
import PostShare from './PostShare/PostShare'
import Posts from './Posts/Posts'

const PostSide = () => {
    return (
     <div className="PostSide">
         <PostShare/>
         <Posts/>
     </div>
    )
  }
  
  export default PostSide;