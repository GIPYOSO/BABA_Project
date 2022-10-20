//import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from 'axios';
import server from './../../config/server.json';
import { useCookies } from "react-cookie";
import {CircularProgress, TextField, Button} from '@mui/material';
import TabMenu from "./../Common/TabMenu/TabMenu";
import { useNavigate } from 'react-router-dom';
import NoticeWriteComponent from './NoticeWriteComponent';

const Create = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate()

    let FILE = useLocation().state;

    const [contentText, setContentText] = useState('');

    const [transformFinishState, setTransformFinishState] = useState(false);

    const [noteData, setNoteData] = useState({ // test data
        user_id: cookies.token.user_id,
        title: '',
        contents: ''
    })

    // 하위 컴포넌트 data setter
    const [memo, setMemo] = useState('')
    const [calender, setCalender] = useState({
        user_id: '',
        title: '',
        date: ''
    })
    const [todo, setTodo] = useState({
        user_id: '',
        todo_title: '',
        date: ''
    })

    // 제목 유효성 체크
    const [error, setError] = useState(false)

    useEffect(() => {
        createFile(FILE); //회의록 생성
        //console.log("쿠키", cookies.token.user_id);
    }, []);

    // vito 토큰 발급
    let getVitoToken = async () => {
        return await axios.get(`${server.url}/record/vito/token`)
            .then(res => {
                return res.data.tokenData.access_token
            })
            .catch(e => {
                console.log(e)
            })
    }

    // 파일 선택 시 전사결과 get
    let createFile = async (FILE) => {
        let formData = new FormData()
        let resultData = [];

        let TOKEN = await getVitoToken()

        formData.append('file', FILE)
        formData.append('token', TOKEN)

        await axios({
            method: 'post',
            url: `${server.url}/record/vito/getResult`,
            data: formData
        })
            .then(res => {
                resultData = res;
                viewResultFile(resultData);
            })
            .catch(e => console.log(e))
    }

    // 응답받은 data를 텍스트로 가공하여 저장
    let viewResultFile = async (rowData) => {
        let text = "";
        let contentData = rowData.data.resData.results.utterances;
        contentData.map((item) => {
            text += `${item.msg}\n`;
        });
        setContentText(text);
        setTransformFinishState(true);
        setNoteData({
            ...noteData,
            contents: text
        })
        return contentText;
    }
    
    // noteData change 될 때 마다 set
    let onChangeData = (e) => {
        setNoteData({
            ...noteData,
            [e.target.name] : e.target.value
        })
        console.log(noteData)
    } 

    // 노트 데이터, 캘린더, 투두 한꺼번에 등록
    let submitNote = async () => {
        let error = false
        if(noteData.title === "") {
            error = true
        }
        setError(error)
        // 자식 컴포넌트에서 받아온 data log
        console.log("부모 컴포넌트 메모: ", memo)        
        console.log("부모 컴포넌트 캘린더: ", calender)        
        console.log("부모 컴포넌트 할일: ", todo)

        // 3개의 request를 변수에 담아줌
        const requestOne = axios.post(`${server.url}/record`, noteData);
        // const requestTwo = axios.post(`${server.url}/calender/add_events`, calender);
        // const requestThree = axios.post(`${server.url}/todo`, todo);
        if (!error) {
            // axios all로 한번에 보내고 결과값 한번에 받음
            axios.all([requestOne]).then(axios.spread((...responses) => {
                const responseOne = responses[0]
                // const responseTwo = responses[1]
                // const responesThree = responses[2]
                console.log("노트 결과", responseOne)
                // console.log("캘린더 결과" ,responseTwo)
                // console.log("투두 결과" ,responesThree)

                // 우선 노트 데이터만 잘 등록 됐을 때 페이지 이동하도록 해놓음
                if(responseOne.data.status) {
                    alert('등록되었습니다.')
                    navigate('/record')
                }
                    // use/access the results 
                })).catch(errors => {
                    console.log(errors)
                })
        }
    }

    // inline style
    const leftBox = {
        float:'left',
        width: '60%'
    }

    const rightBox = {
        float:'right',
        width: '400px'
    }

    const textarea = {
        width: '100%',
        height: '50vh',
        border: 'none',
        resize: 'none'
    }
    return (
        <>
             {
                transformFinishState ?
                    (
                        <>  
                            <div className="detail">
                                <div className="titleWrap">
                                <TextField 
                                id="fullWidth"
                                name="title" 
                                label="제목" 
                                placeholder="제목을 입력하세요." 
                                defaultValue={noteData.title} 
                                onChange={onChangeData} 
                                variant="standard" 
                                fullWidth 
                                error={error}
                                helperText={ error ? ("제목을 입력하세요.") : ("") }
                                />

                                </div>
                                <div className="contentWrap">
                                <div className="clear">
                                    <div className="leftBox">
                                    <NoticeWriteComponent value={noteData} setNoteData={setNoteData}/>
                                    </div>
                                    <div className="rightBox">
                                        <TabMenu noteData={noteData} setNoteData={setNoteData} setMemo={setMemo} setCalender={setCalender} setTodo={setTodo}/>
                                        
                                        <div className="buttonWrap">
                                            <Button variant="contained" onClick={submitNote}>등록</Button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </>
                    )
                    : (
                        <>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '60%',
                                transform: 'translate(-50%, -50%)'
                                }}>
                                <CircularProgress/>
                            </div>
                        </>
                    )
             }

        </>
    );
};

export default Create;