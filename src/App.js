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

        [ ] Добавление нового юзера
            [ ] Над таблицей кнопка "Добавить"
            [ ] По нажатию на кнопку "Добавить" появляется форма добавления ряда
            [ ] После заполнения всех инпутов активируется кнопка "Добавить в таблицу", вставляет ряд в НАЧАЛО таблицы
*/

const MAX_IN_PAGE = 50

function App() {

    const [data, setData] = useState([])
    const [searchResult, setSearchResult] = useState(null)
    const [users, setUsers] = useState(Array.from(Array(MAX_IN_PAGE), () => 0))
    const [user, setUser] = useState({})

    useEffect(() => {
        const url = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setData(res)
            })
            .catch(err => { alert('An error occured. Please try to refresh the page') })
    }, [])

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
            <Table data={users} setUser={setUser} onSort={onSort} onSearch={onSearch} />
            {users[0].id ? <Pagination lastPage={searchResult === null ? Math.ceil(data.length / MAX_IN_PAGE) : Math.ceil(searchResult.length / MAX_IN_PAGE)} getPage={getPage} /> : null}
            { // вынести в компонент
                user.id ?
                    <div>
                        <div>first name: {user.firstName}</div>
                        <div>id: {user.id}</div>
                        <div>last name: {user.lastName}</div>
                        <div>address: {`${user.address.streetAddress}, ${user.address.city}, ${user.address.state}, ${user.address.zip}`}</div>
                        <div>description: {user.description}</div>
                    </div> : null
            }
        </div>
    );
}

export default App
