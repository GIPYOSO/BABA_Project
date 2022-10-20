import { useEffect, useState } from "react";

// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import googleCalendarPlugin from '@fullcalendar/google-calendar';


import { useCookies } from 'react-cookie'


  export default function Calendar(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [calender, setCalender] = useState({
        user_id: cookies.token.user_id,
        title: '캘린더 테스트',
        date: '2020-10-18'
    })

    useEffect(() => { // useEffect 사용 안하면 무한루프, useEffect 기본값 지정 필수 **
        props.setCalender(calender) // props로 받아온 부모 컴포넌트 setter에 data를 저장해줌
    }, [])

    // Apikey는 환경 변수를 이용해 숨겼다
      const apiKey = process.env.REACT_APP_CAL_API_KEY;
    
      return (
        <div className="cal-container">
          <FullCalendar
            plugins={[dayGridPlugin, googleCalendarPlugin]}
            initialView="dayGridMonth"
            googleCalendarApiKey={apiKey}
            events={{
              googleCalendarId: 'eunbeann@gmail.com',
            }}
            eventDisplay={'block'}
            eventTextColor={'#FFF'}
            eventColor={'#F2921D'}
            height={'660px'}
            Toolbar
          />
        </div>
      );
    }