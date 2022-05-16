import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { actions } from '../../Redux/slices/userSlice'
import Navbar from '../../components/Home/NavBar'
import ContentHome from '../../components/Home/ContentHome'
import './styles.scss'

const HomePage = () => {
    const [showNavbar, setShowNavbar] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)

    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'))
        dispatch(actions.login(userProfile))
    }, [])

    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'))
        if (!userProfile) {
            navigate('/login')
        }
    }, [user])

    return (
        <div className="homePage">
            <Navbar showNavbar={showNavbar} />
            <ContentHome setShowNavbar={setShowNavbar} />
        </div>
    )
}

export default HomePage
