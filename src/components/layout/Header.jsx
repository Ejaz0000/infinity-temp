"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/redux/slices/userSlice";
import {
  Menu,
  ArrowLeft,
  User,
  LogOut,
  Home,
  PackageIcon,
  PhoneCall,
  LayoutGrid,
  Lock,
  LocateIcon,
  ShoppingBag,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import SearchBar from "./SearchBar";
import Cookies from "js-cookie";
import Image from "next/image";
import logoImage from "../../../public/assets/logo.png";
import SidebarMenu from "./SidebarMenu";
import { fetchCart } from "@/redux/slices/cartSlice";
import CartSidebar from "../cart/CartSidebar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (isMenuOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isCartOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm w-full px-4 py-3">
        <div className="flex items-center justify-between gap-6 md:gap-8">
          {/* Left section: Hamburger + Logo */}
          <div className="flex justify-between md:justify-start items-center gap-6 w-full md:w-fit">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-gray-700 hover:text-black transition-colors"
              aria-label="Open Menu"
            >
              <Menu size={28} />
            </button>
            <Link href="/" className="flex items-center no-underline">
              <Image
                src={logoImage}
                alt="Logo"
                width={87}
                height={46}
                className=" w-[65px] h-auto md:w-[75px] lg:w-[87px]"
              />
            </Link>
          </div>

          {/* Middle section: Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl px-2">
            <SearchBar placeholder="Search For Products" />
          </div>

          {/* Right section: Location, Lang, Login */}
          <div className="flex items-center gap-6 shrink-0">
            {/* Location selector */}
            {/* <button className="flex items-center gap-2 hover:text-orange-500 transition-colors text-left group bg-transparent border-none cursor-pointer">
              <MapPin size={24} className="text-gray-700 group-hover:text-orange-500 transition-colors" />
              <div className="flex flex-col leading-tight">
                <span className="text-orange-500 font-semibold text-sm">Select</span>
                <span className="text-orange-500 font-semibold text-sm">Location</span>
              </div>
            </button> */}

            {/* Language Toggle */}
            {/* <div className="text-sm font-semibold text-gray-800 whitespace-nowrap">
              <span className="text-orange-500">English</span> <span className="text-gray-400 font-normal mx-1">|</span> <span>বাংলা</span>
            </div> */}

            {/* Cart */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="flex md:hidden bg-(--accent-main) items-center gap-2 transition-colors text-left group border-none cursor-pointer py-1 px-2 rounded-xl"
            >
                <ShoppingCart size={20} className="text-white" />
                <div className="flex flex-col leading-tight">
                  <span className="text-white font-semibold">{cart?.total_items || "0"}</span>
                </div>
              </button>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="flex justify-between md:flex-col fixed md:top-1/2 left-0 md:left-auto bottom-0 md:bottom-auto right-0 z-50 bg-(--accent-main) items-center gap-1 transition-colors text-left group border-none cursor-pointer py-2 md:py-1 pl-2 pr-1 md:rounded-l-xl"
            >
                <div className="flex gap-2 items-center">
                  <ShoppingCart size={20} className="text-white hidden md:block" />
                  <span className="text-white font-semibold block md:hidden">Cart Items-</span>
                <span className="text-white font-semibold">{cart?.total_items || "0"}</span>
                </div>
                <div className="bg-gray-50 text-gray-800 text-sm px-2 rounded-md">
                  Tk. 
                  {cart?.subtotal || "0.00"}
                </div>
                <ArrowRight size={18} className="text-white md:hidden" />
              </button>


              <div className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-800 whitespace-nowrap">
                <Link href="/" className="block text-orange-500">
                  English
                </Link> 
                <div>|</div>
                <Link href="/" className="block">
                  বাংলা
                </Link> 
              </div>  

            {/* User Login/Profile */}
            <div className="hidden md:block">
              {user ? (
              <Link
                href="/my-account"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-full font-semibold transition-colors no-underline text-sm"
              >
                Profile
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-full font-semibold transition-colors no-underline text-sm"
              >
                Log in
              </Link>
            )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar (shows below header on small screens) */}
        <div className="md:hidden py-3 w-full">
          <SearchBar placeholder="Search For Products" />
        </div>
      </header>

      {/* Mobile/Sidebar Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-60 transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 left-0 h-full overflow-y-auto w-[85%] max-w-[340px] bg-gray-50 z-70 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header (Yellow Area) */}
        <div className="bg-gray-600 p-6 pb-8 flex flex-row md:flex-col justify-between md:h-40 shrink-0">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 text-white hover:text-white/80 transition-colors w-fit bg-transparent border-none cursor-pointer p-0"
          >
            <ArrowLeft size={20} />
            <span className="font-medium text-lg">Back</span>
          </button>

          <div className="flex justify-end">
            <div className="flex flex-col text-right">
              <Image
                src={logoImage}
                alt="Logo"
                width={87}
                height={46}
                className=" w-[65px] h-auto md:w-[75px] lg:w-[87px]"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Links */}
        {showCategories ? (
          <>
          <button
            className="flex items-center gap-4 bg-gray-200 justify-center text-gray-600 font-semibold py-2"
           onClick={()=> setShowCategories(false)}
           >  
            <ArrowLeft size={22} className="text-gray-500" /> 
            <span>
              Back to Menu
            </span>
          </button>
          <SidebarMenu />
          </>
          
        ) : (
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {/* Quick actions that were in the image reference */}

            <div
              className="flex md:hidden items-center gap-4 bg-white p-4 rounded-lg shadow-sm font-medium text-gray-700 hover:text-orange-500 transition-colors no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
                <Link href="/" className="block text-orange-500">
                  English
                </Link> 
                <div>|</div>
                <Link href="/" className="block">
                  বাংলা
                </Link> 
              </div>  


            <Link
              href="/"
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm font-medium text-gray-700 hover:text-orange-500 transition-colors no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={22} className="text-gray-500" />
              Home
            </Link>

            <button
              className="flex md:hidden items-center gap-4 bg-white p-4 rounded-lg shadow-sm font-medium text-gray-700 hover:text-orange-500 transition-colors no-underline"
              onClick={() => setShowCategories(true)}
            >
              <LayoutGrid size={22} className="text-gray-500" />
              Categories
            </button>

            <Link
              href="/products"
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm font-medium text-gray-700 hover:text-orange-500 transition-colors no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
              <PackageIcon size={22} className="text-gray-500" />
              All Products
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm font-medium text-gray-700 hover:text-orange-500 transition-colors no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
              <PhoneCall size={22} className="text-gray-500" />
              Contact Us
            </Link>

            {user ? (
              <>
                <Link
                  href="/my-account"
                  className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm font-medium text-gray-700 hover:text-orange-500 transition-colors no-underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={22} className="text-gray-500" />
                  Profile
                </Link>
                <Link
                  href="/my-account/change-password"
                  className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm font-medium text-gray-700 hover:text-orange-500 transition-colors no-underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Lock size={22} className="text-gray-500" />
                  Change Password
                </Link>
                <Link
                  href="/my-account/address"
                  className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm font-medium text-gray-700 hover:text-orange-500 transition-colors no-underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LocateIcon size={22} className="text-gray-500" />
                  Address
                </Link>
                <Link
                  href="/my-account/orders"
                  className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm font-medium text-gray-700 hover:text-orange-500 transition-colors no-underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingBag size={22} className="text-gray-500" />
                  Orders
                </Link>

                
                <button
                  onClick={() => {
                    Cookies.remove("user_token");
                    window.location.reload();
                  }}
                  className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm font-medium text-gray-700 hover:text-red-600 transition-colors w-full text-left cursor-pointer border-none"
                >
                  <LogOut size={22} className="text-red-500" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm font-medium text-gray-700 hover:text-orange-500 transition-colors no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={22} className="text-orange-500" />
                Log in
              </Link>
            )}
          </div>
        )}
      </div>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Header;
