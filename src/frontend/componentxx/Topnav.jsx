import { useState } from "react";
import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";

import { FaBars, FaTimes } from "react-icons/fa";

export default function TopNav({ login }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-[#0a3d62]/80 via-[#0c4a7c]/80 to-[#0a3d62]/70 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.45)] fixed top-0 z-50 border-b border-[#0e4470]/70">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}

        <div className="flex items-center space-x-2 select-none">
          <span className="text-2xl font-bold  bg-clip-text text-white drop-shadow-sm">
            MKD UNICODE
          </span>
        </div>

        {/* Mobile Toggle */}
        {!login && (
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-blue-100 active:scale-95 transition"
            onClick={() => setOpen(!open)}
          >
            {
              open ? (
                <FaTimes className="w-6 h-6 text-blue-700" />
              ) : (
                <FaBars className="w-6 h-6 text-blue-700" />
              )
            }
          </button>
        )}

        {/* Menu */}
        {!login && (
          <div
            className={`flex-col lg:flex lg:flex-row lg:items-center lg:static absolute right-0 top-14 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none p-5 lg:p-0 rounded-md transition-all duration-300 ease-in-out ${open ? "flex opacity-100" : "hidden opacity-0 lg:opacity-100 lg:flex"
              }`}
          >
            <Link
              to="/"
              className="block px-4 py-2 text-blue-800 font-medium rounded-lg bg-[#1b4f8b]/40 backdrop-blur-md shadow-[0_2px_6px_rgba(0,0,0,0.5)] hover:bg-[#245f9e]/60 hover:shadow-[0_4px_10px_rgba(0,0,0,0.6)] hover:scale-[1.04] transition"
              onClick={() => setOpen(false)}
            >
              Main
            </Link>

            {/* <Link
              to="/job"
              className="block px-4 py-2 text-blue-800 font-medium rounded-lg bg-[#1b4f8b]/40 backdrop-blur-md shadow-[0_2px_6px_rgba(0,0,0,0.5)] hover:bg-[#245f9e]/60 hover:shadow-[0_4px_10px_rgba(0,0,0,0.6)] hover:scale-[1.04] transition"
              onClick={() => setOpen(false)}
            >
              Master Job
            </Link> */}
          </div>
        )}
      </div>
    </nav>
  );
}
