import React, {useState} from "react";
import TodoBoard from "./TodoList/TodoBoard";

import "./../../../css/import.css"

function TodoList(){
    const [inputValue, setInputValue] = useState('')
    const [todoList, setTodoList]=useState([])
    const addItem = () =>{
        console.log("imsddsdsd", inputValue)
        setTodoList([...todoList, inputValue])
    }
    return(
        <main>
            <input value={inputValue} type="text"
            onChange={(event)=>setInputValue(event.target.value)}></input>
            <button onClick={addItem}>추가</button>

            <TodoBoard todoList={todoList} />
        </main>
    )
}

export default TodoList;