import React, { useState } from 'react'
import './styles.scss'
import ElementItem from '../ElementItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGear } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    const [active, setActive] = useState(1)

    return (
        <div className="navbar">
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
    )
}

export default Navbar
