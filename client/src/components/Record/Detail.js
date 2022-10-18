import { useState, useEffect } from 'react';
import axios from 'axios'
import server from './../../config/server.json'
import {Button} from '@mui/material';
import { useCookies } from "react-cookie";
import { useLocation } from 'react-router-dom';

const Detail = () => {
    // console.log(useLocation().state) // list에서 받아 온 detail data 

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    
    const [noteData, setNoteData] = useState(useLocation().state);

    const [newData, setNewData] = useState({
      user_id : cookies.token.user_id,
      title : "수정1",
      contents : "수정했습니다",
      file_url : "",
      memo : "수정한 메모에요",
      favorites: "",
  });

    useEffect(() => {
        console.log();
        // getNoteData()

        // updateNoteData()
        // .then((res) => {
        //   console.log('응답코드입니다', res);
        //   setNoteData(res.data.user);
        // })
        // .catch((err) => {
        //   console.log(err);
        // });
    }, []);


    //노트 데이터를 요청하는 함수
    let getNoteData = async () => {
        return await axios.post("http://localhost:8080/record", noteData , {
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
          <input type="text" name="title" defaultValue={noteData.title} />
          <textarea name="contents" defaultValue={noteData.contents} />
        </div>
    );
};

export default Detail;