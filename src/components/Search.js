import React, { useState } from 'react'

const Search = props => {

    const [query, setQuery] = useState('')

    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.onSearch(query)
    }

    return (
        <form className='form-row col-4'>
            <div className='col-9'>
                <input
                    className='form-control'
                    type='text'
                    placeholder='Поиск...'
                    value={query}
                    onChange={handleChange}
                >

                </input>
            </div>
            <div className='col-3'>
                <button className='btn btn-info' type='submit' onClick={handleSubmit}>Найти</button>
            </div>
        </form>
    )
}

export default Search