import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import server from "./../../../config/server.json"

const TabSaveBtn = styled.button`
    width: 80px;
`;


let Memo = (props) => {

    const [memotext, setText] = useState({
        text:""
    });


    let memoData = (e) => {
        setText({
            ...memotext,
            [e.target.name] : e.target.value
        })
    }

    let textSubmitBtn = async() => {
        if(memotext.content === ""){
            return
        }

        return await axios.post(server.url + "/", memotext);
    }


    useEffect (() => {
        console.log(memotext);

    } , [])
    
    
    return(
        <>
            <form id="note" className="note tabPg active">
                <p>메모</p>
                <p>
                  <input type="text" onChange={memoData} name="text" id="text"></input>
                </p>
            </form>


            <TabSaveBtn onClick={textSubmitBtn}>
                저장
            </TabSaveBtn>
        </>
    )
}

export default Memo