import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../../auth/pages/Login"
import { CalendarApp } from "../pages/CalendarApp"
import { envVariables } from "../../helpers/envVariables"
import { useAuthStore } from "../hooks/useAuthStore"
import { useEffect } from "react"

export const AppRouter = () => {

    const { status, checkToken } = useAuthStore()

    useEffect(() => {
        checkToken()
    }, [])

    if (status === "checking") {
        return (<h3>Cargando...</h3>)
    }

    return (
        <Routes>

            {
                (status === "non-authenticated")
                    ?
                    (<>
                        <Route path="/auth/*" element={<Login />} />
                        <Route path="/*" element={<Navigate to={"/auth/login"} />} />
                    </>)
                    :
                    (<>
                        <Route path="/" element={<CalendarApp />} />
                        <Route path="/*" element={ <Navigate to={"/"}/>} />
                    </>)
            }


        </Routes>
    )
}
