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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Edit,
  Send,
  Download,
  CreditCard,
  Mail,
  MessageSquare,
  Calendar,
  Building,
  Phone,
  MapPin,
} from "lucide-react"
// Update the import to use allInvoices instead of invoices
import { allInvoices as invoices, customers, company } from "@/lib/dummy-data"
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils"
import Link from "next/link"

export default function InvoiceDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [invoice, setInvoice] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    const invoiceId = params.id
    const foundInvoice = invoices.find((inv) => inv.id === invoiceId)
    if (foundInvoice) {
      setInvoice(foundInvoice)
      const foundCustomer = customers.find((c) => c.id === foundInvoice.customerId)
      setCustomer(foundCustomer)
    }
    setIsLoading(false)
  }, [router, params.id])

  const handlePayment = () => {
    // In a real app, this would process the payment
    console.log("Processing payment:", { paymentAmount, paymentMethod })
    setPaymentDialogOpen(false)
    // Redirect to receipt page
    router.push(`/payments/receipt/${Date.now()}`)
  }

  const handleSendReminder = (method: "email" | "whatsapp") => {
    // In a real app, this would send the reminder
    console.log(`Sending ${method} reminder for invoice ${invoice.id}`)
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!invoice || !customer) {
    return <div className="flex items-center justify-center min-h-screen">Invoice not found</div>
  }

  const remainingBalance = invoice.totalAmount - invoice.paidAmount

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/invoices">Invoices</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{invoice.invoiceNumber}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 space-y-6 p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Link href="/invoices">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{invoice.invoiceNumber}</h1>
              <p className="text-gray-600 mt-1">{invoice.projectName}</p>
            </div>
            <Badge className={`${getStatusColor(invoice.status)} text-sm px-3 py-1`}>
              {invoice.status.replace("_", " ").toUpperCase()}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSendReminder("email")}>
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button variant="outline" onClick={() => handleSendReminder("whatsapp")}>
              <MessageSquare className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Link href={`/invoices/${invoice.id}/edit`}>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            {remainingBalance > 0 && (
              <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-nanocodes-primary hover:bg-nanocodes-secondary">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Record Payment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Record Payment</DialogTitle>
                    <DialogDescription>Record a payment for this invoice</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Payment Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        max={remainingBalance}
                      />
                      <p className="text-sm text-gray-600">Remaining balance: {formatCurrency(remainingBalance)}</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="method">Payment Method</Label>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          <SelectItem value="paystack">Paystack</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="check">Check</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={handlePayment}
                      className="w-full bg-nanocodes-primary hover:bg-nanocodes-secondary"
                    >
                      Record Payment
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Invoice Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Header */}
            <Card>
              <CardHeader className="bg-nanocodes-primary text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">INVOICE</CardTitle>
                    <p className="text-blue-100 mt-1">{invoice.invoiceNumber}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{formatCurrency(invoice.totalAmount)}</div>
                    {invoice.paidAmount > 0 && (
                      <p className="text-blue-100">Paid: {formatCurrency(invoice.paidAmount)}</p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">From:</h3>
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold">{company.name}</p>
                      <p className="text-gray-600">{company.address}</p>
                      <p className="text-gray-600">{company.phone}</p>
                      <p className="text-gray-600">{company.email}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">To:</h3>
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold">{customer.name}</p>
                      {customer.company && <p className="text-gray-600">{customer.company}</p>}
                      <p className="text-gray-600">{customer.address}</p>
                      <p className="text-gray-600">{customer.phone}</p>
                      <p className="text-gray-600">{customer.email}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Issue Date</p>
                    <p className="font-semibold">{formatDate(invoice.issueDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Due Date</p>
                    <p className="font-semibold">{formatDate(invoice.dueDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Expiry Date</p>
                    <p className="font-semibold">{formatDate(invoice.expiryDate)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invoice Items */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice Items</CardTitle>
                <CardDescription>{invoice.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-center">Qty</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoice.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.description}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                        <TableCell className="text-right font-semibold">{formatCurrency(item.total)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-end">
                    <div className="w-64 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-semibold">{formatCurrency(invoice.totalAmount)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total:</span>
                        <span>{formatCurrency(invoice.totalAmount)}</span>
                      </div>
                      {invoice.paidAmount > 0 && (
                        <>
                          <div className="flex justify-between text-green-600">
                            <span>Paid:</span>
                            <span>-{formatCurrency(invoice.paidAmount)}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold text-red-600 border-t pt-2">
                            <span>Balance Due:</span>
                            <span>{formatCurrency(remainingBalance)}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment History */}
            {invoice.paymentHistory && invoice.paymentHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>All payments received for this invoice</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {invoice.paymentHistory.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium">{formatCurrency(payment.amount)}</p>
                          <p className="text-sm text-gray-600">
                            {payment.paymentMethod} • {formatDate(payment.paymentDate)}
                          </p>
                          <p className="text-xs text-gray-500">Ref: {payment.paymentReference}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Send className="h-4 w-4 mr-2" />
                  Send Invoice
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Reminder
                </Button>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    {customer.company && <p className="text-sm text-gray-600">{customer.company}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <p className="text-sm">{customer.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <p className="text-sm">{customer.phone}</p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                  <p className="text-sm">{customer.address}</p>
                </div>
                <Link href={`/customers/${customer.id}`}>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    View Customer Details
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-semibold">{formatCurrency(invoice.totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(invoice.paidAmount)}</span>
                </div>
                {remainingBalance > 0 && (
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-gray-600">Balance Due:</span>
                    <span className="font-semibold text-red-600">{formatCurrency(remainingBalance)}</span>
                  </div>
                )}
                <div className="pt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(invoice.paidAmount / invoice.totalAmount) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((invoice.paidAmount / invoice.totalAmount) * 100)}% paid
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bank Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bank Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Bank Name</p>
                  <p className="font-semibold">{invoice.bankDetails.bankName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Account Name</p>
                  <p className="font-semibold">{invoice.bankDetails.accountName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Account Number</p>
                  <p className="font-semibold">{invoice.bankDetails.accountNumber}</p>
                </div>
                {invoice.bankDetails.sortCode && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Sort Code</p>
                    <p className="font-semibold">{invoice.bankDetails.sortCode}</p>
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
