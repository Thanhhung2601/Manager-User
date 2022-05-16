import React, { useContext } from 'react'
import './styles.scss'

const Overlay = (props) => {
    console.log(props)
    const handleClick = () => {
        if (props.setDisplayOverlay) props.setDisplayOverlay(false)
        if (props.setShowPopup) props.setShowPopup(false)
        if (props.setShowUserProfile) props.setShowUserProfile(false)
        if (props.setShowNavbar) props.setShowNavbar(false)
    }

    return <div className="overlay" onClick={handleClick}></div>
}

export default Overlay
