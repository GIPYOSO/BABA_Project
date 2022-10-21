import * as React from "react";
import { Component } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styled from "styled-components";
import Memo from "./Memo";
import TodoList from "./Todo";


const TabMenuBox = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
`;

const TabContentBox = styled.div`
  width: 100%;
  border: 1px solid ##3e80bd;
  box-sizing: border-box;
`;

const TabBtn = styled.button`
  font-size: 15px;
  border: 0px none;
  cursor: pointer;
  line-height: 40px;
  margin-top: 67px;
  width: 50%;
  background: #ebebeb;
}
`;

const TabSaveBtn = styled.button`
  width: 80px;
`;

let Tabmenu = (props) => {
  //console.log("tabmenu", props.noteData); 
  
  let noteData = props.noteData;

  const [ChangeMenu, setChangeMenu] = useState("memo");
  
  const [tabMemo, setTabMemo] = useState('')

  let changeState = (name) => {
    setChangeMenu(name);
    return;
  };
  
  let state = (name) => {
    changeState(name);
    switch (name) {
      case "memo":
        return <Memo />;
    }
  };
  
  useEffect(() => {
    console.log(props.noteData.memo)
    // props.setNoteData({
    //   ...props.noteData,
    //   memo: props.noteData.memo
    // })
  }, [])
  return (
    <div className="tabBox">
      <TabMenuBox>
        <TabBtn
          style={ChangeMenu === "memo" ? {fontWeight:'bold', background: '#ebebeb'} : {fontWeight:'normal', background: '#fff'}}
          onClick={() => {
            changeState("memo");
            props.setNoteData({
              ...props.noteData,
              memo: props.noteData.memo
            })
          }}
        >
          {""}메모
        </TabBtn>
        <TabBtn
          style={ChangeMenu === "todo" ? {fontWeight:'bold', background: '#ebebeb'} : {fontWeight:'normal', background: '#fff'}}
          onClick={() => {
            changeState("todo");
          }}
        >
          {""}할 일{""}
        </TabBtn>
      </TabMenuBox>
      <TabContentBox>
        {ChangeMenu === "memo" ? (
          <Memo noteData={props.noteData} setNoteData={props.setNoteData} setMemo={props.setMemo} setTabMemo={setTabMemo}/>
        ) : ChangeMenu === "todo" ? (
          <TodoList setTodo={props.setTodo} />
        ) : (
          <Memo noteData={props.noteData} setNoteData={props.setNoteData} setMemo={props.setMemo} setTabMemo={setTabMemo}/>
        )}
      </TabContentBox>
    </div>
  );
};
export default Tabmenu;

{
  /* <div>
                <button onClick={change}></button>
                {
                    ChangeMenu === false ? <Memo value="기표"/> : <Calendar />
                }
            </div> */
}

// var tabBtn = null;
// var tabPg = null;

// $(document).ready(function(){
//     init();
//     tabpageJS(tabBtn,tabPg);
// });

// function init(){
//     tabBtn = $(".tabBtn");
//     tabPg = $(".tabPg");
// }

// function tabpageJS(tabBtn,tabPg){
//     $(tabBtn).on('click', function(){
//         $(tabBtn).removeClass('active');
//         $(this).addClass('active');

//         $(tabPg).removeClass('active');
//         $('#' + $(this).attr('data-tab')).addClass('active')
//     });
// }

// class tabmenu extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         desc: this.props.data.desc
//       }
//       this.inputFormHandler = this.inputFormHandler.bind(this);
//     }
//     inputFormHandler(e){
//       this.setState({[e.target.name]:e.target.value})
//     }
//     render() {
//       console.log(this.props.data);
//       console.log("tabmenu render");
//       return (
//         <form className="tabmenuBox">
//             <ul className="tabMove">
//                 <li data-tab="memo" className="tabBtn active">메모</li>
//                 <li data-tab="calender" className="tabBtn">캘린더</li>
//                 <li data-tab="todo" className="tabBtn">할 일</li>
//             </ul>

//             <section id="memo" className="memo tabPg active">
//                 <p>메모</p>
//                 <p>
//                   <textarea
//                     name="desc"
//                     placeholder="description"
//                     value={this.state.desc}
//                     onChange={this.inputFormHandler}
//                   ></textarea>
//                 </p>
//             </section>

//             <section id="calender" className="App calendar tabPg">
//                 <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
//             </section>

//             <section id="todo" className="todo tabPg">
//                 <p>할 일
//                 </p>
//             </section>

//             <input type="submit"></input>
//         </form>
//       );
//     }
//   }
