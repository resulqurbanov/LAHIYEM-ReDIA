import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./MiniChat.scss"
import { getUser } from "../../../api/UserRequests.js";

const MiniChat = ({ data, currentUser, online }) => {

  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()

  useEffect(()=> {

    const userId = data.members.find((id)=>id!==currentUser)
    const getUserData = async ()=> {
      try
      {
          const {data} =await getUser(userId)
         setUserData(data)
         dispatch({type:"SAVE_USER", data:data})
      }
      catch(error)
      {
        console.log(error)
      }
    }

    getUserData();
  }, [])
  return (
    <>
      <div className="follower conversation">
        <div className="mesaj_his">
          {online && <div className="online-dot"></div>}
          
          <img
            src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.jpg"}
            alt="Profile"
            className="followerImage"
          />
          <div className="name" >
            <span>  { userData?.firstname} {userData?.lastname}</span>
            <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiniChat;