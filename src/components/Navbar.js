// Navbar.js 
import { useState } from "react";
import "../css/navbar.css";

import logo from '../img/NXTFI-blanco.jpg';

export default function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    return (
        <nav className="navigation">
            <a href="https://nxtfi.org/">
				<img src={logo} height="50" alt="NxtFi" id="logo"></img>
			</a>
            <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
                {/* <ul>
                    <li>
                        <a href="/home">Sello de tiempo</a>
                    </li>
                    <li>
                        <a href="/about">Sello certificado</a>
                    </li>
                    <li>
                        <a href="/contact">Sello con datos anexos</a>
                    </li>
                    <li>
                        <a href="/contact">Validación simple</a>
                    </li>
                    <li>
                        <a href="/contact">Validación con certificado</a>
                    </li>
                </ul> */}
            </div>
        </nav>
      )
}