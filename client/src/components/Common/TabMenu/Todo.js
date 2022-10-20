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

    useEffect(()=>{
        console.log(inputValue)
        console.log("skskskssk", todoList)
    },[inputValue]);

    
    const addItem = async () =>{
        return await axios.post("http://localhost:8080/todo/write", {
            user_id: cookies.token.user_id,
            content: inputValue,
            date: ""
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
            <input defaultValue={inputValue} type="text" name="content" id="content"
            onChange={(e)=>{setInputValue(e.target.value)}}></input>
            <button type="button" onClick={inserIetm}>추가</button>

            <TodoBoard todoList={todoList} data={newTodoList}  />
        </form>
    )
}

export default TodoList;