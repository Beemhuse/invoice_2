"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  ArrowLeft,
  Download,
  CreditCard,
  Calendar,
  Building,
  User,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Copy,
  ExternalLink,
} from "lucide-react"
import { allPayments, allInvoices, customers, company } from "@/lib/dummy-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"

export default function PaymentDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [payment, setPayment] = useState(null)
  const [invoice, setInvoice] = useState(null)
  const [customer, setCustomer] = useState(null)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    const paymentId = params.id
    const foundPayment = allPayments.find((p) => p.id === paymentId)
    if (foundPayment) {
      setPayment(foundPayment)
      const foundInvoice = allInvoices.find((inv) => inv.id === foundPayment.invoiceId)
      if (foundInvoice) {
        setInvoice(foundInvoice)
        const foundCustomer = customers.find((c) => c.id === foundInvoice.customerId)
        setCustomer(foundCustomer)
      }
    }
    setIsLoading(false)
  }, [router, params.id])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // In a real app, you'd show a toast notification
    console.log("Copied to clipboard:", text)
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!payment || !invoice || !customer) {
    return <div className="flex items-center justify-center min-h-screen">Payment not found</div>
  }

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "pending":
        return Clock
      case "failed":
        return AlertCircle
      default:
        return Clock
    }
  }

  const StatusIcon = getStatusIcon(payment.status)

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/payments">Payments</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{payment.paymentReference}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 space-y-6 p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Link href="/payments">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payment Details</h1>
              <p className="text-gray-600 mt-1">{payment.paymentReference}</p>
            </div>
            <Badge className={`${getStatusColor(payment.status)} text-sm px-3 py-1`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Link href={`/payments/receipt/${payment.id}`}>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                View Receipt
              </Button>
            </Link>
            <Link href={`/invoices/${invoice.id}`}>
              <Button className="bg-nanocodes-primary hover:bg-nanocodes-secondary">
                <FileText className="h-4 w-4 mr-2" />
                View Invoice
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Summary */}
            <Card>
              <CardHeader className="bg-nanocodes-primary text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">PAYMENT RECEIVED</CardTitle>
                    <p className="text-blue-100 mt-1">{payment.paymentReference}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{formatCurrency(payment.amount)}</div>
                    <p className="text-blue-100">{payment.paymentMethod}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Payment Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Payment ID:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">{payment.id}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(payment.id)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Reference:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">{payment.paymentReference}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(payment.paymentReference)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Method:</span>
                        <span className="font-semibold">{payment.paymentMethod}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-semibold">{formatDate(payment.paymentDate)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge className={getStatusColor(payment.status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Amount Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Amount:</span>
                        <span className="font-semibold text-lg">{formatCurrency(payment.amount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Currency:</span>
                        <span className="font-semibold">Nigerian Naira (₦)</span>
                      </div>
                      <div className="flex justify-between border-t pt-3">
                        <span className="text-gray-900 font-semibold">Total Received:</span>
                        <span className="font-bold text-xl text-green-600">{formatCurrency(payment.amount)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {payment.notes && (
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-semibold text-gray-900 mb-2">Payment Notes</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{payment.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Related Invoice */}
            <Card>
              <CardHeader>
                <CardTitle>Related Invoice</CardTitle>
                <CardDescription>Invoice details for this payment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-nanocodes-primary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-nanocodes-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{invoice.invoiceNumber}</p>
                      <p className="text-gray-600">{invoice.projectName}</p>
                      <p className="text-sm text-gray-500">
                        Total: {formatCurrency(invoice.totalAmount)} • Paid: {formatCurrency(invoice.paidAmount)} •
                        Balance: {formatCurrency(invoice.totalAmount - invoice.paidAmount)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${invoice.status === "paid" ? "bg-green-100 text-green-800" : invoice.status === "partially_paid" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {invoice.status.replace("_", " ").toUpperCase()}
                    </Badge>
                    <Link href={`/invoices/${invoice.id}`}>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Timeline</CardTitle>
                <CardDescription>Transaction processing history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Payment Completed</p>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(payment.amount)} received via {payment.paymentMethod}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(payment.paymentDate)} at {new Date(payment.paymentDate).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Payment Initiated</p>
                      <p className="text-sm text-gray-600">Payment reference {payment.paymentReference} generated</p>
                      <p className="text-xs text-gray-500">{formatDate(payment.paymentDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Invoice Generated</p>
                      <p className="text-sm text-gray-600">
                        Invoice {invoice.invoiceNumber} created for {formatCurrency(invoice.totalAmount)}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(invoice.issueDate)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/payments/receipt/${payment.id}`}>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </Button>
                </Link>
                <Link href={`/invoices/${invoice.id}`}>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    View Invoice
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Reference
                </Button>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    {customer.company && <p className="text-sm text-gray-600">{customer.company}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-gray-500" />
                  <p className="text-sm">{customer.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <p className="text-sm">{customer.phone}</p>
                </div>
                <Link href={`/customers/${customer.id}`}>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    View Customer Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Received By</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="font-semibold">{company.name}</p>
                  <p className="text-sm text-gray-600">{company.address}</p>
                </div>
                <div className="text-sm text-gray-600">
                  <p>{company.email}</p>
                  <p>{company.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Method:</span>
                  <span className="font-semibold">{payment.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Reference:</span>
                  <span className="font-mono text-sm">{payment.paymentReference}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Processing Time:</span>
                  <span className="text-sm">Instant</span>
                </div>
                {payment.paymentMethod === "Paystack" && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Paystack Transaction</strong>
                      <br />
                      Processed securely through Paystack payment gateway
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
