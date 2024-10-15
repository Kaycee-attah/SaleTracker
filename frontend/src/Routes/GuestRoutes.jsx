import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../Contexts/userContext"


const GuestRoutes = () => {
    const { user } = useContext(UserContext)

    return !user.email ? <Outlet /> : <Navigate to="/dashboard" />
}

export default GuestRoutes