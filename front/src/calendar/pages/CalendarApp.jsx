import { Navbar } from '../components/Navbar'
import { Calendar } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { localizer, getMessages } from '../helpers/calendarLocalizer'
import { CalendarBox } from '../components/CalendarBox'
import { useState } from 'react'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '../hooks/useUiStore'
import { useCalendarStore } from '../hooks/useCalendarStore'
import { FabAddNew } from '../components/FabAddNew'



export const CalendarApp = () => {
  
  const { events, setEvent } = useCalendarStore()

  const { openDateModal } = useUiStore()
  const [lastView, setLastView]=useState(localStorage.getItem("lastView") || "week")

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
    openDateModal()
  }



  const onSelect = (event) => {
    setEvent(event)
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
    
       < CalendarModal/>
          <FabAddNew/>

    </>
  )
}
