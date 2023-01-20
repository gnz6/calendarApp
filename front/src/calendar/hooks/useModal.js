import { addHours } from "date-fns"
import { useMemo, useState } from "react"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"


export const useModal = () => {

    const [isOpen, setIsOpen] = useState(true)
    const [formSubmitted, setFormSubmitted] = useState(false)


    const [formValues, setFormValues] = useState({
        title: "",
        notes: "",
        start: new Date(),
        end: addHours(new Date(), 2)
    })


    const titleClass = useMemo(()=>{
        if(!formSubmitted ) return ""
        return (formValues.title.length > 0) ? "is-valid" : "is-invalid"
    },[formValues.title, formSubmitted])


    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = (e, changing) => {
        setFormValues({
            ...formValues,
            [changing]: e
        })
    }


    const onCloseModal = () => {
        setIsOpen(false)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true)

        const difference = differenceInSeconds(formValues.end , formValues.start)
        if (difference <= 0 || isNaN(difference)){
            Swal.fire("Fechas incorrectas", "Revisar fechas ingrasadas", "error")
            return
        }
        if (formValues.title.length < 1) return
    }
  return {
    isOpen, formValues, formSubmitted, titleClass, onInputChange, onDateChange, onCloseModal, onSubmit
  }
}
