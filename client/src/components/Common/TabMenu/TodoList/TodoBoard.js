import React from "react";
import TodoItem from "./TodoItem" 

function TodoBoard(props){
    console.log("todoBoard",props.todoList)
    return(
        <div>
            <h2>Todo List</h2>
            {
                props.todoList.map((item)=><TodoItem item={item}/>)
            }
        </div>
    )    
}
export default TodoBoard;