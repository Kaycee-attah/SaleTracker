const Footer = () => {
    return (
        <footer className="py-6 bg-gray-100">
        <div className="flex items-center justify-between max-w-6xl px-6 mx-auto">
          <p className="text-sm text-gray-600">© Sumud 2024</p>
          <div className="flex space-x-4">
            <a href="#privacy" className="text-gray-600 hover:underline">Privacy Policy</a>
            <a href="#terms" className="text-gray-600 hover:underline">Terms</a>
            <a href="#faqs" className="text-gray-600 hover:underline">FAQs</a>
          </div>
          <div className="flex space-x-4">
            <a href="#instagram" className="text-gray-600 hover:text-gray-800">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#facebook" className="text-gray-600 hover:text-gray-800">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#twitter" className="text-gray-600 hover:text-gray-800">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </footer>
    )
}

export default Footer