"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Settings,
  LogOut,
  CreditCard,
  FileImage,
  Plus,
} from "lucide-react"

const navigation = [
  {
    title: "Overview",
    items: [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Management",
    items: [
      { name: "Invoices", href: "/invoices", icon: FileText },
      { name: "Customers", href: "/customers", icon: Users },
      { name: "Payments", href: "/payments", icon: CreditCard },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Reports", href: "/reports", icon: BarChart3 },
      { name: "Templates", href: "/templates", icon: FileImage },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
]

export function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn")
    setIsLoggedIn(!!loggedIn)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/login")
  }

  if (!isLoggedIn || pathname === "/login") {
    return null
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="w-10 h-10 bg-nanocodes-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="font-bold text-lg text-nanocodes-primary">NanoCodes</h2>
            <p className="text-xs text-gray-600">Invoice System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <div className="mb-4 px-2">
          <Link href="/invoices/create">
            <Button className="w-full bg-nanocodes-primary hover:bg-nanocodes-secondary group-data-[collapsible=icon]:px-2">
              <Plus className="h-4 w-4 group-data-[collapsible=icon]:mr-0 mr-2" />
              <span className="group-data-[collapsible=icon]:hidden">New Invoice</span>
            </Button>
          </Link>
        </div>

        {navigation.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.name}
                        className={`w-full justify-start ${
                          isActive
                            ? "bg-nanocodes-primary text-white hover:bg-nanocodes-secondary"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Link href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-lg">
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          <span className="group-data-[collapsible=icon]:hidden">{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-3 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarFallback className="bg-nanocodes-primary text-white text-sm">AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@nanocodes.tech</p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-gray-700 hover:bg-gray-100 group-data-[collapsible=icon]:px-2"
        >
          <LogOut className="h-4 w-4 group-data-[collapsible=icon]:mr-0 mr-2 flex-shrink-0" />
          <span className="group-data-[collapsible=icon]:hidden">Logout</span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
