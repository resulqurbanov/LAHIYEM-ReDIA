import React from 'react'
import { useState } from 'react';
import "./RightSide.scss"
import ShareModal from './ShareModal/ShareModal';
import { useSelector } from 'react-redux';
import MiniIcon from './MiniIcon/MiniIcon';
import TrendCard from './TrendCard/TrendCard';

const RightSide = () => {

  // paylasim modali
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);

  return (
    <div className='RightPart'>
   <MiniIcon/>
      <TrendCard />
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  )
}

export default RightSide;