// Navbar.js 
import "./navbar.css";
import { NavLink } from 'react-router-dom';

import nxtfi_logo from '../img/NXTFI-blanco.jpg';
import notarid_logo from '../img/NotarID_logo.png';


export default function Navbar() {
    return (
        <nav className="navigation">
            <a href="https://nxtfi.org/"><img src={nxtfi_logo} height="50" alt="NxtFi" id="nxtfi_logo"></img></a>
            <a href="https://dev.notarid.nxtfi.net/"><img src={notarid_logo} height="50" alt="NotarID" id="notarid_logo"></img></a>
            <div>
                <ul>
                    <li><NavLink className={({ isActive }) => "" + (isActive ? " active" : "")} to="/">Sello de tiempo</NavLink></li>
                    <li><NavLink className={({ isActive }) => "" + (isActive ? " active" : "")} to="/certificado">Sello certificado</NavLink></li>
                    <li><NavLink className={({ isActive }) => "" + (isActive ? " active" : "")} to="/anexo">Sello con datos anexos</NavLink></li>
                </ul>
            </div>
        </nav>
      )
}