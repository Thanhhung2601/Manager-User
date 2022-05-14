import React, { useContext } from 'react'
import { OverlayContext } from '..'
import './styles.scss'

const Overlay = () => {
    const { displayOverlay, setDisplayOverlay } = useContext(OverlayContext)

    return <div className={displayOverlay ? 'overlay show' : 'overlay'}></div>
}

export default Overlay
