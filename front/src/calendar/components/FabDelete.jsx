import React from 'react'
import "./fabs.css"
import { useUiStore } from '../hooks/useUiStore'
import { useCalendarStore } from '../hooks/useCalendarStore'
import { addHours } from 'date-fns'

export const FabDelete = () => {

    const { deleteActiveEvent, hasEventSelected } = useCalendarStore()

    const handleDelete = () => {
        deleteActiveEvent()
    }

    return (
        <button
            className='btn btn-danger fab-danger' 
            onClick={handleDelete}
            style={{display : hasEventSelected ? "" : "none"}}
            >
            <i className='fas fa-trash-alt'></i>
        </button>
    )
}
