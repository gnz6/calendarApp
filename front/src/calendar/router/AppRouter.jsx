import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../../auth/pages/Login"
import { CalendarApp } from "../pages/CalendarApp"

export const AppRouter = () => {

    const authStatus = "authenticated"
    
    return (
        <Routes>

            {authStatus === "not-authenticated"
                ? <Route path="/auth/*" element={<Login />} />
                : <Route path="/*" element={<CalendarApp />} />
            }

            <Route path="/*" element={<Navigate to="/auth/login" />} />

        </Routes>
    )
}
