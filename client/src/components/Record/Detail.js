import { useState } from 'react';
import axios from 'axios'
import server from './../../config/server.json'
import {Button} from '@mui/material'

const Detail = () => {
<<<<<<< Updated upstream

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

    // vito 토큰 발급
=======
>>>>>>> Stashed changes
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
    let handleChangeFile = async (event) => {
      let formData = new FormData()

      let TOKEN = await getVitoToken()
      let FILE = event.target.files[0]
      
      formData.append('file', FILE)
      formData.append('token', TOKEN)

      await axios({
        method:'post',
        url:`${server.url}/record/vito/getResult`, 
        data: formData
      })
        .then(res => console.log(res))
        .catch(e => console.log(e))
    }

    return (
        <div>
             <input type="file" id="file"  onChange={handleChangeFile} multiple="multiple" />
        </div>
    );
};

export default Detail;