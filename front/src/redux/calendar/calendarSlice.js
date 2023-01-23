import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvents = [{
    _id: new Date().getTime(),
    title: "Cumpleaños Jefe",
    notes: "Se sienta en la torta",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: { "_id": 1, name: "Gonzalo" }
}]

export const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        events: [
            tempEvents
        ],
        activeEvent: null
    },
    reducers: {
        loadEvents: (state, action) => {
            state.events = action.payload
        },
        setActiveEvent: (state, { payload }) => {
            state.activeEvent = payload
        },
        createEvent:(state, action) =>{
            state.events.push(action.payload)
        }
    }
})


export const { loadEvents, setActiveEvent } = calendarSlice.actions