import React from 'react'
import { useSelector } from 'react-redux';
import "./ProfileCard.scss"
import { Link } from "react-router-dom";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='ProfileCard'>
      <div className="ProfilImages">
        <img src={
          user.coverPicture
            ? serverPublic + user.coverPicture
            : serverPublic + "defaultCover.jpg"
        } alt="CoverImage" />
        <img src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.jpg"
        }
          alt="ProfileImage" />

      </div>
      <div className="ProfilName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt ? user.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="followers">
        <hr />
        <div className='ortadiv'>

          <div className="follow">
            <span>{
              posts.filter((post) => post.userId === user._id).length
            }</span>
            <span>Posts</span>
          </div>
          <div className="xett"></div>

          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="xett"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>



        </div>
        <hr />
      </div>
      {location === "profilePage" ? (
        ""
      ) : (
        <span className='profnav'>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  )
}

export default ProfileCard;