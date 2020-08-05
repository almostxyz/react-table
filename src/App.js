import React, { useState, useEffect, useCallback } from 'react'
import Table from './components/Table'
import Pagination from './components/Pagination'

/* 
    Todo:
        [x] Таблица
        
        [x] Сортировка по колонкам

        [x] Поиск, обновлять результаты по нажатию кнопки "Найти"

        [x] Выводить дополнительную информацию по нажатию на строку таблицы

        [x] Пагинация (!!!максимум 50 элементов на страницу!!!)

        [x] Добавление нового юзера
            [x] Над таблицей кнопка "Добавить"
            [x] По нажатию на кнопку "Добавить" появляется форма добавления ряда
            [x] После заполнения всех инпутов активируется кнопка "Добавить в таблицу", вставляет ряд в НАЧАЛО таблицы
*/

const MAX_IN_PAGE = 5

function App() {

    const [data, setData] = useState([])
    const [searchResult, setSearchResult] = useState(null)
    const [users, setUsers] = useState(Array.from(Array(MAX_IN_PAGE), () => 0))
    const [user, setUser] = useState({})

    useEffect(() => {
        const url = 'http://www.filltext.com/?rows=35&id={number|10}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setData(res)
            })
            .catch(err => { alert('An error occured. Please try to refresh the page') })
    }, [])

    const onAddData = (newData) => {
        setData([newData, ...data])
    }

    const getPage = useCallback((page) => {
        const begin = (page - 1) * MAX_IN_PAGE
        const end = page * MAX_IN_PAGE
        let newUsers = searchResult === null ? data.slice(begin, end) : searchResult.slice(begin, end)
        while (newUsers.length < MAX_IN_PAGE) {
            newUsers.push({ animation: false })
        }
        // чтоб не изменялся размер таблицы
        setUsers(newUsers)
    }, [data, searchResult])

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
        setData([...data].sort(sortFn))
        if (searchResult !== null)
            setSearchResult([...searchResult].sort(sortFn))
    }

    const onSearch = (query) => {
        if (query.replace(/ /g, '') === '')
            setSearchResult(null)
        else {
            const result = data.filter((user) =>
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

    return (
        <div className='App container'>
            <Table data={users} setUser={setUser} onSort={onSort} onSearch={onSearch} onAddData={onAddData} />
            {users[0].id !== (null || undefined) ? <Pagination lastPage={searchResult === null ? Math.ceil(data.length / MAX_IN_PAGE) : Math.ceil(searchResult.length / MAX_IN_PAGE)} getPage={getPage} /> : null}
            { // вынести в компонент
                user.id !== (null || undefined) ?
                    <div className='card p-4'>
                        <p>Выбран пользователь <b>{user.firstName} {user.lastName}</b></p>
                        <p>Описание: <textarea value={user.description} readOnly style={{ resize: 'none' }} className='form-control'></textarea> </p>
                        <p>Адрес проживания: <b>{user.address.streetAddress}</b></p>
                        <p>Город: <b>{user.address.city}</b></p>
                        <p>Провинция/штат: <b>{user.address.state}</b></p>
                        <p>Индекс: <b>{user.address.zip}</b></p>
                    </div> : null
            }
        </div>
    );
}

export default App
