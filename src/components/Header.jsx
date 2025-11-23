import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="flex justify-center gap-6 p-4 border-b border-gray-700 bg-secondary">
      <NavLink to="/profile" className="text-gray-300 hover:text-primary">
        Profile
      </NavLink>
      <NavLink to="/" className="text-gray-300 hover:text-primary">
        Products
      </NavLink>
      <NavLink to="/cart" className="text-gray-300 hover:text-primary">
        Cart
      </NavLink>
    </nav>
  );
}
