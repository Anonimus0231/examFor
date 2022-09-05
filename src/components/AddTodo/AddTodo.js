import React, { useState, useEffect } from "react";
import axios from "axios"
import style from "./style_module.css"

function AddTodo({ setMessag, message, inputs, setInputs }) {
  
    useEffect(() => {
        getRequest()
    }, [])
    
    async function getRequest(){
        await axios.get("http://localhost:505/item")
        .then(res => setMessag(res.data))
    }
    
    async function push(obj){
        await axios.post("http://localhost:505/item", obj)
        .then(getRequest())
    }
    function saveTodo() {   
        if(inputs.title !== '') {
            push(inputs)
        }
        else {
            alert("Заполните поле")
        }
        getRequest()
        setInputs({...inputs, title: ''} )
    }

    return (
        <div className="todo">
            <div className="todo__form">
                <input className="todo__input"  placeholder={"Ведите заметку:"} onChange={(e) => setInputs({...inputs, title: e.target.value})}/>
                <button className="todo__button" onClick={() => { saveTodo() }}><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="white" d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"/><path fill="white" d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8Z"/></svg></button>
            </div>
        </div>
    )
}


export default AddTodo  