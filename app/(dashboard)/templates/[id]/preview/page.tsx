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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Download, Edit, Star } from "lucide-react"
import { invoiceTemplates, company, customers } from "@/lib/dummy-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"

export default function TemplatePreviewPage() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [template, setTemplate] = useState(null)

  // Sample invoice data for preview
  const sampleInvoice = {
    invoiceNumber: "NC-2024-PREVIEW",
    projectName: "Sample Project Development",
    serviceName: "Full Stack Development",
    description: "This is a preview of how your invoice will look with this template",
    items: [
      {
        id: "1",
        description: "Frontend Development (React/Next.js)",
        quantity: 1,
        unitPrice: 25000000,
        total: 25000000,
      },
      { id: "2", description: "Backend API Development", quantity: 1, unitPrice: 20000000, total: 20000000 },
      { id: "3", description: "Database Design & Setup", quantity: 1, unitPrice: 8000000, total: 8000000 },
      { id: "4", description: "Testing & Quality Assurance", quantity: 1, unitPrice: 7000000, total: 7000000 },
    ],
    totalAmount: 60000000,
    paidAmount: 0,
    status: "pending",
    dueDate: "2024-04-15",
    expiryDate: "2024-05-15",
    issueDate: "2024-03-15",
    currency: "NGN",
  }

  const sampleCustomer = customers[0]

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    const templateId = params.id
    const foundTemplate = invoiceTemplates.find((t) => t.id === templateId)
    if (foundTemplate) {
      setTemplate(foundTemplate)
    }
    setIsLoading(false)
  }, [router, params.id])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!template) {
    return <div className="flex items-center justify-center min-h-screen">Template not found</div>
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/templates">Templates</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Preview: {template.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 space-y-6 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/templates">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Template Preview</h1>
              <p className="text-gray-600 mt-1">
                {template.name} - {template.description}
              </p>
            </div>
            {template.isDefault && (
              <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                <Star className="h-3 w-3" />
                Default Template
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Link href={`/templates/${template.id}/edit`}>
              <Button className="bg-nanocodes-primary hover:bg-nanocodes-secondary">
                <Edit className="h-4 w-4 mr-2" />
                Edit Template
              </Button>
            </Link>
          </div>
        </div>

        {/* Template Preview */}
        <div className="bg-gray-100 p-8 rounded-lg">
          <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
            {/* Invoice Header */}
            <div className="text-white p-8" style={{ backgroundColor: template.headerColor }}>
              <div className="flex justify-between items-start">
                <div
                  className={`flex items-center gap-4 ${template.logoPosition === "center" ? "mx-auto" : template.logoPosition === "right" ? "ml-auto" : ""}`}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">N</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">INVOICE</h1>
                    <p className="text-white/80">{sampleInvoice.invoiceNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{formatCurrency(sampleInvoice.totalAmount)}</div>
                  <p className="text-white/80">Total Amount</p>
                </div>
              </div>
            </div>

            {/* Invoice Content */}
            <div className="p-8">
              {/* Company and Customer Details */}
              {template.showCompanyDetails && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4" style={{ color: template.accentColor }}>
                      From:
                    </h3>
                    <div className="space-y-2">
                      <p className="font-bold text-lg">{company.name}</p>
                      <p className="text-gray-600">{company.address}</p>
                      <p className="text-gray-600">{company.phone}</p>
                      <p className="text-gray-600">{company.email}</p>
                      <p className="text-gray-600">{company.website}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4" style={{ color: template.accentColor }}>
                      To:
                    </h3>
                    <div className="space-y-2">
                      <p className="font-bold text-lg">{sampleCustomer.name}</p>
                      {sampleCustomer.company && <p className="text-gray-600">{sampleCustomer.company}</p>}
                      <p className="text-gray-600">{sampleCustomer.address}</p>
                      <p className="text-gray-600">{sampleCustomer.phone}</p>
                      <p className="text-gray-600">{sampleCustomer.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Invoice Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-500">Issue Date</p>
                  <p className="font-semibold">{formatDate(sampleInvoice.issueDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Due Date</p>
                  <p className="font-semibold">{formatDate(sampleInvoice.dueDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Project</p>
                  <p className="font-semibold">{sampleInvoice.projectName}</p>
                </div>
              </div>

              {/* Project Description */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-3" style={{ color: template.accentColor }}>
                  Project Description
                </h3>
                <p className="text-gray-700 leading-relaxed">{sampleInvoice.description}</p>
              </div>

              {/* Invoice Items */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4" style={{ color: template.accentColor }}>
                  Services & Items
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: `${template.accentColor}10` }}>
                      <TableHead className="font-semibold">Description</TableHead>
                      <TableHead className="text-center font-semibold">Qty</TableHead>
                      <TableHead className="text-right font-semibold">Unit Price</TableHead>
                      <TableHead className="text-right font-semibold">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleInvoice.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.description}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                        <TableCell className="text-right font-semibold">{formatCurrency(item.total)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Total */}
              <div className="flex justify-end mb-8">
                <div className="w-80">
                  <div className="space-y-3 p-6 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">{formatCurrency(sampleInvoice.totalAmount)}</span>
                    </div>
                    <div
                      className="flex justify-between text-xl font-bold border-t pt-3"
                      style={{ color: template.headerColor }}
                    >
                      <span>Total:</span>
                      <span>{formatCurrency(sampleInvoice.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              {template.showBankDetails && (
                <div className="mb-8 p-6 border rounded-lg" style={{ borderColor: template.accentColor }}>
                  <h3 className="font-semibold text-lg mb-4" style={{ color: template.accentColor }}>
                    Payment Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Bank Name</p>
                      <p className="font-semibold">First Bank Nigeria</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Account Name</p>
                      <p className="font-semibold">NanoCodes Technologies Ltd</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Account Number</p>
                      <p className="font-semibold">2034567890</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Sort Code</p>
                      <p className="font-semibold">011</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              {template.footerText && (
                <div className="text-center py-6 border-t">
                  <p className="text-gray-600 text-sm leading-relaxed">{template.footerText}</p>
                </div>
              )}

              {/* Company Footer */}
              <div className="text-center pt-6 border-t">
                <p className="text-xs text-gray-400 mb-2">Generated by NanoCodes Invoice Management System</p>
                <p className="text-xs text-gray-400">
                  {company.name} • {company.email} • {company.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Template Information */}
        <Card>
          <CardHeader>
            <CardTitle>Template Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Template Name</p>
                <p className="font-semibold">{template.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Header Color</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border" style={{ backgroundColor: template.headerColor }}></div>
                  <span className="font-semibold">{template.headerColor}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Accent Color</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border" style={{ backgroundColor: template.accentColor }}></div>
                  <span className="font-semibold">{template.accentColor}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Logo Position</p>
                <p className="font-semibold capitalize">{template.logoPosition}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="text-gray-700">{template.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
