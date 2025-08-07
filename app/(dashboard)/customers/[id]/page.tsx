"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User, Mail, Phone, MapPin, Building2, Edit, Plus, FileText, DollarSign, Calendar, TrendingUp, ArrowLeft } from 'lucide-react'
import { customers, allInvoices } from "@/lib/dummy-data"

export default function CustomerDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [customer, setCustomer] = useState<any>(null)
  const [customerInvoices, setCustomerInvoices] = useState<any[]>([])

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn")
    if (!loggedIn) {
      router.push("/login")
      return
    }
    setIsLoggedIn(true)

    // Find customer by ID
    const foundCustomer = customers.find((c) => c.id === params.id)
    if (foundCustomer) {
      setCustomer(foundCustomer)
      // Get customer's invoices
      const invoices = allInvoices.filter((invoice) => invoice.customerId === foundCustomer.id)
      setCustomerInvoices(invoices)
    }
  }, [router, params.id])

  if (!isLoggedIn) {
    return <div>Loading...</div>
  }

  if (!customer) {
    return (
      <SidebarInset>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Customer Not Found</h2>
            <p className="text-gray-600 mt-2">The customer you're looking for doesn't exist.</p>
            <Button asChild className="mt-4">
              <Link href="/customers">Back to Customers</Link>
            </Button>
          </div>
        </div>
      </SidebarInset>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { label: "Paid", className: "bg-green-100 text-green-800" },
      pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
      overdue: { label: "Overdue", className: "bg-red-100 text-red-800" },
      partially_paid: { label: "Partially Paid", className: "bg-blue-100 text-blue-800" },
      cancelled: { label: "Cancelled", className: "bg-gray-100 text-gray-800" },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <Badge className={config.className} variant="secondary">
        {config.label}
      </Badge>
    )
  }

  // Calculate customer metrics
  const totalInvoices = customerInvoices.length
  const totalAmount = customerInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0)
  const totalPaid = customerInvoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0)
  const totalOutstanding = totalAmount - totalPaid
  const paidInvoices = customerInvoices.filter((invoice) => invoice.status === "paid").length
  const pendingInvoices = customerInvoices.filter((invoice) => invoice.status === "pending").length
  const overdueInvoices = customerInvoices.filter((invoice) => invoice.status === "overdue").length

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/customers">Customers</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{customer.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/customers">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Customers
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
              <p className="text-gray-600">{customer.company}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/customers/${customer.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Customer
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/invoices/create?customerId=${customer.id}`}>
                <Plus className="h-4 w-4 mr-2" />
                Create Invoice
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInvoices}</div>
              <p className="text-xs text-muted-foreground">
                {paidInvoices} paid, {pendingInvoices} pending, {overdueInvoices} overdue
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Billed</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
              <p className="text-xs text-muted-foreground">Across all invoices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</div>
              <p className="text-xs text-muted-foreground">
                {totalAmount > 0 ? Math.round((totalPaid / totalAmount) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(totalOutstanding)}</div>
              <p className="text-xs text-muted-foreground">Amount pending payment</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{customer.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium">{customer.company}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{customer.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Customer Since</p>
                  <p className="font-medium">{new Date(customer.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Invoiced</span>
                  <span className="font-semibold">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Paid</span>
                  <span className="font-semibold text-green-600">{formatCurrency(totalPaid)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Outstanding</span>
                  <span className="font-semibold text-red-600">{formatCurrency(totalOutstanding)}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Payment Rate</span>
                    <span>{totalAmount > 0 ? Math.round((totalPaid / totalAmount) * 100) : 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${totalAmount > 0 ? (totalPaid / totalAmount) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            {customerInvoices.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices yet</h3>
                <p className="text-gray-600 mb-4">This customer doesn't have any invoices.</p>
                <Button asChild>
                  <Link href={`/invoices/create?customerId=${customer.id}`}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Invoice
                  </Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/invoices/${invoice.id}`}
                          className="text-nanocodes-primary hover:underline"
                        >
                          {invoice.invoiceNumber}
                        </Link>
                      </TableCell>
                      <TableCell>{invoice.projectName}</TableCell>
                      <TableCell>{formatCurrency(invoice.totalAmount)}</TableCell>
                      <TableCell>{formatCurrency(invoice.paidAmount)}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/invoices/${invoice.id}`}>View</Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/invoices/${invoice.id}/edit`}>Edit</Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
