import React, { useEffect, useState, useContext } from 'react'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserTable } from '../../../../Redux/slices/userTableSlice'
import Loading from '../../../Loading'
import PopupHandleUser from '../../../PopupHandleUser'
import { OverlayContext } from '../../../OverlayContext'

const Table = () => {
    const [currentPagination, setcurrentPagination] = useState(1)
    const [showPopup, setShowPopup] = useState(false)
    const dispatch = useDispatch()
    const tableSelector = useSelector((state) => state.table)
    const { displayOverlay, setDisplayOverlay } = useContext(OverlayContext)

    useEffect(() => {
        dispatch(fetchUserTable(currentPagination))
    }, [currentPagination])
    console.log(currentPagination)

    const handleClick = (item) => {
        setcurrentPagination(item + 1)
    }

    const handleAddNew = () => {
        setShowPopup(true)
        setDisplayOverlay(true)
    }

    return (
        <div className="table">
            <div className="btn-add">
                <span onClick={handleAddNew}>Add New User </span>
            </div>
            {tableSelector.loading ? (
                <Loading />
            ) : (
                tableSelector.table?.data.map.length > 0 && (
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                        {tableSelector.table?.data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.email}</td>
                                    <td className="btn-action">
                                        <span className="btn-update">
                                            Update
                                        </span>
                                        <span className="btn-delete">
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                )
            )}
            <div className="pagination">
                {tableSelector.table?.total_pages &&
                    Array.from(
                        Array(tableSelector.table?.total_pages).keys()
                    ).map((item) => {
                        return (
                            <span
                                className={
                                    currentPagination === item + 1
                                        ? 'active'
                                        : ''
                                }
                                key={item}
                                onClick={() => handleClick(item)}
                            >
                                {item + 1}
                            </span>
                        )
                    })}
            </div>
            <PopupHandleUser display={showPopup} setShowPopup={setShowPopup} />
        </div>
    )
}

export default Table
