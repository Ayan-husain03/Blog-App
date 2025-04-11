import React from 'react'

// BlogFooter.jsx
// import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">BlogVerse</h2>
          <p className="text-sm text-gray-400">
            Dive into the world of ideas, insights, and stories. BlogVerse is your daily dose of creativity and knowledge.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Blogs</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Newsletter</h3>
          <p className="text-sm mb-3">Stay updated with our latest blogs.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded bg-gray-800 text-white text-sm outline-none w-full"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
              Subscribe
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-500 mt-10 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} BlogVerse. All rights reserved.
      </div>
    </footer>
  );
}
