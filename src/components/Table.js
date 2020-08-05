import React, { useState } from 'react'
import Search from './Search'
import { Skeleton } from '@material-ui/lab'

const Table = (props) => {

    const [sortBy, setSortBy] = useState({})

    const onHeadClick = (id) => {
        const newSortBy = {
            id,
            ascending: sortBy.id === id ? !sortBy.ascending : true
        }
        props.onSort(id, newSortBy.ascending)

        setSortBy(newSortBy)
    }

    return (
        <React.Fragment>
            <Search onSearch={props.onSearch} />
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
                        props.data.map((user, idx) =>
                            <tr key={idx} className='d-flex' onClick={() => {
                                if (user.id) props.setUser(user)
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
        </React.Fragment>
    )
}

export default Table