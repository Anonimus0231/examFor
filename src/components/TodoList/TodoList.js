import React, { useState, useEffect} from "react";
import axios from "axios"
import style from "./style_module.css"

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
        setEdit(null)
    }

    return(
        <div>
            {
                messag?.map(item => (
                <div className="todo__cont-btn" key={item.id}>
                    {
                        edit ==item.id ? 
                        <div>
                            <input className="todos__input" value={inputs.title} onChange={(e) => setInputs({...inputs, title: e.target.value})}/>
                        </div>
                        :
                    <div>{item.title}</div>
                    }
                    {
                        edit ==item.id ? 
                            <div>
                                <svg onClick={() => {savePost(item.id, inputs.title);}} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#91910d" d="M5 21h14a2 2 0 0 0 2-2V8l-5-5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zM7 5h4v2h2V5h2v4H7V5zm0 8h10v6H7v-6z"/></svg>
                            </div>
                            :
                        <div>
                            <svg className="todo__svg-btn" onClick={ () => deletePosts(item.id)} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path  d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9M7 6h10v13H7V6m2 2v9h2V8H9m4 0v9h2V8h-2Z"/></svg>
                            
                            <svg onClick={ () => {editMessag(item.id, item.title)}} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="-2 -2 24 24"><path fill="#91910d" d="m5.72 14.456l1.761-.508l10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635l-.52 1.82zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.901.901 0 0 1-1.11-.623a.915.915 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635h3.592z"/></svg>
                        </div>
                        }
                </div>
                ))
            }
        </div>
    )
}

export default TodoList