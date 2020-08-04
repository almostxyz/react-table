import React, { useState, useEffect, useCallback } from 'react'
import Table from './components/Table'
import Pagination from './components/Pagination'

/* 
    Todo:
        [x] Таблица
        
        [x] Сортировка по колонкам

        [ ] Поиск, обновлять результаты по нажатию кнопки "Найти"

        [x] Выводить дополнительную информацию по нажатию на строку таблицы

        [x] Пагинация (!!!максимум 50 элементов на страницу!!!)

        [ ] Добавление нового юзера
            [ ] Над таблицей кнопка "Добавить"
            [ ] По нажатию на кнопку "Добавить" появляется форма добавления ряда
            [ ] После заполнения всех инпутов активируется кнопка "Добавить в таблицу", вставляет ряд в НАЧАЛО таблицы
*/

const MAX_IN_PAGE = 5

function App() {

    const [data, setData] = useState([])
    const [users, setUsers] = useState(Array.from(Array(MAX_IN_PAGE), () => 0))
    const [user, setUser] = useState({})

    useEffect(() => {
        const url = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setData(res)
            })
            .catch(err => { alert('An error occured. Please try to refresh the page') })
    }, [])

    const getPage = useCallback((page) => {
        const begin = (page - 1) * MAX_IN_PAGE
        const end = page * MAX_IN_PAGE
        let newUsers = data.slice(begin, end)
        while (newUsers.length < MAX_IN_PAGE) {
            newUsers.push({ animation: false })
        }
        // чтоб не изменялся размер таблицы
        setUsers(newUsers)
    }, [data])

    const onSort = (id, ascending) => {
        setData([...data].sort((a, b) => {
            const aProp = a[Object.keys(a)[id]]
            const bProp = b[Object.keys(b)[id]]
            if (aProp > bProp)
                return ascending ? 1 : -1
            if (bProp > aProp)
                return ascending ? -1 : 1
            return 0
        }))
    }

    useEffect(() => {
        getPage(1)
    }, [getPage])

    return (
        <div className='App container'>
            <Table data={users} setUser={setUser} onSort={onSort} />
            {users[0] ? <Pagination lastPage={Math.ceil(data.length / MAX_IN_PAGE)} getPage={getPage} /> : null}
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
