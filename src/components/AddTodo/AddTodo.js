import React, { useState } from "react";
import {v4 as uuid} from 'uuid'

function AddTodo({todo, setTodo}) {

    const [value, setValue] = useState('')

    function saveTodo() {
        if(value !== '') {
            setTodo(
                [...todo, { 
                    id: Math.random(),
                    title: value,
                    status: true,
                }]
            )
            setValue('')
        }
        else {
            alert("Заполните поле")
        }
    }

    return (
        <div>
            <input required  placeholder="Введите задачу:" value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={saveTodo}>Save</button>
        </div>
    )
}


export default AddTodo  