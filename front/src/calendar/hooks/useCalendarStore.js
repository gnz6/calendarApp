import { useSelector, useDispatch } from 'react-redux'
import { setActiveEvent, createEvent, updateEvent, deleteEvent } from '../../redux/calendar/calendarSlice'



export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector(state => state.calendar)

    

    const startSavingEvent = async (calendarEvent) => {

        if (calendarEvent._id) {
            return dispatch(updateEvent({ ...calendarEvent }))
        }
        return dispatch(createEvent({ ...calendarEvent, _id: new Date().getTime() }))
    }

    const setEvent = (calendarEvent) => {
        dispatch(setActiveEvent(calendarEvent))
    }

    const deleteActiveEvent = () => {
        dispatch(deleteEvent())
    }


    return {
        events, activeEvent, hasEventSelected : !!activeEvent,
        setEvent, startSavingEvent, deleteActiveEvent

    }
}
