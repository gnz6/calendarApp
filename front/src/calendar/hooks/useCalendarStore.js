import { useSelector, useDispatch } from 'react-redux'
import { setActiveEvent } from '../../redux/calendar/calendarSlice'



export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector(state => state.calendar)

    const onLoadEvents = () => {

    }

    const setEvent = (calendarEvent) => {
        dispatch(setActiveEvent(calendarEvent))
    }

    return {
        events, activeEvent,
        setEvent

    }
}
