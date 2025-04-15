/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import Container from "../container/Container";
import LogoutBtn from "./LogoutBtn";
import Logo from "../Logo";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", active: true },
    { name: "Login", path: "/login", active: !authStatus },
    { name: "Signup", path: "/signup", active: !authStatus },
    { name: "AllPost", path: "/all-post", active: authStatus },
    { name: "AddPost", path: "/add-post", active: authStatus },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-50 shadow-md">
      <Container>
        <nav className="flex justify-between items-center p-4">
          <Link to="/">
            <Logo width={140} />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-4 items-center">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavigate(item.path)}
                      className="py-2 px-3 rounded-xl hover:bg-gray-200"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={28} />
            </button>
          </div>
        </nav>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Sidebar */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween" }}
                className="fixed top-0 right-0 w-72 h-full bg-white text-black shadow-lg z-50 p-5"
              >
                <div className="flex justify-between items-center mb-6">
                  <Logo width={100} />
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X size={24} />
                  </button>
                </div>
                <ul className="space-y-4">
                  {navItems.map(
                    (item) =>
                      item.active && (
                        <li key={item.name}>
                          <button
                            onClick={() => handleNavigate(item.path)}
                            className="block w-full text-left py-2 px-3 hover:bg-gray-200 rounded"
                          >
                            {item.name}
                          </button>
                        </li>
                      )
                  )}
                  {authStatus && <LogoutBtn />}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}

export default Header;
