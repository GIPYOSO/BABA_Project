import React, {useState, useEffect, useRef} from "react";
// const { Router } = require("express");
// const router = Router();
import axios from 'axios';
import { useCookies } from "react-cookie";
import TodoBoard from "./TodoList/TodoBoard";
import "./../../../css/import.css";

function TodoList(){
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [todoList, setTodoList] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [newTodoList, setNewTodoList]  = useState([]);

    useEffect(() => {
        getTodoData()
    }, [])

    useEffect(()=>{
        console.log(inputValue)
        console.log("skskskssk", todoList)
    },[inputValue]);

    
    const addItem = async () =>{
        return await axios.post("http://localhost:8080/todo/write", {
            user_id: cookies.token.user_id,
            content: inputValue,
            date: ""
        }).then(res => {
            axios.get(`http://localhost:8080/todo/${cookies.token.user_id}`).then(res2 => {
                let response = res2.data
                console.log("응답된 코드 입니다", response);
                setNewTodoList(response)
            }).catch(e => {
                console.log(e)
            })
        })
    }

    let inserIetm = () => {
        addItem()
        getTodoData()
    }

    let getTodoData = async () => {
        return await axios.get(`http://localhost:8080/todo/${cookies.token.user_id}`)
            .then(res => {
                let response = res.data
                console.log("응답된 코드 입니다", response);
                setNewTodoList(response)
            }).catch(e => {
                console.log(e)
            })
    }

    // console.log("뉴 투두" , newTodoList);


    return(
        <form id="data">
            <input defaultValue={inputValue} type="text" name="content" id="content" className="todoInput"
            onChange={(e)=>{setInputValue(e.target.value)}}></input>
            <button type="button" className="todoButton" onClick={inserIetm}>저장</button>
            <div className="todoListBox">
                <TodoBoard todoList={todoList} data={newTodoList}  />
            </div>
        </form>
    )
}

export default TodoList;