import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
// import events from "events";

import { useCookies } from 'react-cookie'

let Calendar = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [calender, setCalender] = useState({
        user_id: cookies.token.user_id,
        title: '캘린더 테스트',
        date: '2020-10-18'
    })

    useEffect(() => { // useEffect 사용 안하면 무한루프, useEffect 기본값 지정 필수 **
        props.setCalender(calender) // props로 받아온 부모 컴포넌트 setter에 data를 저장해줌
    }, [])

    const events = [{ title: "today's event", date: new Date() }];

    return (
      <div className="App" >
        <FullCalendar id='calendar'
          defaultView="dayGridMonth"
          header={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          plugins={[dayGridPlugin, timeGridPlugin]}
          events={events}
        />
      </div>
    );
  }

  export default Calendar;