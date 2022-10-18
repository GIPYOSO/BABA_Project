import { useState } from "react";
import { useLocation } from "react-router-dom";
import TabMenu from "./../Common/TabMenu/TabMenu";
import Calendar from "../Common/TabMenu/Calender";
const Create = () => {
  const { state } = useLocation();
  console.log(state);

  const [noteData, setNoteData] = useState({
    title: "test",
    content: "test",
    test: "하하하",
  });

  // inline style
  const leftBox = {
    float: "left",
  };

  const rightBox = {
    float: "right",
    width: "400px",
  };

  return (
    <>
      <div>
        {/* <input name="title" type="text"></input>
        <textarea name="content" id="content" cols="30" rows="10"></textarea> */}
      </div>
      <div style={leftBox}></div>
      <div style={rightBox}>
        <TabMenu noteData={noteData} />
       
      </div>
    </>
  );
};

export default Create;