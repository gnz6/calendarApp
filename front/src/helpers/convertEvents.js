import { parseISO } from "date-fns"

export const convertEvents = ( events= [] )=>{

    return events.map( ev =>{
        ev.start = parseISO( ev.start )
        ev.end = parseISO( ev.end )
        return ev 
    })
}