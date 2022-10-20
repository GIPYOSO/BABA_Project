import React from "react";
import TodoItem from "./TodoItem";

function TodoBoard(props){
    console.log(props.data);
    return(
        <div>
            
            <h2>Todo List</h2>
            {
                props.data.map((item)=>(
                <div className="todo-item">
                    {item.content}
                </div>
                ))
               
            }
            
        </div>
    )    
}
export default TodoBoard;