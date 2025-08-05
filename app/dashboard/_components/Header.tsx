"use client";
import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { UserDataContext } from "@/app/_context/UserDataContext";
import { Users } from "@/config/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const { userDetail, isLoading } = useContext(UserDataContext);

  // Only set subscription status when we have valid data
  const subscriptionStatus = userDetail?.subscriptionType;
  
  // Use useEffect to ensure we don't show FREE TIER briefly
  useEffect(() => {
    // Keep local loading state true until context loading is complete
    if (!isLoading) {
      setLocalLoading(false);
    }
  }, [isLoading]);

  const navLinks = [
    { href: "/dashboard", label: "DASHBOARD" },
    { href: "/dashboard/ai-redesign", label: "RE DESIGN YOUR ROOM" },
    { href: "/dashboard/purchase-credits", label: "PURCHASE PLANS" },
    { href: "/blog", label: "BLOG" },
  ];

  return (
    <nav className="w-full">
      <div className="max-w-7xl mx-auto px-20 sm:px-5 lg:px-6 py-4 md:py-6 
	  ">
        <div className="flex justify-between items-center max-w-[95%] mx-auto w-full pt-10 pl-0
         ">
          {/* Logo */}
          <Image
            src="/verocasalogowhitehouse.png"
            alt="logo"
            width={220}
            height={220}
            className="w-25 md:w-48 object-contain -ml-10"
          />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10 ">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-colors-custom-purple text-base px-4 font-light hover:font-semibold transition-all duration-200 "
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex gap-3 items-center bg-colors-white px-4 py-1 rounded-md ml-4">
              <h2
                className={`font-bold text-sm md:text-base ${
                  subscriptionStatus === "free" ? "text-red-500" : "text-green-500"
                } ${localLoading ? "invisible" : "visible"}`}
              >
                {subscriptionStatus === "free" ? "FREE TIER" : "PREMIUM TIER"}
              </h2>
            </div>

            <div className="transform scale-125 ml-4">
              <UserButton />
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <div className="transform scale-125">
              <UserButton />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-colors-custom-purple p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-colors-custom-purple text-base py-2 hover:opacity-80"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 items-center bg-colors-white px-4 py-2 rounded-md">
                <h2
                  className={`font-bold text-sm ${
                    subscriptionStatus === "free" ? "text-red-500" : "text-green-500"
                  } ${localLoading ? "invisible" : "visible"}`}
                >
                  {subscriptionStatus === "free" ? "FREE TIER" : "PREMIUM TIER"}
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
