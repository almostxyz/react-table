import React, { useState } from 'react'

const Search = props => {

    const [query, setQuery] = useState('')

    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    return (
        <div className='form-group form-row col-6 mt-4'>
            <div className='col'>
                <input
                    className='form-control'
                    type='text'
                    placeholder='Поиск...'
                    value={query}
                    onChange={handleChange}
                >

                </input>
            </div>
            <div className='col'>
                <button className='btn btn-success' type='submit' onClick={() => props.onSearch(query)}>Найти</button>
            </div>
        </div>
    )
}

export default Search