"use client";
import { useState } from "react";
import  CreateJobForm  from "../form/CreateJobForm";
const navItems = [
  "Home",
  "Find Jobs",
  "Find Talents",
  "About us",
  "Testimonials",
];
// This controls which link is highlighted

export  function  Header (){
    const [isModalOpen, setIsModalOpen] = useState(false);
    return(
        <>
  <header className="py-6">
    {/* I've removed the inner "container" div as it's often better to have the parent page control the main container */}
    <div className="bg-white rounded-full border  border-gray-100 shadow-lg shadow-bg-[#7F7F7F26] flex justify-between items-center px-6 w-[890px] h-[80px] mx-auto">
      <div className="flex items-center gap-3">
        {/* SVG Logo */}
        <svg
          width="40"
          height="46"
          viewBox="0 0 40 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.33 5.41968L24.8852 23.3961L39.6353 13.9324L24.33 5.41968Z"
            fill="#333333"
          />
          <path
            d="M39.5308 32.7551V13.8619L18.395 27.4678V45.3387H19.1064"
            fill="#494949"
          />
          <path
            d="M1.18878 32.0419L14.7153 23.3629L15.2245 39.8485L1.18878 32.0419Z"
            fill="url(#paint0_linear_2_114)"
          />
          <path
            d="M1.18878 32.0419L14.7153 23.3629L15.2245 39.8485L1.18878 32.0419Z"
            fill="url(#paint1_linear_2_114)"
          />
          <path
            d="M1.18878 32.0419L14.7153 23.3629L15.2245 39.8485L1.18878 32.0419Z"
            stroke="url(#paint2_linear_2_114)"
            strokeWidth="0.846154"
          />
          <path
            d="M1.18878 32.0419L14.7153 23.3629L15.2245 39.8485L1.18878 32.0419Z"
            stroke="url(#paint3_linear_2_114)"
            strokeWidth="0.846154"
          />
          <path
            d="M0.469055 13.2451V32.1381L21.6051 18.5501V0.661621H20.8936"
            fill="url(#paint4_linear_2_114)"
          />
          <path
            d="M0.469055 13.2451V32.1381L21.6051 18.5501V0.661621H20.8936"
            fill="url(#paint5_linear_2_114)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2_114"
              x1="0.36496"
              y1="31.5921"
              x2="15.6704"
              y2="31.5921"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00AAFF" />
              <stop offset="1" stopColor="#8636F8" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_2_114"
              x1="8.01768"
              y1="40.5806"
              x2="8.01768"
              y2="22.6037"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6" />
              <stop offset="0.1085" stopColor="white" stopOpacity="0.455" />
              <stop offset="0.4332" stopColor="white" stopOpacity="0.216" />
              <stop offset="0.6639" stopColor="white" stopOpacity="0.06" />
              <stop offset="0.775" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_2_114"
              x1="0.36496"
              y1="31.5921"
              x2="15.6704"
              y2="31.5921"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00AAFF" />
              <stop offset="1" stopColor="#8636F8" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_2_114"
              x1="8.01768"
              y1="40.5806"
              x2="8.01768"
              y2="22.6037"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6" />
              <stop offset="0.1085" stopColor="white" stopOpacity="0.455" />
              <stop offset="0.4332" stopColor="white" stopOpacity="0.216" />
              <stop offset="0.6639" stopColor="white" stopOpacity="0.06" />
              <stop offset="0.775" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_2_114"
              x1="-0.407398"
              y1="20.0785"
              x2="22.8932"
              y2="18.3851"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.0226" stopColor="#8636F8" />
              <stop offset="0.3484" stopColor="#F020B3" />
              <stop offset="0.6742" stopColor="#F8475E" />
              <stop offset="1" stopColor="#FF9421" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_2_114"
              x1="11.0371"
              y1="32.1381"
              x2="11.0371"
              y2="0.661621"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6" />
              <stop offset="0.0842" stopColor="white" stopOpacity="0.455" />
              <stop offset="0.367" stopColor="white" stopOpacity="0.216" />
              <stop offset="0.568" stopColor="white" stopOpacity="0.06" />
              <stop offset="0.6648" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <nav className="hidden md:flex items-center gap-x-1">
        {navItems.map((item) => {
          return (
            <a
              key={item}
              href="#"
              className="px-5 py-2 rounded-full text-black font-lg transition-all duration-300 ease-in-out hover:bg-white hover:shadow-sm"
            >
              {item}
            </a>
          );
        })}
      </nav>
      <button onClick={()=>{setIsModalOpen(true)}} className="bg-gradient-to-r from-[#A128FF] to-[#6100AD]  text-white font-semibold px-7 py-3 rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/30">
        Create Jobs
      </button>
    </div>
  </header>
   {isModalOpen && <CreateJobForm onClose={() => setIsModalOpen(false)} />}
    </>
    )
};