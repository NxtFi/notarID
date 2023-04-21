// Navbar.js
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Links } from "./Links";

import nxtfi_logo from "../../assets/img/logo2.png";
// import notarid_logo from "../assets/img/logo2.png";

export default function Navbar() {

	const [showMenu, setShowMenu] = useState(false);

	

	return (
		<nav className="flex w-full h-16 bg-[#ffffff] justify-between px-8 items-center font-semibold text-[#b1b3b9] absolute top-0">
			<div className="flex items-center gap-3">
				<a href="https://www.notarid.demo.nxtfi.org/" className="h-10 w-10 hover:scale-105 transition-all duration-150">
					<img src={nxtfi_logo}  alt="NxtFi" id="nxtfi_logo"></img>
				</a>
				<h1 className="font-black text-lg text-[#278cee]">NotarID</h1>
			</div>
			{/* <div className="icon-menu" onClick={() => setShowMenu(!showMenu)}>
				{!showMenu ? <FaBars /> : <FaTimes />}
			</div> */}

			<ul className="flex gap-12 transition-all duration-150 ">
				{
					Links.map((link, index) => (
						<li key={index} onClick={() => setShowMenu(!showMenu)}>
							<NavLink className={({ isActive }) => "" + (isActive ? " border-b-4 border-b-[#1f55eb] text-[#1f55eb] py-1" : "")} to={link.href}>
								{link.label}
							</NavLink>
						</li>
					))
				}
			</ul>
		</nav>
	);
}
