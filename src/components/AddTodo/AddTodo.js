import React, { useState, useEffect } from "react";
import axios from "axios"

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
        <div>
            <input  placeholder={"Ведите заметку:"} onChange={(e) => setInputs({...inputs, title: e.target.value})}/>
            <button  onClick={() => { saveTodo() }}>Save</button>
        </div>
    )
}


export default AddTodo  