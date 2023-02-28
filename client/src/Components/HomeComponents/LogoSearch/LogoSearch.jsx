import React from 'react'
import { Search } from '@mui/icons-material'
import "./LogoSearch.scss"

const LogoSearch = () => {
  return (
    <div className="logo">
      <img src="https://www.pngkey.com/png/full/380-3809630_shop-r-letter-png-logo.png" alt="" />
      <div className="search">
        <input type="text" placeholder='#Explore' />
        <div className="s-icon">
          <Search />
        </div>
      </div>
    </div>
  )
}

export default LogoSearch;