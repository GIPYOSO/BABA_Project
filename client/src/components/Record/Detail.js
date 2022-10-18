import { useState, useEffect } from 'react';
import axios from 'axios'
import server from './../../config/server.json'
import {Button} from '@mui/material'
import { useCookies } from "react-cookie";


const Detail = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const [NoteData, setNoteData] = useState({
        user_id : cookies.token.user_id,
        title : "테스트",
        contents : "테스트1 내용입니다",
        file_url : "",
        memo : "이건 메모에요",
        favorites: "",
    });

    const [newData, setNewData] = useState({
      user_id : cookies.token.user_id,
      title : "수정1",
      contents : "수정했습니다",
      file_url : "",
      memo : "수정한 메모에요",
      favorites: "",
  });

    useEffect(() => {
        // console.log(NoteData);
        // getNoteData()

        updateNoteData()
        .then((res) => {
          console.log('응답코드입니다', res);
          setNoteData(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);


    //노트 데이터를 요청하는 함수
    let getNoteData = async () => {
        return await axios.post("http://localhost:8080/record", NoteData , {
          header: {
            accessToken: cookies.token.accessToken,
          },
        });
      };

    let updateNoteData = async () => {

      return await // http://localhost:8080/record/user_id/update
      axios.post(`http://localhost:8080/record/${newData.user_id}/update`,
      newData, {
        headers: {
          accessToken: cookies.token.accessToken
        }

      })
    }



    let getVitoToken = async () => {
        return await axios.get(`${server.url}/record/vito/token`)
                    .then(res => {
                        return res.data.tokenData.access_token
                    })
                    .catch(e => {
                        console.log(e)
                    })
    }

    let handleChangeFile = async (event) => {
        let formData = new FormData()
        
        let TRANSCRIBE_URL = 'https://openapi.vito.ai/v1/transcribe'
        // let TOKEN = await getVitoToken()
        let FILE = event.target.files[0]
        let CONFIG = {"diarization":{"use_verification":false},"use_multi_channel":false,"use_itn":false,"use_disfluency_filter":false,"use_profanity_filter":false,"paragraph_splitter": {"min": 10,"max": 50}}
        formData.append('file', FILE)
        formData.append('config', CONFIG)
        // formData.append('token', TOKEN)
        console.log(formData.get("file"))
        axios({method:'post',
        url:`${server.url}/record/vito/getId`, 
        data:formData}).then(res => console.log(res)).catch(e => console.log(e))
        // await axios({
        //     method: 'post',
        //     url: TRANSCRIBE_URL,
            
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Headers': 'Authorization',
        //         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
        //         'Authorization': `Bearer ${TOKEN}`,
        //         'Content-Type': 'multipart/form-data'
        //     },
            
        //     withCredentials: true, // 쿠키 cors 통신 설정
            
        // })
        // .then(res => console.log(res))
        // .catch(e => console.log(e))
    }

    return (
        <div>
             <input type="file" id="file"  onChange={handleChangeFile} multiple="multiple" />
        </div>
    );
};

export default Detail;