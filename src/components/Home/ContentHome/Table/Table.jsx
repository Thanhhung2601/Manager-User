import React, { useEffect, useState, useContext } from 'react'
import './styles.scss'
import * as XLSX from 'xlsx'
import { useDispatch, useSelector } from 'react-redux'
import {
    AcUpdateUser,
    fetchUserTable,
    AcDeleteUser,
} from '../../../../Redux/slices/userTableSlice'
import Loading from '../../../Loading'
import PopupHandleUser from '../../../PopupHandleUser'
import Overlay from '../../../Overlay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowDownUpAcrossLine,
    faFileExport,
    faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { actions } from '../../../../Redux/slices/userTableSlice'

const headers = [
    { label: 'Id', key: 'id' },
    { label: 'First Name', key: 'first_name' },
    { label: 'Last Name', key: 'last_name' },
    { label: 'Email', key: 'email' },
]

const Table = () => {
    const [currentPagination, setcurrentPagination] = useState(1)
    const [displayOverlay, setDisplayOverlay] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [handle, setHandle] = useState({ task: '', data: null })
    const dispatch = useDispatch()
    const tableSelector = useSelector((state) => state.table)
    const [orderByFirstName, setOrderByfirstName] = useState(false)
    const [csvReport, setCsvReport] = useState([])
    const [items, setItems] = useState([])

    useEffect(() => {
        if (tableSelector.table?.data.length > 0) {
            setCsvReport(tableSelector.table?.data)
        }
    }, [tableSelector])

    useEffect(() => {
        dispatch(fetchUserTable(currentPagination))
    }, [currentPagination])

    const handleClick = (item) => {
        setcurrentPagination(item + 1)
    }

    const handleAddNew = () => {
        setShowPopup(true)
        setDisplayOverlay(true)
        setHandle({ ...handle, task: 'Craete New User' })
    }

    const handleUpdate = (id) => {
        const user = tableSelector.table.data.find((item) => item.id === id)
        setHandle({ task: 'Update User', data: user })
        setShowPopup(true)
        setDisplayOverlay(true)
    }

    const handleDeleteUser = (id) => {
        dispatch(AcDeleteUser(id))
    }

    const handleOrder = () => {
        setOrderByfirstName(!orderByFirstName)
    }

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(file)

            fileReader.onload = (e) => {
                const bufferArray = e.target.result

                const wb = XLSX.read(bufferArray, { type: 'buffer' })

                const wsname = wb.SheetNames[0]

                const ws = wb.Sheets[wsname]

                const data = XLSX.utils.sheet_to_json(ws)

                resolve(data)
            }

            fileReader.onerror = (error) => {
                reject(error)
            }
        })

        promise.then((d) => {
            setItems(d)
        })
    }

    const handleExportFile = () => {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(csvReport)
        XLSX.utils.book_append_sheet(wb, ws, 'Mysheet1')
        XLSX.writeFile(wb, 'Report.xlsx')
    }

    useEffect(() => {
        if (orderByFirstName) {
            dispatch(actions.orderByFirstName('ASC'))
        } else {
            dispatch(actions.orderByFirstName('DESC'))
        }
    }, [orderByFirstName])

    return (
        <div className="table">
            <div className="btn-handle-ct">
                <div className="btn-handle import-csv">
                    <span>
                        <FontAwesomeIcon icon={faArrowUpFromBracket} />
                        <input
                            id="files"
                            style={{ display: 'none' }}
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files[0]
                                readExcel(file)
                            }}
                        />
                        <label htmlFor="files" className="btn">
                            Import File Excel
                        </label>
                    </span>
                </div>
                <div className="btn-handle export-csv">
                    <span onClick={handleExportFile}>
                        <FontAwesomeIcon icon={faFileExport} /> Export File
                        Excel
                    </span>
                </div>
                <div className="btn-handle add">
                    <span onClick={handleAddNew}>Add New User </span>
                </div>
            </div>
            {tableSelector.loading ? (
                <Loading />
            ) : (
                tableSelector.table?.data.map.length > 0 && (
                    <table>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>
                                    First Name{' '}
                                    <FontAwesomeIcon
                                        cursor={'pointer'}
                                        icon={faArrowDownUpAcrossLine}
                                        onClick={handleOrder}
                                    />
                                </th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th className="action-cl">Action</th>
                            </tr>
                            {items
                                .concat(tableSelector.table?.data)
                                .filter((item) =>
                                    (
                                        item.id +
                                        item?.email +
                                        item?.first_name?.toLowerCase() +
                                        item?.last_name?.toLowerCase()
                                    ).includes(
                                        tableSelector.search.toLowerCase()
                                    )
                                )
                                .map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>
                                                {item.name || item.first_name}
                                            </td>
                                            <td>{item.last_name}</td>
                                            <td>{item.email}</td>
                                            <td className="btn-action">
                                                <span
                                                    className="btn-update"
                                                    onClick={() =>
                                                        handleUpdate(item.id)
                                                    }
                                                >
                                                    Update
                                                </span>
                                                <span
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        handleDeleteUser(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
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
            <PopupHandleUser
                display={showPopup}
                setShowPopup={setShowPopup}
                handle={handle}
                setDisplayOverlay={setDisplayOverlay}
            />
            {displayOverlay && (
                <Overlay
                    setDisplayOverlay={setDisplayOverlay}
                    setShowPopup={setShowPopup}
                />
            )}
        </div>
    )
}

export default Table
