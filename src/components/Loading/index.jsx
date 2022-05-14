import React from 'react'
import './styles.scss'

const Loading = () => {
    return (
        <div className="container">
            <div className="spinner">
                <div className="spinner-item"></div>
                <div className="spinner-item"></div>
                <div className="spinner-item"></div>
                <div className="spinner-item"></div>
                <div className="spinner-item"></div>
            </div>
        </div>
    )
}

export default Loading
