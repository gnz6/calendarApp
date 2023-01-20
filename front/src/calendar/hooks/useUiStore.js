import { useDispatch, useSelector } from "react-redux"

export const useUiStore = () => {

    const dispatch = useDispatch()
    const { isDateModalOpen } = useSelector(state => state.ui)

    return {
        isDateModalOpen
    }

}
