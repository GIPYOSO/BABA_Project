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

  // memo의 defaultValue를 위한 변수
  let memo = props.noteData.memo;

  let onChange = (e) => {

    // 실제 noteData set
    props.setNoteData({
      ...props.noteData,
      memo: e.target.value
    })

  };

  return (
    <>
      <form id="note" className="note tabPg active">
        <p>메모</p>
        <p>
          <textarea onChange={onChange} defaultValue={memo}></textarea>
        </p>
      </form>
      {/* <MemoBoard/> */}
    </>
  );
};

export default Memo;
