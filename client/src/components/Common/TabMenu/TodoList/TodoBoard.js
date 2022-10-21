import { useState } from "react";
import TodoItem from "./TodoItem";
import axios from 'axios'
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

function TodoBoard(props){
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    // const [newTodoList, setNewTodoList] = useState([props.data])
    // useEffect(() => {
    //     console.log(newTodoList)
    // }, [])
    // const deleteItem = async (e, id) =>{
    //     if(e.target.checked) {
    //         return await axios.delete(`http://localhost:8080/todo/remove/${id}`).then(res => {
    //             axios.get(`http://localhost:8080/todo/${cookies.token.user_id}`).then(res2 => {
    //                 let response = res2.data
    //                 console.log("응답된 코드 입니다", response);
    //                 setNewTodoList(response)
    //             }).catch(e => {
    //                 console.log(e)
    //             })
    //         })
    //     }
    // }
    
    const [todo, setTodo] = useState(props.data)
    const deleteItem = async (e, id) =>{
        if(e.target.checked) {
            return await axios.delete(`http://localhost:8080/todo/remove/${id}`)
            // .then(res => {
            //     axios.get(`http://localhost:8080/todo/${cookies.token.user_id}`)
            //     .then(res2 => {
            //         let response = res2.data
            //         console.log("응답된 코드 입니다", response);
            //         setTodo(response)
            //         console.log(props.data)
            //         console.log(todo)
            //     }).catch(e => {
            //         console.log(e)
            //     })    
            // })
        }
    }

    return(
        <div class="todoBoard">
            
            <h2>Todo List</h2>
            {
                props.data.map((item, i)=>(
                <label htmlFor={item._id} key={i}>
                    <div className="todo-item" >
                        <input type="checkbox" id={item._id} onClick={(e) => deleteItem(e, item._id)}/>
                        <span style={{paddingLeft:'10px'}}>{item.content}</span>
                    </div>
                </label>
                ))
               
            }
            
        </div>
    )    
}
export default TodoBoard;