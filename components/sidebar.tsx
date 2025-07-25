"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings, LogOut } from "lucide-react"
import { CiStar } from "react-icons/ci"
import Filmstrip from "@/components/icons/filmstrip.svg"
import Home from "@/components/icons/home.svg"
import Play from "@/components/icons/play.svg"
import { MdOutlineCalendarMonth } from "react-icons/md"
import { cn } from "@/lib/utils"

const mainNavigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Favorites", href: "/favorites", icon: CiStar },
  { name: "Catalog", href: "/recently-watched", icon: Filmstrip },
  { name: "Comming", href: "/my-list", icon: MdOutlineCalendarMonth },
  { name: "Play", href: "/channels", icon: Play },
]

const bottomUtilities = [
  { name: "Settings", href: "/account", icon: Settings },
  { name: "Logout", href: "/login", icon: LogOut, isLogout: true },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 h-screen w-16 bg-[#0D0D0D] border-r border-[#1d1d1d] flex flex-col justify-between items-center py-6 z-50">
      {/* Top Spacer */}
      <div className="flex-shrink-0">
        {/* Logo */}
        <Link href="/dashboard" className="block">
          <div className="w-10 h-10 bg-[#feb625] rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200">
            <span className="text-black font-bold text-lg">C</span>
          </div>
        </Link>
      </div>

      {/* Main Navigation - Centered */}
      <nav className="flex flex-col space-y-6 flex-1 justify-center">
        {mainNavigation.map((item) => {
          const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "p-3 rounded-lg transition-all duration-200 group relative",
                isActive
                  ? "bg-[#feb625] text-black shadow-lg"
                  : "text-[#787878] hover:text-white hover:bg-[#1d1d1d] hover:scale-110",
              )}
              title={item.name}
            >
              <item.icon className="w-5 h-5 justify-center" />

              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-3 py-2 bg-[#1d1d1d] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-10 shadow-lg border border-[#333]">
                {item.name}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#1d1d1d] rotate-45 border-l border-b border-[#333]"></div>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Utilities - Fixed at Bottom */}
      <div className="flex flex-col space-y-4 flex-shrink-0">
        {bottomUtilities.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "p-3 rounded-lg transition-all duration-200 group relative",
                item.isLogout
                  ? "bg-red-600 hover:bg-red-700 text-white hover:scale-110 shadow-lg hover:shadow-red-500/25"
                  : isActive
                    ? "bg-[#feb625] text-black shadow-lg"
                    : "text-[#787878] hover:text-white hover:bg-[#1d1d1d] hover:scale-110",
              )}
              title={item.name}
            >
              <item.icon className="w-5 h-5" />

              {/* Tooltip */}
              <div
                className={cn(
                  "absolute left-full ml-3 px-3 py-2 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-10 shadow-lg border",
                  item.isLogout ? "bg-red-600 text-white border-red-500" : "bg-[#1d1d1d] text-white border-[#333]",
                )}
              >
                {item.name}
                <div
                  className={cn(
                    "absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 rotate-45 border-l border-b",
                    item.isLogout ? "bg-red-600 border-red-500" : "bg-[#1d1d1d] border-[#333]",
                  )}
                ></div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
