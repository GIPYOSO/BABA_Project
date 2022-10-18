import { useState, useEffect } from 'react';
import axios from 'axios'
import server from './../../config/server.json'
import {Button} from '@mui/material';
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

    return (
        <div>
        </div>
    );
};

export default Detail;