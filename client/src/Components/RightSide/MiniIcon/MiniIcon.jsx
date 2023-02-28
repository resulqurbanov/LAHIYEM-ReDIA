import React from 'react'
import "./MiniIcon.scss"
import { Link } from 'react-router-dom';
import OtherHousesRoundedIcon from '@mui/icons-material/OtherHousesRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { useSelector } from 'react-redux';

const MiniIcon = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <div className="miniNav">
    <Link to="../home"> <OtherHousesRoundedIcon /></Link>
    <Link  to={`/profile/${user._id}`}> <AccountCircleOutlinedIcon /></Link>
    <Link to="../home">  <SettingsOutlinedIcon /></Link>
    <Link to="../chat"> <TextsmsOutlinedIcon /></Link>
  </div>
  )
}

export default MiniIcon