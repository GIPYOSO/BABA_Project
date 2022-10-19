import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import server from "./../../../config/server.json";
import { useCookies } from "react-cookie";
import MemoBoard from "./MemoBoard";

const TabSaveBtn = styled.button`
  width: 80px;
`;
let Memo = (props) => {
  const [cookies, setCookie, removeCooke] = useCookies(["token"]);

  let propsData = props.noteData;

  // const [noteData, setNoteData] = useState({
  //   user_id: cookies.token.user_id,
  //   title: propsData.title,
  //   contents: propsData.contents,
  //   memo: "",
  // });
  let onChange = (e) => {
    props.setMemo(e.target.value) // props로 받아온 부모 컴포넌트 setter에 메모가 바뀔 때 마다 data를 저장해줌
    // setNoteData({
    //   ...noteData,
    //   memo: e.target.value,
    // });
  };

  let submitBtn = async (e) => {
    
    // await axios
    //   .post(`${server.url}/record`, noteData)
    //   .then((res) => console.log("등록성공", res));
  };

  useEffect(() => {
    // console.log(memotext);
  }, []);

  return (
    <>
      <form id="note" className="note tabPg active">
        <p>메모</p>
        <p>
          <input onChange={onChange}></input>
        </p>
      </form>

      <TabSaveBtn onClick={submitBtn}>저장</TabSaveBtn>
      {/* <div>{memotext}</div> */}
      <MemoBoard/>
    </>
  );
};

export default Memo;
