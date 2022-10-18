//import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import server from './../../config/server.json';
import { useCookies } from "react-cookie";
import {CircularProgress} from '@mui/material';

const Create = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    let FILE = useLocation().state;
    const [contentText, setContentText] = useState('');
    const [transformFinishState, setTransformFinishState] = useState(false);

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
        //console.log("text 데이터: ", text);
        return contentText;
    }

    let saveFileData = async () => {

    }


    return (
        <>
             {
                transformFinishState ?
                    (
                        <>
                            <div>헤드라인</div>
                            <div style={{ whiteSpace: "pre-wrap" }}>
                                {contentText}
                            </div>
                            <button>저장</button>
                        </>
                    )
                    : (<CircularProgress />)
             }

        </>
    );
};

export default Create;