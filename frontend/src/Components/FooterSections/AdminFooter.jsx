import { useContext } from "react"
import { Link } from "react-router-dom"
import { DarkModeContext } from "../../Contexts/DarkModeContext"

const AdminFooter = () => {
  const {darkMode} = useContext(DarkModeContext)
    return (
      <footer className="py-6 text-center text-white bg-gray-800">
      <p className="text-sm">© 2024 InventoryPro. All rights reserved.</p>
    </footer>
    )
}

export default AdminFooter