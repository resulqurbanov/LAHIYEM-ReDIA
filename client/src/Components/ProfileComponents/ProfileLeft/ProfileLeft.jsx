import React from 'react'
import FollowersCard from '../../FollowersCard/FollowersCard'
import LogoSearch from '../../HomeComponents/LogoSearch/LogoSearch'
import InfoCard from '../Profilinfo/InfoCard'
import "./ProfileLeft.scss"

const ProfileLeft = () => {
  return (
   <div className="ProfilePart">
       <LogoSearch/>
       <InfoCard/>
       <FollowersCard/>
   </div>
  )
}

export default ProfileLeft;