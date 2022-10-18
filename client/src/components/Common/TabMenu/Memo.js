import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import server from "./../../../config/server.json";

const TabSaveBtn = styled.button`
  width: 80px;
`;

let Memo = (props) => {
  const [memotext, setText] = useState("");

  let onChange = (e) => {
    setText(e.target.value);
  };

  let textSubmitBtn = (e) => {

    setText(e.target.value);

    if (memotext === '') {
        alert("메모를 입력해 주세요");
    } else {
        console.log(memotext);
        
    }

  };

  let onReset = () => {
    setText("");
  };


  useEffect(() => {
    console.log(memotext);
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
