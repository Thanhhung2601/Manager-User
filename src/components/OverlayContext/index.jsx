import React, { createContext, useState } from 'react'
import './styles.scss'

const OverlayContext = createContext()

const OverlayProvider = ({ children }) => {
    const [displayOverlay, setDisplayOverlay] = useState(false)

    return (
        <OverlayContext.Provider value={{ displayOverlay, setDisplayOverlay }}>
            {children}
        </OverlayContext.Provider>
    )
}

export { OverlayProvider, OverlayContext }
