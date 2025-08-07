"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Eye,
  Download,
  MoreHorizontal,
  CreditCard,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { allPayments, allInvoices, customers } from "@/lib/dummy-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"

export default function PaymentsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [filteredPayments, setFilteredPayments] = useState(allPayments)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    let filtered = allPayments

    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          payment.paymentReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
          allInvoices
            .find((inv) => inv.id === payment.invoiceId)
            ?.invoiceNumber.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((payment) => payment.status === statusFilter)
    }

    if (methodFilter !== "all") {
      filtered = filtered.filter((payment) => payment.paymentMethod.toLowerCase().includes(methodFilter.toLowerCase()))
    }

    setFilteredPayments(filtered)
  }, [searchTerm, statusFilter, methodFilter])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const totalPayments = allPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const completedPayments = allPayments.filter((p) => p.status === "completed")
  const pendingPayments = allPayments.filter((p) => p.status === "pending")
  const failedPayments = allPayments.filter((p) => p.status === "failed")

  const stats = [
    {
      title: "Total Payments",
      value: formatCurrency(totalPayments),
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      count: allPayments.length,
    },
    {
      title: "Completed",
      value: completedPayments.length.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      amount: formatCurrency(completedPayments.reduce((sum, p) => sum + p.amount, 0)),
    },
    {
      title: "Pending",
      value: pendingPayments.length.toString(),
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      amount: formatCurrency(pendingPayments.reduce((sum, p) => sum + p.amount, 0)),
    },
    {
      title: "Failed",
      value: failedPayments.length.toString(),
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      amount: formatCurrency(failedPayments.reduce((sum, p) => sum + p.amount, 0)),
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "paystack":
        return "💳"
      case "bank transfer":
        return "🏦"
      case "cash":
        return "💵"
      case "check":
        return "📝"
      default:
        return "💰"
    }
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Payments</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 space-y-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
            <p className="text-gray-600 mt-1">Track and manage all payment transactions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-nanocodes-primary hover:bg-nanocodes-secondary">
              <CreditCard className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                {stat.amount && <p className="text-sm text-gray-600 mt-1">{stat.amount}</p>}
                {stat.count && <p className="text-sm text-gray-600 mt-1">{stat.count} transactions</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Payments</CardTitle>
            <CardDescription>Search and filter payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by reference, invoice number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="paystack">Paystack</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Payments ({filteredPayments.length})</CardTitle>
            <CardDescription>
              {statusFilter !== "all" && `Showing ${statusFilter} payments • `}
              {methodFilter !== "all" && `${methodFilter} payments • `}
              Total: {formatCurrency(filteredPayments.reduce((sum, p) => sum + p.amount, 0))}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => {
                    const invoice = allInvoices.find((inv) => inv.id === payment.invoiceId)
                    const customer = customers.find((c) => c.id === invoice?.customerId)
                    return (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{payment.paymentReference}</p>
                            <p className="text-sm text-gray-500">ID: {payment.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{invoice?.invoiceNumber}</p>
                            <p className="text-sm text-gray-500">{invoice?.projectName}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{customer?.name}</p>
                            <p className="text-sm text-gray-500">{customer?.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-semibold text-lg">{formatCurrency(payment.amount)}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getMethodIcon(payment.paymentMethod)}</span>
                            <span className="font-medium">{payment.paymentMethod}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{formatDate(payment.paymentDate)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/payments/${payment.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/payments/receipt/${payment.id}`}>
                                  <Download className="h-4 w-4 mr-2" />
                                  View Receipt
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/invoices/${payment.invoiceId}`}>
                                  <CreditCard className="h-4 w-4 mr-2" />
                                  View Invoice
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Payment Activity</CardTitle>
            <CardDescription>Latest payment transactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allPayments.slice(0, 5).map((payment) => {
                const invoice = allInvoices.find((inv) => inv.id === payment.invoiceId)
                const customer = customers.find((c) => c.id === invoice?.customerId)
                return (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${payment.status === "completed" ? "bg-green-50" : payment.status === "pending" ? "bg-yellow-50" : "bg-red-50"}`}
                      >
                        <CreditCard
                          className={`h-4 w-4 ${payment.status === "completed" ? "text-green-600" : payment.status === "pending" ? "text-yellow-600" : "text-red-600"}`}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{formatCurrency(payment.amount)} received</p>
                        <p className="text-sm text-gray-600">
                          {customer?.name} • {invoice?.invoiceNumber} • {payment.paymentMethod}
                        </p>
                        <p className="text-xs text-gray-500">{formatDate(payment.paymentDate)}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </Badge>
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
