import { useSelector, useDispatch } from "react-redux"
import calendarApi from "../../config/calendarApi"
import { checking, clearErrorMessage, onLogin, onLogout } from "../../redux/auth/authSlice"
import { onLogoutCalendar } from "../../redux/calendar/calendarSlice"

export const useAuthStore = () => {

    const { status, user, errorMessages } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {
        dispatch(checking())
        try {
            const { data } = await calendarApi.post("/auth/login", { email: email, password: password })
            localStorage.setItem("token", data.token)
            localStorage.setItem("token-init-date", new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (error) {
            console.log(error);
            dispatch(onLogout("Invalid user/password"))
           
            setTimeout(() => {
                dispatch(clearErrorMessage())     
            }, 10 );
        }
    }

    const startRegister= async({name, email, password}) =>{
        dispatch(checking())
        try {
            const { data } = await calendarApi.post("/auth/register", {name: name, email: email, password: password})
            localStorage.setItem("token", data.token)
            localStorage.setItem("token-init-date", new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {
            dispatch(onLogout(error.response.data?.message) ||"Registration error")
           
            setTimeout(() => {
                dispatch(clearErrorMessage())     
            }, 10 );
        }
    }

    const startLogout = () =>{
        localStorage.clear()
        dispatch(onLogoutCalendar())
        dispatch(onLogout())
    }


    const checkToken = async() =>{
        const token = localStorage.getItem("token")
        if(!token) return dispatch(onLogout());
        try {
            const { data } = await calendarApi.get("/auth/refresh")
            localStorage.setItem("token", data.token)
            localStorage.setItem("token-init-date", new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {
            console.log(error);
            localStorage.clear()
            return dispatch(onLogout())
        }

    }


    return {
        status, user, errorMessages,
        startLogin, startRegister, checkToken, startLogout
    }
}
