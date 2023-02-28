import React from 'react'
import FollowersCard from '../../FollowersCard/FollowersCard';
import LogoSearch from '../../HomeComponents/LogoSearch/LogoSearch';
import ProfileCard from '../ProfileCard/ProfileCard';


import "./ProfileSide.scss"
const ProfileSide = () => {
  return (
    <div className="ProfileSide">
        <LogoSearch/>
        <ProfileCard location="homepage"/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileSide;