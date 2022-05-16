import React, { useState } from 'react'
import './styles.scss'
import ElementItem from '../ElementItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGear } from '@fortawesome/free-solid-svg-icons'
import Bounce from 'react-reveal/Bounce'
const Navbar = ({ showNavbar }) => {
    const [active, setActive] = useState(1)

    return (
        <Bounce left>
            <div className={showNavbar ? 'navbar show' : 'navbar'}>
                <div className="navbar-logo">
                    <img src="man.png" alt="" />
                </div>
                <ElementItem text="DASHBOARDS" />
                <ElementItem
                    id={1}
                    Icon={<FontAwesomeIcon icon={faUserGear} />}
                    text="User"
                    active={active}
                    setActive={setActive}
                />
                <ElementItem
                    id={2}
                    Icon={<FontAwesomeIcon icon={faUserGear} />}
                    text="Admin"
                    active={active}
                    setActive={setActive}
                />
            </div>
        </Bounce>
    )
}

export default Navbar
