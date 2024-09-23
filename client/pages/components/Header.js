import React from "react";
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { FaPlane } from "react-icons/fa6";
import { IoEarthSharp } from "react-icons/io5";

export default function Header() {
  return (
    <header className="w-full  z-20">
      <nav className="flex items-center justify-between flex-wrap  p-6">
        {/* Sol kısım (Başlık) */}
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <span className="font-bold text-3xl tracking-tight flex gap-4 items-center">
            <FaPlane size={"42px"} /> PLANE SCAPE
          </span>
        </div>

        {/* Sağ kısım (Menü İkonları ve Başlıkları) */}
        <div className="flex items-center space-x-6 text-white text-center">
          <a href="#" className="flex gap-2 text-purple-800 items-center hover:text-purple-600">
            <FaHome className="text-lg" />
            <span className="text-lg">Deals</span>
          </a>
          <a href="#" className="flex gap-2 text-purple-800 items-center hover:text-purple-600">
            <IoEarthSharp  className="text-lg" />
            <span className="text-lg">Discover</span>
          </a>
          <a href="#" className="flex gap-2 text-purple-800 items-center hover:text-purple-600">
            <FaInfoCircle className="text-lg" />
            <span className="text-lg">Profile</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
