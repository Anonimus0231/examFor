import React, { useState, useEffect} from "react";
import axios from "axios"

function TodoList({ messag, setMessag, inputs, setInputs }) {
    const [edit, setEdit] = useState(null)

    useEffect(() => {
        getPosts()
    }, []) 
    
    async function getPosts(){
        await axios.get("http://localhost:505/item")
        .then(res => setMessag(res.data))
    }

    async function deletePosts(id){
        await axios.delete(`http://localhost:505/item/${id}`)
        .then(getPosts())
    }

    async function setPost(id, obj){
        await axios.patch(`http://localhost:505/item/${id}`, obj)
        .then(getPosts())
    }
    
    function editMessag(id, title) {
        setEdit(id)
        setInputs({...inputs, title: title})
    }

    function savePost(id, title) {
        setPost(id, {title:title})
        getPosts()
    }

    return(
        <div>
            {
                messag?.map(item => (
                <div key={item.id}>
                    {
                        edit ==item.id ? 
                        <div>
                            <input value={inputs.title} onChange={(e) => setInputs({...inputs, title: e.target.value})}/>
                        </div>
                        :
                    <div>{item.title}</div>
                    }
                    {
                        edit ==item.id ? 
                            <div>
                                <button onClick={() => {savePost(item.id, inputs.title)}}>Saveeee</button>
                            </div>
                            :
                        <div>
                            <button onClick={ () => deletePosts(item.id)}>delete</button>
                            <button onClick={ () => {editMessag(item.id, item.title)}}>redaction</button>
                        </div>
                        }
                </div>
                ))
            }
        </div>
    )
}

export default TodoList