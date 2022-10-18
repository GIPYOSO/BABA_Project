import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import events from "events";

export default function Calendar() {
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