"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { CheckCircle, Download, Mail, ArrowLeft, Calendar, CreditCard, Building } from "lucide-react"
import { company } from "@/lib/dummy-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"

export default function PaymentReceiptPage() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)

  // Mock receipt data - in real app, this would be fetched from API
  const receipt = {
    id: params.id,
    receiptNumber: `RCP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
    invoiceNumber: "NC-2024-001",
    customerName: "Adebayo Johnson",
    customerCompany: "TechCorp Nigeria Limited",
    amount: 15000000,
    paymentDate: new Date().toISOString(),
    paymentMethod: "Bank Transfer",
    paymentReference: `TXN-${Date.now()}`,
    projectName: "E-commerce Platform Development",
    serviceName: "Full Stack Development",
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    console.log("Downloading receipt:", receipt.receiptNumber)
  }

  const handleEmailReceipt = () => {
    // In a real app, this would email the receipt to the customer
    console.log("Emailing receipt to customer")
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

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
              <BreadcrumbPage>Receipt {receipt.receiptNumber}</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold text-gray-900">Payment Receipt</h1>
              <p className="text-gray-600 mt-1">{receipt.receiptNumber}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleEmailReceipt}>
              <Mail className="h-4 w-4 mr-2" />
              Email Receipt
            </Button>
            <Button variant="outline" onClick={handleDownloadReceipt}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-green-800">Payment Successful!</h2>
                  <p className="text-green-700">
                    Your payment of {formatCurrency(receipt.amount)} has been received and processed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Receipt Details */}
          <Card>
            <CardHeader className="bg-nanocodes-primary text-white">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">PAYMENT RECEIPT</CardTitle>
                  <p className="text-blue-100 mt-1">{receipt.receiptNumber}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{formatCurrency(receipt.amount)}</div>
                  <p className="text-blue-100">Payment Received</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {/* Company and Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Received By:</h3>
                  <div className="space-y-2">
                    <p className="font-semibold text-lg">{company.name}</p>
                    <p className="text-gray-600">{company.address}</p>
                    <p className="text-gray-600">{company.phone}</p>
                    <p className="text-gray-600">{company.email}</p>
                    <p className="text-gray-600">{company.website}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Received From:</h3>
                  <div className="space-y-2">
                    <p className="font-semibold text-lg">{receipt.customerName}</p>
                    <p className="text-gray-600">{receipt.customerCompany}</p>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="border-t border-b py-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-nanocodes-primary" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Payment Date</p>
                      <p className="font-semibold">{formatDate(receipt.paymentDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-nanocodes-primary" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Payment Method</p>
                      <p className="font-semibold">{receipt.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-nanocodes-primary" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Reference</p>
                      <p className="font-semibold">{receipt.paymentReference}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <p className="font-semibold text-green-600">Completed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Information */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Invoice Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Invoice Number</p>
                      <p className="font-semibold">{receipt.invoiceNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Project</p>
                      <p className="font-semibold">{receipt.projectName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Service</p>
                      <p className="font-semibold">{receipt.serviceName}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-nanocodes-primary/5 p-6 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Total Amount Received</h3>
                    <p className="text-gray-600">Payment processed successfully</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-nanocodes-primary">{formatCurrency(receipt.amount)}</div>
                    <p className="text-sm text-gray-600">Nigerian Naira (₦)</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t text-center">
                <p className="text-gray-600 mb-2">
                  Thank you for your payment! This receipt serves as proof of payment.
                </p>
                <p className="text-sm text-gray-500">
                  For any questions regarding this payment, please contact us at {company.email} or {company.phone}
                </p>
                <div className="mt-4 text-xs text-gray-400">
                  <p>Receipt generated on {new Date().toLocaleString()}</p>
                  <p>NanoCodes Invoice Management System</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
