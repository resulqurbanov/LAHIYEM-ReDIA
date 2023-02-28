import React, { useEffect, useState } from "react";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import "./InfoCard.scss"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../../api/UserRequests.js"
import { logout } from "../../../actions/AuthActions.js";
import ProfileModal from "../ProfileModal/ProfileModal";

const InfoCard = () => {
    const dispatch = useDispatch()
    const params = useParams();
    const [modalOpened, setModalOpened] = useState(false);
    const [profileUser, setProfileUser] = useState({});
    const { user } = useSelector((state) => state.authReducer.authData);
    const profileUserId = params.id;

    const handleLogOut = ()=> {
        dispatch(logout())
      }

    useEffect(() => {
        const fetchProfileUser = async () => {
            if (profileUserId === user._id) {
                setProfileUser(user);
                console.log(user)
            } else {
                console.log("fetching")
                const profileUser = await UserApi.getUser(profileUserId);
                setProfileUser(profileUser);
                console.log(profileUser)
            }
        };
        fetchProfileUser();
    }, [user]);
    return (
        <div className='InfoPart'>
            <div className="BasInfo">
                <h4>Profile info</h4>
                {user._id === profileUserId ? (
                    <div className="BasInfo">
                        <DriveFileRenameOutlineIcon onClick={() => setModalOpened(true)} />
                        <ProfileModal modalOpened={modalOpened}
                            setModalOpened={setModalOpened}    data = {user}/>
                    </div>
                ) : (
                    ""
                )}
            </div>
            <div className="info">
                <span>
                    <b>Status : </b>
                </span>
                <span>{profileUser.relationship}</span>
            </div>
            <div className="info">
                <span>
                    <b>Lives in : </b>
                </span>
                <span>{profileUser.livesin}</span>
            </div>
            <div className="info">
                <span>
                    <b>Works at : </b>
                </span>
                <span>{profileUser.worksAt}</span>
            </div>
            <button className='button logout-button' onClick={handleLogOut}>Log Out</button>
        </div>
    )

}

export default InfoCard