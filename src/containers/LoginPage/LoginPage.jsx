import React, { useState } from 'react'
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../Redux/slices/userSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [valueInput, setValueInput] = useState({
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignIn = () => {
        dispatch(fetchUser({ valueInput, navigate }))
        console.log('navigate ....')
    }

    return (
        <div className="login-outer">
            <div className="login-inner">
                <div className="login-content-left">
                    <form action="" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <span>Email</span>
                            <div className="form-input">
                                <input
                                    type="email"
                                    name="Email"
                                    placeholder="Email"
                                    value={valueInput.email}
                                    onChange={(event) =>
                                        setValueInput({
                                            ...valueInput,
                                            email: event.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <span>Password</span>
                            <div className="form-input">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="Password"
                                    placeholder="Password"
                                    value={valueInput.password}
                                    onChange={(event) =>
                                        setValueInput({
                                            ...valueInput,
                                            password: event.target.value,
                                        })
                                    }
                                />
                                <div
                                    className="form-input-icon"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEye : faEyeSlash}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="button">
                            <button
                                className={
                                    !valueInput.email || !valueInput.password
                                        ? 'btn-signIn btn-disable'
                                        : 'btn-signIn'
                                }
                                onClick={handleSignIn}
                            >
                                Sign In
                            </button>
                            <span>Sign Up</span>
                        </div>
                    </form>
                </div>
                <div className="login-content-right">
                    <img src="Untitled.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default LoginPage
