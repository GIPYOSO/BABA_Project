import * as React from "react";
import { Component } from "react";
import { useState } from "react";
import axios from "axios";

import styled from "styled-components";
import Memo from "./Memo";
import Calendar from "./Calender";
import Todo from "./todo-list/TodoTotal";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import $ from "jquery";

const TabBox = styled.div`
  max-width: 400px;
  width: 100%;
`;

const TabMenuBox = styled.div`
  width: 100%;
`;

const TabContentBox = styled.div`
  width: 100;
  border: 1px solid ##3e80bd;
`;

const TabBtn = styled.button`
  font-size: 20px;
  color: #3e80bd;
  border: 1px solid #3e80bd;
  cursor: pointer;
  background-color: #fff;
  line-height: 40px;
  width: 33.33%;
`;

const TabSaveBtn = styled.button`
  width: 80px;
`;

let Tabmenu = (props) => {
  const [ChangeMenu, setChangeMenu] = useState("");
  let noteData = props.noteData;
  console.log("tabmenu", props.noteData);
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

  return (
    <TabBox>
      <TabMenuBox>
        <TabBtn
          onClick={() => {
            changeState("memo");
          }}
        >
          {""}메모
        </TabBtn>
        <TabBtn
          onClick={() => {
            changeState("calender");
          }}
        >
          {""}캘린더
        </TabBtn>
        <TabBtn
          onClick={() => {
            changeState("todo");
          }}
        >
          {""}할 일{""}
        </TabBtn>
      </TabMenuBox>
      <TabContentBox>
        {ChangeMenu === "memo" ? (
          <Memo noteData={props.noteData} />
        ) : ChangeMenu === "calender" ? (
          <Calendar />
        ) : ChangeMenu === "todo" ? (
          <Todo />
        ) : (
          <Memo noteData={noteData} />
        )}
      </TabContentBox>
    </TabBox>
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
//                 <li data-tab="note" className="tabBtn active">메모</li>
//                 <li data-tab="calender" className="tabBtn">캘린더</li>
//                 <li data-tab="todo" className="tabBtn">할 일</li>
//             </ul>

//             <section id="note" className="note tabPg active">
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
