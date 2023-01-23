import "./Modal.css"
import Modal from "react-modal";
import "sweetalert2/dist/sweetalert2.min.css"
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker"
import es from 'date-fns/locale/es';
import { useModal } from "../hooks/useModal";
import { useUiStore } from "../hooks/useUiStore";

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');



export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore()

    const { isOpen, formValues, titleClass, onInputChange, onDateChange, onCloseModal, onSubmit } = useModal()




    return (
        <div onClick={closeDateModal}>
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={closeDateModal}
            style={customStyles}
            className={"modal"}
            overlayClassName={"modal-fondo"}
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker selected={formValues.start} className="form-control" onChange={(e) => onDateChange(e, "start")} dateFormat={"Pp"} showTimeSelect locale={es} timeCaption="Hora" />
                    {/* <input className="form-control" placeholder="Fecha inicio"/> */}

                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker selected={formValues.end} className="form-control" onChange={(e) => onDateChange(e, "end")} dateFormat={"Pp"} minDate={formValues.start} showTimeSelect locale={es} timeCaption="Hora" />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}

                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
        </div>
    )
}
