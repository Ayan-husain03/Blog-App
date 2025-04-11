import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import Container from "../container/Container";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    { name: "Home", path: "/", active: true },
    { name: "Login", path: "/login", active: !authStatus },
    { name: "Signup", path: "/signup", active: !authStatus },
    { name: "AllPost", path: "/all-post", active: authStatus },
    { name: "AddPost", path: "add-post", active: authStatus },
  ];
  return (
    <header>
      <Container>
        <nav className="flex justify-between items-center py-4">
          <div>
            <Link to="/">Logo</Link>
          </div>
          <ul className="flex space-x-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button onClick={() => navigate(item.path)}>{item.name}</button>
                  </li>
                )
            )}
            {authStatus && (<li>
              <LogoutBtn />
            </li>)}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
