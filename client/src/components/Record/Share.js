import styled from "styled-components";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from 'axios'
import server from './../../config/server.json'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';


const Test = styled.div`
  width: 200px;
  height: 100px;
`;


const Share = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [noteData, setNoteData] = useState([])
 
    const [shareData, setShareData] = useState({
        title : "",
        id : "",
        password : "",
    })

    useEffect(() => {
        //노트 데이터를 요청하는 함수
        let getNoteData = async () => {
            return await axios.get(`${server.url}/record/${cookies.token.user_id}`)
                .then(res => {
                    let response = res.data
                    console.log(res)
                    setNoteData(response)
                }).catch(e => {
                    console.log(e)
                })
        }
        getNoteData()
    }, [])

    console.log("노트 데이터 입니다", noteData)
  return(
    <>
    <Test>
    <div>페이지 입니다</div>
    <div></div>
    </Test>
    </>
  )
   
};
export default Share;
