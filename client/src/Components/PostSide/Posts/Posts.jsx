import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTimelinePosts } from "../../../actions/PostsAction.js";
import Post from "./Post/Post.jsx";
import './Posts.scss'


const Posts = () => {
  const params = useParams()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  if(!posts) return 'No Posts';
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  return (
    <div className="Posts">
    {loading
      ? "Postlar Yuklenir...."
      : posts.map((post, id) => {
          return <Post data={post} key={id} />;
        })}
  </div>
  )
}

export default Posts