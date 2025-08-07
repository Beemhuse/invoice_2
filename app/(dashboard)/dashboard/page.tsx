"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import {
  DollarSign,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { allInvoices as invoices, customers } from "@/lib/dummy-data"
import { formatCurrency, getStatusColor } from "@/lib/utils"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()


  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0)
  const totalInvoiced = invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0)
  const pendingAmount = invoices
    .filter((inv) => inv.status === "pending" || inv.status === "partially_paid")
    .reduce((sum, invoice) => sum + (invoice.totalAmount - invoice.paidAmount), 0)
  const overdueAmount = invoices
    .filter((inv) => inv.status === "overdue")
    .reduce((sum, invoice) => sum + (invoice.totalAmount - invoice.paidAmount), 0)

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+12.5%",
      changeType: "positive",
    },
    {
      title: "Total Invoiced",
      value: formatCurrency(totalInvoiced),
      icon: FileText,
      color: "text-nanocodes-primary",
      bgColor: "bg-blue-50",
      change: "+8.2%",
      changeType: "positive",
    },
    {
      title: "Pending Amount",
      value: formatCurrency(pendingAmount),
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      change: "-5.1%",
      changeType: "negative",
    },
    {
      title: "Overdue Amount",
      value: formatCurrency(overdueAmount),
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      change: "+2.3%",
      changeType: "positive",
    },
  ]

  const statusCounts = {
    paid: invoices.filter((inv) => inv.status === "paid").length,
    pending: invoices.filter((inv) => inv.status === "pending").length,
    overdue: invoices.filter((inv) => inv.status === "overdue").length,
    cancelled: invoices.filter((inv) => inv.status === "cancelled").length,
    partially_paid: invoices.filter((inv) => inv.status === "partially_paid").length,
  }

  const recentInvoices = invoices.slice(0, 5)

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 space-y-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your invoices.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/customers/create">
              <Button
                variant="outline"
                className="border-nanocodes-primary text-nanocodes-primary hover:bg-nanocodes-primary hover:text-white bg-transparent"
              >
                <Users className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </Link>
            <Link href="/invoices/create">
              <Button className="bg-nanocodes-primary hover:bg-nanocodes-secondary">
                <Plus className="h-4 w-4 mr-2" />
                New Invoice
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center mt-2">
                  {stat.changeType === "positive" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                  )}
                  <span
                    className={`text-sm font-medium ml-1 ${
                      stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Invoice Status Overview</CardTitle>
              <CardDescription>Current status of all invoices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Paid</span>
                </div>
                <Badge className="bg-green-100 text-green-800 font-semibold">{statusCounts.paid}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Partially Paid</span>
                </div>
                <Badge className="bg-blue-100 text-blue-800 font-semibold">{statusCounts.partially_paid}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium">Pending</span>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 font-semibold">{statusCounts.pending}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="font-medium">Overdue</span>
                </div>
                <Badge className="bg-red-100 text-red-800 font-semibold">{statusCounts.overdue}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-gray-600" />
                  <span className="font-medium">Cancelled</span>
                </div>
                <Badge className="bg-gray-100 text-gray-800 font-semibold">{statusCounts.cancelled}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-nanocodes-primary/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-nanocodes-primary" />
                  <span className="font-medium">Total Customers</span>
                </div>
                <Badge variant="outline" className="font-semibold">
                  {customers.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Collection Rate</span>
                </div>
                <Badge variant="outline" className="font-semibold">
                  {Math.round((totalRevenue / totalInvoiced) * 100)}%
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Avg Invoice Value</span>
                </div>
                <Badge variant="outline" className="font-semibold">
                  {formatCurrency(totalInvoiced / invoices.length)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Recent Invoices</CardTitle>
                <CardDescription>Latest invoice activities and updates</CardDescription>
              </div>
              <Link href="/invoices">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => {
                const customer = customers.find((c) => c.id === invoice.customerId)
                return (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-nanocodes-primary">{invoice.invoiceNumber}</span>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {customer?.name} • {invoice.projectName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Due: {new Date(invoice.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">{formatCurrency(invoice.totalAmount)}</p>
                      {invoice.paidAmount > 0 && (
                        <p className="text-sm text-green-600">Paid: {formatCurrency(invoice.paidAmount)}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
