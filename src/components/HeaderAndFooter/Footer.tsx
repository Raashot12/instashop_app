import React from "react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-gray-800 text-gray-200 py-4">
      <div className="container mx-auto max-w-6xl flex justify-between items-center px-6">
        <p className="text-sm">
          &copy; {currentYear} RashDev. All rights reserved.
        </p>
        <p className="text-sm">
          Built with <span className="text-red-500">❤</span> by RashDev
        </p>
      </div>
    </footer>
  )
}

export default Footer
