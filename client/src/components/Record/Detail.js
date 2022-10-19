import { useState, useEffect } from 'react';
import axios from 'axios'
import server from './../../config/server.json'
import { Button } from '@mui/material';
import { useCookies } from "react-cookie";
import { useLocation } from 'react-router-dom';
import { jsPDF } from "jspdf";
import _fonts from "../../assets/fonts/gulim";
import moment from "moment";
import NoticeWriteComponent from './NoticeWriteComponent';
import TabMenu from "./../Common/TabMenu/TabMenu";

const Detail = () => {
  // console.log(useLocation().state) // list에서 받아 온 detail data 

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

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

    // list에서 onclick으로 전달해준 state를 상세 데이터로 셋팅
    const [noteData, setNoteData] = useState(useLocation().state);

  // useEffect(() => {
  //   console.log();
  //   getNoteData()

  //   updateNoteData()
  //   .then((res) => {
  //     console.log('응답코드입니다', res);
  //     setNoteData(res.data.user);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }, noteData);

  let updateNoteData = async () => {
    console.log(noteData)
    // return await // http://localhost:8080/record/user_id/update
    //   axios.post(`http://localhost:8080/record/${noteData.user_id}/update`, noteData)
    //       .then(res => {
    //         console.log(res)
    //       }).catch(e => {
    //         console.log(e)
    //       })
  }

  let downloadBtn = (noteData) => {
    //console.log("노트데이터", noteData);
    var doc = new jsPDF("p", "mm", "a4");

    doc.addFileToVFS('malgun.ttf', _fonts.font);  //_fonts 변수는 Base64 형태로 변환된 내용입니다.
    doc.addFont('malgun.ttf', 'malgun', 'normal');
    doc.setFont('malgun');

    doc.line(10, 19, 200, 19); // 선그리기(시작x, 시작y, 종료x, 종료y)
    doc.text(10, 15, noteData.title); // 글씨입력(시작x, 시작y, 내용)
    doc.text(10, 30, noteData.contents); // 글씨입력(시작x, 시작y, 내용)

    doc.save(`${moment(noteData.createdAt).format("YYYY-MM-DD")}_${noteData.title}.pdf`);  //결과 출력
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

  return (
    <div class="wrap">
      <input type="text" name="title" defaultValue={noteData.title} />
      <p>생성 날짜: {moment(noteData.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>
      <p>수정 날짜: {moment(noteData.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</p>
      <div style={leftBox}>
        <NoticeWriteComponent value={noteData} setNoteData={setNoteData}/>
      </div>
      <div style={rightBox}>
          <TabMenu noteData={noteData} setNoteData={setNoteData} setMemo={setMemo} setCalender={setCalender} setTodo={setTodo}/>
      </div>
      {/* <textarea name="contents" defaultValue={noteData.contents} /> */}
      <button name="download" onClick={() => {
        downloadBtn(noteData);
      }}>PDF 다운로드</button>
      <button onClick={updateNoteData}>저장</button>
    </div>
  );
};

export default Detail;