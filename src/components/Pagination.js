import React, { useState, useEffect } from 'react'

const Pagination = props => {

    const [page, setPage] = useState(1)

    const changePage = value => {
        setPage(value)
        props.getPage(value)
    }

    const buttons = Array.from(Array(props.lastPage), () => 0)

    useEffect(() => {
        setPage(1)
    }, [props.getPage])

    return (
        <div className='container text-center'>
            <button
                className='btn btn-info text-white'
                disabled={page === 1}
                onClick={() => {
                    changePage(page - 1)
                }}
            >
                {'<'}
            </button>
            <div className="btn-group btn-group-toggle m-4" data-toggle="buttons">
                {
                    buttons.map((el, idx) =>
                        <label
                            className={`btn btn-outline-info ${page === idx + 1 ? ' active' : null}`}
                            key={idx + 1}>
                            <input  
                                type="radio"
                                name="pages"
                                id={idx + 1}
                                autoComplete="off"
                                checked={page === idx + 1}
                                onChange={() => {
                                    changePage(idx + 1)
                                }}
                            />
                            {idx + 1}
                        </label>
                    )
                }
            </div>
            <button
                className='btn btn-info text-white'
                disabled={page === props.lastPage}
                onClick={() => {
                    changePage(page + 1)
                }}>
                {'>'}
            </button>
        </div>
    )
}

export default Pagination