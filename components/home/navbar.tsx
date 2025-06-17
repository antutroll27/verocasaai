"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import useAnalytics from "@/hooks/useAnalytics";

export default function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { track } = useAnalytics();
	return (
		<nav className="py-4 bg-[#EFECEC]">
			<div className="w-full lg:max-w-6xl mx-auto px-6 flex justify-between items-center">
				{/* Logo */}
				<div className="flex items-center space-x-2">
					<a className="block" href="">
						<img className="w-[223px]" src="/verocasalogowhitehouse.png" alt="Logo" />
					</a>
				</div>

				{/* Desktop Menu */}
				<div className="hidden lg:flex items-center space-x-14">
					<a
						href="/"
						className="text-sm font-light text-[#0C2D57] hover:text-blue-900"
					>
						Home
					</a>
					<a
						href="#howtouse"
						className="text-sm font-light text-[#0C2D57] hover:text-blue-900"
					>
						Usages
					</a>
					<a
						href="#sample"
						className="text-sm font-light text-[#0C2D57] hover:text-blue-900"
					>
						Samples
					</a>
					<a
						href="#pricing"
						className="text-sm font-light text-[#0C2D57] hover:text-blue-900"
					>
						Pricing
					</a>
					<a
						href="/blog"
						className="text-sm font-light text-[#0C2D57] hover:text-blue-900"
					>
						Blog
					</a>
				</div>

				{/* Desktop Buttons */}
				<div className="hidden lg:flex space-x-5">
					<a
						href="/dashboard"
						className="bg-[#FC6736] text-white px-4 py-2 rounded-lg"
						onClick={() => track("Sign Up", { location: "navbar", device: "desktop" })}
					>
						Sign Up
					</a>
					<a
						href="https://ko-fi.com/verocasa"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-[#FFB0B0] text-blue-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#FC6736] flex items-center space-x-1"
						onClick={() => track("Button Click", { button: "Support Us", location: "navbar", device: "desktop" })}
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M11.4666 8.2666C9.69994 8.2666 8.2666 9.69994 8.2666 11.4666C8.2666 12.0666 8.43327 12.6333 8.73327 13.1133C9.2866 14.0399 10.2999 14.6666 11.4666 14.6666C12.6333 14.6666 13.6533 14.0399 14.1999 13.1133C14.4933 12.6333 14.6666 12.0666 14.6666 11.4666C14.6666 9.69994 13.2333 8.2666 11.4666 8.2666ZM13.0533 11.0466L11.3466 12.6199C11.2533 12.7066 11.1266 12.7533 11.0066 12.7533C10.8799 12.7533 10.7533 12.7066 10.6533 12.6066L9.8666 11.8199C9.67327 11.6266 9.67327 11.3066 9.8666 11.1133C10.0599 10.9199 10.3799 10.9199 10.5733 11.1133L11.0199 11.5599L12.3733 10.3066C12.5733 10.1199 12.8933 10.1333 13.0799 10.3333C13.2666 10.5399 13.2533 10.8599 13.0533 11.0466Z"
								fill="#0C2D57"
							/>
							<path
								d="M14.6666 5.81993C14.6666 6.61326 14.5399 7.34659 14.3199 8.02659C14.2799 8.16659 14.1133 8.2066 13.9933 8.11993C13.2666 7.57993 12.3799 7.29326 11.4666 7.29326C9.15325 7.29326 7.26659 9.17993 7.26659 11.4933C7.26659 12.2133 7.45325 12.9199 7.80659 13.5466C7.91325 13.7333 7.78659 13.9733 7.58659 13.8999C5.97992 13.3533 2.73325 11.3599 1.67992 8.02659C1.45992 7.34659 1.33325 6.61326 1.33325 5.81993C1.33325 3.75993 2.99325 2.09326 5.03992 2.09326C6.24659 2.09326 7.32659 2.67993 7.99992 3.57993C8.67325 2.67993 9.75325 2.09326 10.9599 2.09326C13.0066 2.09326 14.6666 3.75993 14.6666 5.81993Z"
								fill="#0C2D57"
							/>
						</svg>

						<span>Support Us</span>
					</a>
				</div>

				{/* Mobile Menu Toggle */}
				<div className="lg:hidden">
					{!mobileMenuOpen ? (
						<button
							className="mobile-menu-button p-2 rounded-md focus:outline-none"
							onClick={() => setMobileMenuOpen(true)}
						>
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16m-7 6h7"
								/>
							</svg>
						</button>
					) : (
						<button
							className="mobile-menu-button p-2 rounded-md focus:outline-none"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					)}
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`mobile-menu ${
					mobileMenuOpen ? "" : "hidden"
				} lg:hidden flex flex-col space-y-4 px-6 pb-4 mt-5`}
			>
				<a
					href="/"
					className="text-sm font-light text-[#0C2D57] hover:text-blue-900"
				>
					Home
				</a>
				<a
					href="#howtouse"
					className="text-sm font-light text-[#0C2D57] hover:text-blue-900"
				>
					Usages
				</a>
				<a
					href="#sample"
					className="text-sm font-light text-[#0C2D57] hover:text-blue-900"
				>
					Samples
				</a>
				<a
					href="#pricing"
					className="text-sm font-light text-[#0C2D57] hover:text-blue-900"
				>
					Pricing
				</a>
				<a
					href="/blog"
					className="text-sm font-light text-[#0C2D57] hover:text-blue-900"
				>
					Blog
				</a>
				<a
					href="/dashboard"
					className="bg-[#FC6736] text-white px-4 py-1 rounded-lg text-center w-[130px]"
					onClick={() => track("Sign Up", { location: "navbar", device: "mobile" })}
				>
					Sign Up
				</a>
				{/* Support Us button - Links to Ko-fi donation page */}
				<a
					href="https://ko-fi.com/verocasa"
					target="_blank"
					rel="noopener noreferrer"
					className="bg-[#FFB0B0] w-[130px] text-blue-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#FC6736] flex items-center space-x-1"
					onClick={() => track("Button Click", { button: "Support Us", location: "navbar", device: "mobile" })}
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.4666 8.2666C9.69994 8.2666 8.2666 9.69994 8.2666 11.4666C8.2666 12.0666 8.43327 12.6333 8.73327 13.1133C9.2866 14.0399 10.2999 14.6666 11.4666 14.6666C12.6333 14.6666 13.6533 14.0399 14.1999 13.1133C14.4933 12.6333 14.6666 12.0666 14.6666 11.4666C14.6666 9.69994 13.2333 8.2666 11.4666 8.2666ZM13.0533 11.0466L11.3466 12.6199C11.2533 12.7066 11.1266 12.7533 11.0066 12.7533C10.8799 12.7533 10.7533 12.7066 10.6533 12.6066L9.8666 11.8199C9.67327 11.6266 9.67327 11.3066 9.8666 11.1133C10.0599 10.9199 10.3799 10.9199 10.5733 11.1133L11.0199 11.5599L12.3733 10.3066C12.5733 10.1199 12.8933 10.1333 13.0799 10.3333C13.2666 10.5399 13.2533 10.8599 13.0533 11.0466Z"
							fill="#0C2D57"
						/>
						<path
							d="M14.6666 5.81993C14.6666 6.61326 14.5399 7.34659 14.3199 8.02659C14.2799 8.16659 14.1133 8.2066 13.9933 8.11993C13.2666 7.57993 12.3799 7.29326 11.4666 7.29326C9.15325 7.29326 7.26659 9.17993 7.26659 11.4933C7.26659 12.2133 7.45325 12.9199 7.80659 13.5466C7.91325 13.7333 7.78659 13.9733 7.58659 13.8999C5.97992 13.3533 2.73325 11.3599 1.67992 8.02659C1.45992 7.34659 1.33325 6.61326 1.33325 5.81993C1.33325 3.75993 2.99325 2.09326 5.03992 2.09326C6.24659 2.09326 7.32659 2.67993 7.99992 3.57993C8.67325 2.67993 9.75325 2.09326 10.9599 2.09326C13.0066 2.09326 14.6666 3.75993 14.6666 5.81993Z"
							fill="#0C2D57"
						/>
					</svg>

					<span>Support Us</span>
				</a>
			</div>
		</nav>
	);
}
