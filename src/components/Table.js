import React, { useState, useEffect, useCallback } from 'react'
import { Skeleton } from '@material-ui/lab'

import Pagination from './Pagination'
import Search from './Search'
import Modal from 'react-bootstrap/Modal'
import AddForm from './AddForm'

import './table.css'

const MAX_IN_PAGE = 50

const Table = (props) => {

    const [searchResult, setSearchResult] = useState(null)
    const [users, setUsers] = useState(Array.from(Array(MAX_IN_PAGE), () => 0))
    const [sortBy, setSortBy] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)

    const onAddData = (newData) => {
        props.setData([newData, ...props.data])
    }

    const getPage = useCallback((page) => {
        const begin = (page - 1) * MAX_IN_PAGE
        const end = page * MAX_IN_PAGE
        let newUsers = searchResult === null ? props.data.slice(begin, end) : searchResult.slice(begin, end)
        while (newUsers.length < MAX_IN_PAGE) {
            newUsers.push({ animation: false })
        }
        // чтоб не изменялся размер таблицы
        setUsers(newUsers)
    }, [props.data, searchResult])

    const onSort = (id, ascending) => {
        const sortFn = (a, b) => {
            const aProp = a[Object.keys(a)[id]]
            const bProp = b[Object.keys(b)[id]]
            if (aProp > bProp)
                return ascending ? 1 : -1
            if (bProp > aProp)
                return ascending ? -1 : 1
            return 0
        }
        props.setData([...props.data].sort(sortFn))
        if (searchResult !== null)
            setSearchResult([...searchResult].sort(sortFn))
    }

    const onSearch = (query) => {
        if (query.replace(/ /g, '') === '')
            setSearchResult(null)
        else {
            const result = props.data.filter((user) =>
                user.id.toString().toLowerCase().includes(query.toLowerCase()) ||
                user.firstName.toLowerCase().includes(query.toLowerCase()) ||
                user.lastName.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase()) ||
                user.phone.toLowerCase().includes(query.toLowerCase())
            )
            setSearchResult(result)
        }
    }

    useEffect(() => {
        getPage(1)
    }, [getPage])

    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const onHeadClick = (id) => {
        const newSortBy = {
            id,
            ascending: sortBy.id === id ? !sortBy.ascending : true
        }
        onSort(id, newSortBy.ascending)

        setSortBy(newSortBy)
    }

    const handleAddData = (data) => {
        setSortBy({})
        onAddData(data)
    }

    return (
        <React.Fragment>
            <div className='container form-row d-flex mt-2'>
                <button
                    className='btn btn-success mr-auto'
                    onClick={handleModal}
                >
                    Добавить
                </button>
                <Search onSearch={onSearch} />
            </div>
            <Modal show={isModalOpen} onHide={handleModal} dialogClassName='addFormModal'>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление нового ряда</Modal.Title>
                </Modal.Header>
                <Modal.Body>{<AddForm onAddData={handleAddData} />}</Modal.Body>
            </Modal>
            <table className='table table-striped col-12 border p-3 mt-3'>
                <thead>
                    <tr className='d-flex user-select-none'>
                        <th className='col-2' onClick={() => onHeadClick(0)}>Id {sortBy.id === 0 ? sortBy.ascending ? '▲' : '▼' : null}</th>
                        <th className='col-2' onClick={() => onHeadClick(1)}>Name {sortBy.id === 1 ? sortBy.ascending ? '▲' : '▼' : null}</th>
                        <th className='col-2' onClick={() => onHeadClick(2)}>Last Name {sortBy.id === 2 ? sortBy.ascending ? '▲' : '▼' : null}</th>
                        <th className='col-3' onClick={() => onHeadClick(3)}>Email {sortBy.id === 3 ? sortBy.ascending ? '▲' : '▼' : null}</th>
                        <th className='col-3' onClick={() => onHeadClick(4)}>Phone {sortBy.id === 4 ? sortBy.ascending ? '▲' : '▼' : null}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, idx) =>
                            <tr key={idx} className='d-flex' onClick={() => {
                                if (user.id !== (null || undefined)) props.setUser(user)
                            }}>
                                <td className='col-2'>
                                    {user.id !== (null || undefined) ? user.id : <Skeleton animation={user.animation} />}
                                </td>
                                <td className='col-2'>
                                    {user.firstName !== (null || undefined) ? user.firstName : <Skeleton animation={user.animation} />}
                                </td>
                                <td className='col-2'>
                                    {user.lastName !== (null || undefined) ? user.lastName : <Skeleton animation={user.animation} />}
                                </td>

                                <td className='col-3'>
                                    {user.email !== (null || undefined) ? user.email : <Skeleton animation={user.animation} />}
                                </td>
                                <td className='col-3'>
                                    {user.phone !== (null || undefined) ? user.phone : <Skeleton animation={user.animation} />}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            {users[0].id !== (null || undefined) ? <Pagination lastPage={searchResult === null ? Math.ceil(props.data.length / MAX_IN_PAGE) : Math.ceil(searchResult.length / MAX_IN_PAGE)} getPage={getPage} /> : null}
        </React.Fragment>
    )
}

export default Table