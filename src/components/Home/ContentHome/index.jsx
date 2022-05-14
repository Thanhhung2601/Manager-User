import React, { useContext, useState } from 'react'
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actions } from '../../../Redux/slices/userSlice'
import Table from './Table/Table'
import { OverlayContext } from '../../OverlayContext'

const ContentHome = () => {
    const [showUserProfile, setShowUserProfile] = useState(false)
    const userProfile = useSelector((state) => state.user.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { displayOverlay, setDisplayOverlay } = useContext(OverlayContext)

    const handleClick = () => {
        setShowUserProfile(!showUserProfile)
        setDisplayOverlay(!displayOverlay)
    }

    const handleLogout = () => {
        dispatch(actions.logOut())
        localStorage.setItem('userProfile', JSON.stringify(null))
        navigate('/')
    }
    console.log(userProfile)
    return (
        <div className="contentHome">
            <div className="header-ct-page">
                <div className="ct-left">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className="ct-right">
                    <div className="ct-right-icon">
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faMessage} />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faBell} />
                            </li>
                        </ul>
                    </div>
                    <div className="ct-right-profile">
                        <p onClick={handleClick}>
                            Hi , admin
                            <FontAwesomeIcon icon={faChevronDown} />
                        </p>
                        <div
                            className={
                                showUserProfile
                                    ? 'user-profile active'
                                    : 'user-profile '
                            }
                        >
                            <h2>User Profile</h2>
                            <div className="user-profile-description">
                                <div className="user-profile-img">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <div className="user-profile-infor">
                                    <p>Administrator</p>
                                    <p>{userProfile?.email}</p>
                                </div>
                            </div>
                            <div className="btn-logout" onClick={handleLogout}>
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Table />
        </div>
    )
}

export default ContentHome
