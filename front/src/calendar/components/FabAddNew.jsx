import React from 'react'
import "./fabs.css"
import { useUiStore } from '../hooks/useUiStore'
import { useCalendarStore } from '../hooks/useCalendarStore'
import { addHours } from 'date-fns'

export const FabAddNew = () => {

    const { openDateModal } = useUiStore()
    const { setEvent } = useCalendarStore()

    const handleNewClick = () => {
        setEvent(
            {
                title: "",
                notes: "",
                start: new Date(),
                end: addHours(new Date(), 2),
                bgColor: "#fafafa",
                user: { "_id": 1, name: "Gonzalo" }
            })

        openDateModal();
    }


    return (
        <button
            className='btn btn-primary fab' onClick={handleNewClick}>
            <i className='fas fa-plus'></i>
        </button>
    )
}
