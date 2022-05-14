import React from 'react'
import './styles.scss'

const ElementItem = ({ id, Icon, text, active, setActive }) => {
    return (
        <div
            className={
                Icon
                    ? active === id
                        ? 'elementItem Icon active'
                        : 'elementItem Icon'
                    : 'elementItem'
            }
            onClick={() => setActive(id)}
        >
            {Icon && <div className="elementItem-Icon">{Icon}</div>}
            <div
                className={Icon ? 'elementItem-text Icon' : 'elementItem-text'}
            >
                {text}
            </div>
        </div>
    )
}

export default ElementItem
