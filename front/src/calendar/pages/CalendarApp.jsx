import { Navbar } from '../components/Navbar'
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { addHours, parse, startOfWeek, getDay, format } from 'date-fns'

import enUS from 'date-fns/locale/en-US'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const events = [{
  title: "Cumpleaños Jefe",
  notes: "Se sienta en la torta",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: { "_id": 1, name: "Gonzalo" }
}]


export const CalendarApp = () => {
  return (
    <>
      <Navbar />

      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(100vh - 80px)" }}
        />
      </div>


    </>
  )
}
