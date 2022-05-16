import React, { useContext, useState } from 'react'
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import {
    faChevronDown,
    faUser,
    faBars,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actions } from '../../../Redux/slices/userSlice'
import { actions as actionsTable } from '../../../Redux/slices/userTableSlice'
import Table from './Table/Table'
import Overlay from '../../Overlay'

const ContentHome = ({ setShowNavbar }) => {
    const [showUserProfile, setShowUserProfile] = useState(false)
    const [valueSearch, setSearchValue] = useState('')
    const [displayOverlay, setDisplayOverlay] = useState(false)
    const userProfile = useSelector((state) => state.user.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
        setShowUserProfile(true)
        setDisplayOverlay(true)
    }

    const handleLogout = () => {
        dispatch(actions.logOut())
        localStorage.setItem('userProfile', JSON.stringify(null))
        navigate('/')
    }

    const handleInput = (e) => {
        setSearchValue(e.target.value)
        dispatch(actionsTable.searchUserById(e.target.value))
    }

    const handleClickBars = () => {
        setShowNavbar(true)
        setDisplayOverlay(true)
    }

    return (
        <div className="contentHome">
            <div className="header-ct-page">
                <div className="icon-bars" onClick={handleClickBars}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <div className="ct-left">
                    <input
                        type="text"
                        placeholder="Search"
                        value={valueSearch}
                        onChange={handleInput}
                    />
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
            {displayOverlay && (
                <Overlay
                    setDisplayOverlay={setDisplayOverlay}
                    setShowUserProfile={setShowUserProfile}
                    setShowNavbar={setShowNavbar}
                />
            )}
        </div>
    )
}

export default ContentHome
