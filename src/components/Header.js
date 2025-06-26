"use client";  // Required for using hooks like usePathname in App Router (Next.js)

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

//Import Logout button functionality
import LogoutButton from "./LogoutButton";

/**
 * Header Component
 * ----------------
 * Global header displayed at the top of all pages.
 * - Displays app logo and title.
 * - Shows authenticated greeting if user is logged in.
 * - Includes navigation with responsive toggle (mobile).
 */
export default function Header({ username, day, date }) {
  const pathname = usePathname();   // Get current route
  const [navOpen, setNavOpen] = useState(false);   // Manage mobile nav toggle
  const toggleNav = () => setNavOpen(!navOpen);   // Toggle nav state
  const isAuthenticated = !!username;    // Auth status check
 
  return (
    <header className="w-full bg-[#FFF8E1] dark:bg-gray-950 shadow-md border-b border-orange-300 dark:border-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-10">

        {/* Logo + Title */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start">
          <Image
            src="/images/logo.jpeg"
            alt="Logo"
            width={60}
            height={60}
            className="rounded-full object-contain drop-shadow-md"
          />
          <span className="text-4xl sm:text-3xl font-bold text-[#FF7043] dark:text-[#29B6F6] font-[Kaushan_Script] tracking-wide">
            Schedo
          </span>

          {/* Hamburger Button with Toogle*/}
          <button
            className="sm:hidden text-2xl text-gray-800 dark:text-white ml-auto absolute top-5 right-5"
            onClick={toggleNav}
            aria-label="Toggle Navigation"
          >
            {navOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Greeting Section for Authenticated Users*/}
        {isAuthenticated && (
          <div className="text-center sm:text-left w-full sm:w-auto">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {day}, {date}
            </p>
            <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
              👋 Hello, <span className="text-[#FF7043] dark:text-[#66BB6A]">{username}</span>
            </p>
          </div>
        )}

        {/* Navigation + Theme + Auth Buttons */}
        <div className="flex items-center gap-4">
       

          <nav
            className={`absolute sm:static top-[70px] right-4 sm:top-0 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-md shadow-lg sm:shadow-none p-4 sm:p-0 z-50 transition-all duration-300 ${
              navOpen ? "flex flex-col sm:flex-row gap-3" : "hidden sm:flex gap-4"
            }`}
          >
            {isAuthenticated ? (
              <>
 {/* Protected Routes */}
                <NavLink href="/dashboard" label="Dashboard" onClick={() => setNavOpen(false)} />
                <LogoutButton />
              </>
            ) : (
              <>
                  {/* Guest Routes (hide current page) */}
                {pathname !== "/login" && (
                  <NavLink href="/login" label="Login" onClick={() => setNavOpen(false)} />
                )}
                {pathname !== "/signup" && (
                  <NavLink href="/signup" label="Sign Up" onClick={() => setNavOpen(false)} />
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}


/**
 * Reusable Navigation Link Component
 * - Styled consistently across header navigation
 */
function NavLink({ href, label, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-4 py-2 rounded-md hover:bg-[#FF7043]/10 dark:hover:bg-[#29B6F6]/20 transition font-medium text-sm"
    >
      {label}
    </Link>
  );
}

