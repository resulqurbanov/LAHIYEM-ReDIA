import React, { useRef, useState } from 'react'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import "./PostShare.scss"
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../../actions/UploadAction.js';

const PostShare = () => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const desc = useRef();
    const loading = useSelector((state) => state.postReducer.uploading);
    const { user } = useSelector((state) => state.authReducer.authData)


    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    };
    const imageRef = useRef();


    const handleUpload = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if (image) {
            const data = new FormData()
            const filename = Date.now() + image.name
            data.append("name", filename)
            data.append("file", image)
            newPost.image = filename;
            console.log(newPost);
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }
        dispatch(uploadPost(newPost))
        resetShare();
    }

    // Postu sifirlama 
    const resetShare = () => {
        setImage(null);
        desc.current.value = "";
    };

    return (
        <div className="SharePart">
            <img src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.jpg"
        } alt="Profile" />
            <div>
                <input type="text"
                    placeholder="What's happening?"
                    required
                    ref={desc} />
                <div className="sendWay">
                    <div className="send" style={{ color: "rgb(101, 215, 40)" }}>
                        <CollectionsOutlinedIcon onClick={() => imageRef.current.click()} />
                        Photo
                    </div>
                    <div className="send" style={{ color: "rgb(149, 0, 179)" }}
                    >
                        <PlayCircleOutlineIcon />
                        Video
                    </div>{""}
                    <div className="send" style={{ color: "rgb(245, 6, 6)" }}>
                        <AddLocationAltOutlinedIcon />
                        Location
                    </div>{""}
                    <div className="send" style={{ color: "rgb(255, 152, 17)" }}>
                        <TodayOutlinedIcon />
                        Shedule
                    </div>
                    <button className='button centerbtn' onClick={handleUpload} disabled={loading}> {loading ? "uploading" : "Share"}</button>
                    <div style={{ display: "none" }}>
                        <input type="file" name='myPhoto' ref={imageRef} onChange={onImageChange} />
                    </div>
                </div>
                {image && (

                    <div className="insPhoto">
                        <DoNotDisturbOnOutlinedIcon onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt="preview" />
                    </div>

                )}
            </div>
        </div>
    )
}

export default PostShare;