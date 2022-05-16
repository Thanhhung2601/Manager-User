import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'
import {
    AcCreateNewUser,
    AcUpdateUser,
} from '../../Redux/slices/userTableSlice'
import { useDispatch } from 'react-redux'

const PopupHandleUser = ({
    display,
    setShowPopup,
    handle,
    setDisplayOverlay,
}) => {
    const [userInfor, setUserInfor] = useState({ name: '', job: '' })
    const dispatch = useDispatch()
    const handleClick = () => {
        setShowPopup(false)
        setDisplayOverlay(false)
    }
    const btnHandle = () => {
        if (handle.task === 'Craete New User') {
            dispatch(AcCreateNewUser(userInfor))
            setUserInfor({ name: '', job: '' })
            setShowPopup(false)
            setDisplayOverlay(false)
        }
        if (handle.task === 'Update User') {
            dispatch(
                AcUpdateUser({
                    ...handle.data,
                    name: userInfor.name,
                    job: userInfor.job,
                })
            )
            setShowPopup(false)
            setDisplayOverlay(false)
        }
    }

    useEffect(() => {
        if (handle.task === 'Update User') {
            if (handle.data.name) {
                setUserInfor(handle.data)
            } else {
                setUserInfor({
                    ...handle.data,
                    name: handle.data.first_name,
                    job: '',
                })
            }
        }
        if (handle.task === 'Craete New User') {
            setUserInfor({ name: '', job: '' })
        }
    }, [display])

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
                <div className="btn-createNewUser" onClick={btnHandle}>
                    {handle.task}
                </div>
            </form>
            <div className="btn-close" onClick={handleClick}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
    )
}

export default PopupHandleUser
