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
        createEvent: (state, { payload }) => {
            state.events.push(payload)
            state.activeEvent = null
        },
        updateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event._id === payload._id) {
                    return payload
                }
                return event
            })
        },
        deleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent._id)
                state.activeEvent = null

            }
        }
    }
})


export const { loadEvents, setActiveEvent, createEvent, updateEvent, deleteEvent } = calendarSlice.actions