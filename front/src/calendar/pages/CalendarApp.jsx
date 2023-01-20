import { Navbar } from '../components/Navbar'
import { Calendar } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { addHours } from 'date-fns'
import { localizer, getMessages } from '../helpers/calendarLocalizer'
import { CalendarBox } from '../components/CalendarBox'
import { useState } from 'react'
import { CalendarModal } from '../components/CalendarModal'




const events = [{
  title: "Cumpleaños Jefe",
  notes: "Se sienta en la torta",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: { "_id": 1, name: "Gonzalo" }
}]


export const CalendarApp = () => {


  const [lastView, setLastView]=useState(localStorage.getItem("lastView") ||"week")

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgrounColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white"
    }
    return { style }
  }


  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
  }
  const onSelect = (event) => {
    console.log({ click: event });

  }
  const onViewChange = (event) => {
    localStorage.setItem("lastView", event)
    setLastView(event)
    
  }


  return (
    <>
      <Navbar />

        <Calendar
          culture='es'
          defaultView={lastView}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(100vh - 80px)" }}
          messages={getMessages()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarBox,
          }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChange}
        />

      <CalendarModal/>

    </>
  )
}
