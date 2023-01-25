import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";



export const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        events: [],
        activeEvent: null,
        isLoading: true,

    },
    reducers: {
        loadEvents: (state, {payload}) => {
            state.isLoading = false
            payload.forEach(event => {
                const exists = state.events.some(dbEvent => dbEvent._id === event._id)
                if(!exists){
                    state.events.push( event )
                }
            });
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
        },
        onLogoutCalendar:(state) =>{
            state.isLoading = true 
            state.events = []
            state. activeEvent = null
        }
    }
})


export const { loadEvents, setActiveEvent, createEvent, updateEvent, deleteEvent, onLogoutCalendar } = calendarSlice.actions