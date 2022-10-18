import { useEffect, useState } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

import { useCookies } from 'react-cookie'

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-x: auto;
`;

function TodoList(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    const [todoList, setTodoList] = useState({
        user_id: cookies.token.user_id,
        todo_title: '투두 테스트',
        date: '2020-10-18'
    })

    useEffect(() => { // useEffect 사용 안하면 무한루프, useEffect 기본값 지정 필수 **
        props.setTodo(todoList) // props로 받아온 부모 컴포넌트 setter에 data를 저장해줌
    }, [])
    
    return (
        <TodoListBlock>
            <TodoItem text="프로젝트 생성하기" done={true} />
            <TodoItem text="컴포넌트 스타일링 하기" done={true} />
            <TodoItem text="Context 만들기" done={false} />
            <TodoItem text="기능 구현하기" done={false} />
        </TodoListBlock>
    );
}

export default TodoList;