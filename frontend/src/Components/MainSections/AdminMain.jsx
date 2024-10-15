import { Outlet } from "react-router-dom"
import Menu from "../Menu"

const AdminMain = () => {
    return (
        <section className="flex justify-center">
            <Menu />
            <Outlet />
        </section>
    )
}

export default AdminMain