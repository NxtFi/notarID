// Navbar.js
import { useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import nxtfi_logo from "../assets/img/NXTFI-blanco.jpg";
import notarid_logo from "../assets/img/NotarID_logo.png";

export default function Navbar() {
	const [showMenu, setShowMenu] = useState(false);
	return (
		<nav className="navigation">
			<div>
				<a href="https://nxtfi.org/">
					<img src={nxtfi_logo} height="50" alt="NxtFi" id="nxtfi_logo"></img>
				</a>
				<a href="https://dev.notarid.nxtfi.net/">
					<img src={notarid_logo} height="50" alt="NotarID" id="notarid_logo"></img>
				</a>
			</div>
			<div className="icon-menu" onClick={() => setShowMenu(!showMenu)}>
				{!showMenu ? <FaBars /> : <FaTimes />}
			</div>

			<ul className={!showMenu ? "hidden-menu" : "show-menu"}>
				<li onClick={() => setShowMenu(!showMenu)}>
					<NavLink className={({ isActive }) => "" + (isActive ? " active" : "")} to="/">
						Sello de tiempo
					</NavLink>
				</li>
				<li onClick={() => setShowMenu(!showMenu)}>
					<NavLink className={({ isActive }) => "" + (isActive ? " active" : "")} to="/certificado">
						Sello certificado
					</NavLink>
				</li>
				<li onClick={() => setShowMenu(!showMenu)}>
					<NavLink className={({ isActive }) => "" + (isActive ? " active" : "")} to="/anexo">
						Sello con datos anexos
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
