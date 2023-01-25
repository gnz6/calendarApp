import { useSelector, useDispatch } from 'react-redux'
import { setActiveEvent, createEvent, updateEvent, deleteEvent, loadEvents } from '../../redux/calendar/calendarSlice'
import calendarApi from "../../config/calendarApi"
import { convertEvents } from '../../helpers/convertEvents'
import Swal from 'sweetalert2'


export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)



    const startSavingEvent = async (calendarEvent) => {
        try {
            //Update
            if (calendarEvent._id) {
                await calendarApi.put(`/calendar/${calendarEvent._id}`, calendarEvent)
                return dispatch(updateEvent({ ...calendarEvent }))
            }
            //Create
            const { data } = await calendarApi.post("/calendar", calendarEvent);
            return dispatch(createEvent({ ...calendarEvent, _id: data._id, user: user }))

        } catch (error) {
            console.log(error);
            Swal.fire("Error al guardar", error.response.data?.message, "error")
        }

    }

    const setEvent = (calendarEvent) => {
        dispatch(setActiveEvent(calendarEvent))
    }

    const deleteActiveEvent = async() => {
        try {
            await calendarApi.delete(`/calendar/${activeEvent._id}`)
            return dispatch(deleteEvent())
            
        } catch (error) {
            Swal.fire("Error","No se pudo eliminar el evento", "error")
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get("/calendar");
            const events = convertEvents(data.data)
            dispatch(loadEvents(events))
        } catch (error) {
            console.log(error);
        }

    }

    return {
        events, activeEvent, hasEventSelected: !!activeEvent,
        setEvent, startSavingEvent, deleteActiveEvent, startLoadingEvents

    }
}
