import { NavLink } from "react-router-dom";

import "./Navbar.css"

const Navbar = () => {
  return (
    <nav id="navbar">
      <h2>Pet Shop</h2>
      <ul>
        <li>
          <NavLink to="/">Clientes</NavLink>
        </li>
        <li>
          <NavLink to="/party/new" className="btn">
            Adicionar Cliente
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
