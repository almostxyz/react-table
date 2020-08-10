import React, { useState, useEffect } from 'react'
import Table from './components/Table'

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

function App() {

    const [data, setData] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        const url = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setData(res)
            })
            .catch(err => { alert('An error occured. Please try to refresh the page') })
    }, [])

    return (
        <div className='App container'>
            <Table data={data} setData={setData} setUser={setUser}/>
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
