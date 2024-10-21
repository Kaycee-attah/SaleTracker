import { Link, useLocation } from "react-router-dom";

const Nav = () => {
    const location = useLocation()
    return (
        <header className="fixed z-10 flex items-center justify-between w-full p-6 bg-gray-50">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold text-gray-800">Sumud</Link>
          <nav className="space-x-6 text-gray-600">
            <a href="#about" className="hover:text-gray-800">About</a>
            <a href="#contact" className="hover:text-gray-800">Contact</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
            {
                (location.pathname !== "/login") && (<Link to="/login" className="text-gray-800">Login</Link>)
            }
          
          <div className="flex items-center">
            <Link class="fa-solid fa-cart-shopping"></Link>
            {/* <span className="text-gray-800 material-icons">shopping_cart</span> */}
            <span className="ml-1 text-gray-800">(0)</span>
          </div>
        </div>
      </header>
    )
}

export default Nav;