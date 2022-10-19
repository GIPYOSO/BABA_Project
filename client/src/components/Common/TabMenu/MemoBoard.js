import * as React from "react";
import styled from "styled-components";

const MemoUl = styled.ul`
    list-style: none; width: 100%;
`; 
const MemoList = styled.li`
    border: 1px solid #3e80bd; height: 50px; font-size: 14px;
`; 

function MemoBoard(){
    
    return(
        <>
            <MemoUl>
                <MemoList>test</MemoList>
            </MemoUl>
        </>
    )
}

export default MemoBoard;