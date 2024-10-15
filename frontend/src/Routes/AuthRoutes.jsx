import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../Contexts/userContext"


const AuthRoutes = () => {
    const { user } = useContext(UserContext)

    return user.role === 'admin' ? <Outlet /> : <Navigate to="/login" />
}

export default AuthRoutes