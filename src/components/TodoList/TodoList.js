import React, { useState } from "react";

function TodoList({todo, setTodo}) {
    const [edit, setEdit] = useState(null)
    const [value, setValue] = useState('')

    function deliteTodo(id) {
        let newTodo = [...todo].filter(item => item.id!=id)
        setTodo(newTodo)
    }

    function editTodo(id, title) {
        setEdit(id)
        setValue(title)
    }

    function saveTodo(id) {
        
        let newTodo = [...todo].map(item => {
            if(item.id == id) {
                item.title = value
            }
            return item
        })
        setTodo(newTodo)
        setEdit(null)
    }

    return(
        <div>
            {
                todo.map(item => (
                    <div key={item.id}> 
                        {
                            edit ==item.id ? 
                            <div>
                                <input onChange={(e)=> setValue(e.target.value)} value={value}/>
                            </div>
                            :
                        <div>{item.title}</div>
                        }

                        {
                        edit ==item.id ? 
                            <div>
                                <button onClick={()=>saveTodo(item.id)}>Saveeee</button>
                            </div>
                            :
                        <div>
                            <button onClick={ () => deliteTodo(item.id)}>delete</button>
                            <button onClick={ () => editTodo(item.id, item.title)}>redaction</button>
                        </div>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default TodoList