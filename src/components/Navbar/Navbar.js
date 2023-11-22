// Navbar.js
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { Links } from "./Links";

//import nxtfi_logo from "../../assets/img/logo2.png";
import nxtfi_logo from "../../assets/img/logo3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

// import notarid_logo from "../assets/img/logo2.png";

export default function Navbar() {
  const [active, setActive] = useState(false);
  let navbarRef = useRef();

  const handleClick = () => {
    setActive(!active);

  };

//   useEffect(() => {
//     const handler = (e) => {
//       if (!navbarRef.current.contains(e.target)) {
//         setActive(false);
//       }
//     };

//     document.addEventListener("mousedown", handler);

//     return () => {
//       document.removeEventListener("mousedown", handler);
//     };
//   }, []);

  return (
    <nav className="md:flex transition-all duration-500 ease-in max-md:flex-col w-full h-16 bg-[#ffffff] text-[#6b7280] justify-between px-8 items-center font-medium  absolute top-0">
      <div className="flex items-center gap-3 py-2">
        <a
          href="https://www.notarid.demo.nxtfi.org/"
          className="h-10 w-10 hover:scale-105 transition-all duration-150"
        >
          <img src={nxtfi_logo} alt="NxtFi" id="nxtfi_logo"></img>
        </a>
        <h1 className="font-black text-lg text-[#489ef3]">NotarID</h1>
        <FontAwesomeIcon
          className="md:hidden absolute right-0 mr-6"
          onClick={handleClick}
          icon={active ? faXmark : faBars}
        />
      </div>
      <ul
        ref={navbarRef}
        className={`left-0 ${
          active ? "" : "bottom-[500px]"
        } transition-all duration-500 ease-in flex max-md:flex-col max-md:items-center max-md:absolute p-6 md:p-0 max-md:w-full bg-white  gap-12  `}
      >
        {Links.map((link, index) => (
          <li key={index} onClick={() => setActive(!active)}>
            <NavLink
              className={({ isActive }) =>
                "" +
                (isActive
                  ? " border-b-4 border-b-[#278cee] text-[#278cee] py-1"
                  : "")
              }
              to={link.href}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
