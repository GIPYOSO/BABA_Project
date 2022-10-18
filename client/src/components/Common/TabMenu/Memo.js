import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import server from "./../../../config/server.json";
import { useCookies } from 'react-cookie';

const TabSaveBtn = styled.button`
  width: 80px;
`;

let Memo = (props) => {
  const [cookies, setCookie, removeCooke] = useCookies(['token'])

  const [memotext, setText] = useState("");

  let propsData = props.noteData;

  const [noteData, setNoteData] = useState({
    user_id: cookies.token.user_id,
    title: propsData.title, 
    contents: propsData.title,
    memo: memotext
  });

  console.log("memo", props.noteData)

  let onChange = (e) => {
    setText(e.target.value);
  };

  let textSubmitBtn = async (e) => {

    setText(e.target.value);

    if (memotext === '') {
        alert("메모를 입력해 주세요");
    } else {
        console.log(memotext);
        await axios.post(`${server.url}/record`, noteData)
        .then(res => console.log("등록성공", res))
    }

  };

  let onReset = () => {
    setText("");
  };


  useEffect(() => {
    // console.log(memotext);
  }, []);

  return (
    <>
      <form id="note" className="note tabPg active">
        <p>메모</p>
        <p>
          <input onChange={onChange} value={memotext}></input>
        </p>
      </form>

      <TabSaveBtn onClick={textSubmitBtn}>저장</TabSaveBtn>
      <div>{memotext}</div>
    </>
  );
};

export default Memo;
