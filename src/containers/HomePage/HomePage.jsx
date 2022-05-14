import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { actions } from '../../Redux/slices/userSlice'
import Navbar from '../../components/Home/NavBar'
import ContentHome from '../../components/Home/ContentHome'
import './styles.scss'

const HomePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)

    console.log(user)
    console.log('homePage render')

    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'))
        dispatch(actions.login(userProfile))
    }, [])

    useEffect(() => {
        console.log('again rerender')
        const userProfile = JSON.parse(localStorage.getItem('userProfile'))
        console.log(userProfile)
        if (!userProfile) {
            navigate('/login')
        }
    }, [user])

    return (
        <div className="homePage">
            <Navbar />
            <ContentHome />
        </div>
    )
}

export default HomePage
