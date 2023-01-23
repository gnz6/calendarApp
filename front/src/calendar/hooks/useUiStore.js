import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../../redux/ui/uiSlice"

export const useUiStore = () => {

    const dispatch = useDispatch()
    const { isDateModalOpen } = useSelector(state => state.ui)

    const openDateModal = ()=>{
        dispatch(onOpenDateModal())
    }

    const closeDateModal = ()=>{
        dispatch(onCloseDateModal())
    }

    return {
        isDateModalOpen,

        openDateModal,
        closeDateModal
    }

}
