import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { OverlayContext } from '../OverlayContext'
import './styles.scss'
import { AcCreateNewUser } from '../../Redux/slices/userSlice'
import { useDispatch } from 'react-redux'

const PopupHandleUser = ({ display, setShowPopup }) => {
    const [userInfor, setUserInfor] = useState({ name: '', job: '' })
    const { displayOverlay, setDisplayOverlay } = useContext(OverlayContext)
    const dispatch = useDispatch()

    const handleClick = () => {
        setShowPopup(false)
        setDisplayOverlay(false)
    }
    const handleAddNew = () => {
        dispatch(AcCreateNewUser(userInfor))
    }
    console.log(userInfor)

    return (
        <div className={display ? 'PopupHandleUser show' : 'PopupHandleUser '}>
            <form action="">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        value={userInfor.name}
                        onChange={(event) =>
                            setUserInfor({
                                ...userInfor,
                                name: event.target.value,
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Job"
                        value={userInfor.job}
                        onChange={(event) =>
                            setUserInfor({
                                ...userInfor,
                                job: event.target.value,
                            })
                        }
                    />
                </div>
                <div className="btn-createNewUser" onClick={handleAddNew}>
                    Create New User
                </div>
            </form>
            <div className="btn-close" onClick={handleClick}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
    )
}

export default PopupHandleUser
