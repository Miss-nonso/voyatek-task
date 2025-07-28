import React, { JSX, useState } from "react";
import Image from "next/image";
import {
  Search,
  Home,
  BarChart3,
  Wallet,
  MapPin,
  Heart,
  Bell,
  ShoppingCart,
  Plus,
  Menu,
  X
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItemProps {
  icon: JSX.ElementType;
  label: string;
  active: boolean;
  hasNotification: boolean;
}

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: BarChart3, label: "Dashboard", active: false },
    { icon: Wallet, label: "Wallet", active: false },
    { icon: MapPin, label: "Plan a trip", active: false },
    { icon: Heart, label: "Commission for life", active: false }
  ];

  const rightItems = [
    { icon: Bell, label: "Notification", hasNotification: true },
    { icon: ShoppingCart, label: "Carts", hasNotification: false },
    { icon: Plus, label: "Create", hasNotification: false }
  ];

  const NavItem = ({
    icon: Icon,
    label,
    active = false,
    hasNotification = false
  }: NavItemProps) => (
    <div
      className={`flex flex-col items-center gap-1 px-3 py-2 cursor-pointer transition-colors hover:text-blue-600 ${
        active ? "text-blue-600" : "text-gray-600"
      }`}
    >
      <div className="relative">
        <Icon size={20} />
        {hasNotification && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        )}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </div>
  );

  const MobileNavItem = ({
    icon: Icon,
    label,
    active = false,
    hasNotification = false
  }: NavItemProps) => (
    <div
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-gray-50 ${
        active ? "text-blue-600 bg-blue-50" : "text-gray-700"
      }`}
    >
      <div className="relative">
        <Icon size={20} />
        {hasNotification && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        )}
      </div>
      <span className="font-medium">{label}</span>
    </div>
  );

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-lg">
            go
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block relative">
            <div
              className={`flex items-center bg-gray-100 rounded-lg px-4 py-2 w-80 transition-all ${
                isSearchFocused
                  ? "ring-2 ring-blue-500 bg-white border border-blue-200"
                  : ""
              }`}
            >
              <Search size={16} className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-400"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              active={item.active}
              hasNotification={false}
            />
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Subscribe Button */}
          <button className="hidden sm:block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Subscribe
          </button>

          {/* Desktop Right Items */}
          <div className="hidden md:flex items-center gap-1">
            {rightItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
                hasNotification={item.hasNotification}
                active={false}
              />
            ))}
          </div>

          {/* Profile */}
          <div className="hidden md:flex items-center gap-2 cursor-pointer">
            <Image
              width={200}
              height={200}
              src="/api/placeholder/32/32"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-gray-400">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor">
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-lg">
                      go
                    </div>
                  </div>

                  {/* Mobile Search */}
                  <div className="mt-4">
                    <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                      <Search size={16} className="text-gray-400 mr-3" />
                      <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 py-4">
                  <div className="space-y-1">
                    {navItems.map((item, index) => (
                      <MobileNavItem
                        key={index}
                        icon={item.icon}
                        label={item.label}
                        active={item.active}
                        hasNotification={false}
                      />
                    ))}
                  </div>

                  <div className="border-t mt-4 pt-4 space-y-1">
                    {rightItems.map((item, index) => (
                      <MobileNavItem
                        key={index}
                        icon={item.icon}
                        label={item.label}
                        hasNotification={item.hasNotification}
                        active={false}
                      />
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-4">
                    Subscribe
                  </button>

                  <div className="flex items-center gap-3 cursor-pointer">
                    <img
                      src="/api/placeholder/40/40"
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">User Name</div>
                      <div className="text-sm text-gray-500">
                        user@example.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
