"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
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
import { ArrowLeft, Save, Eye, Palette, Layout, Settings, Star } from "lucide-react"
import { invoiceTemplates } from "@/lib/dummy-data"
import Link from "next/link"

export default function TemplateEditPage() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [template, setTemplate] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    headerColor: "#0D0655",
    accentColor: "#3B82F6",
    logoPosition: "left",
    showCompanyDetails: true,
    showBankDetails: true,
    footerText: "",
    isDefault: false,
  })

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
      setFormData({
        name: foundTemplate.name,
        description: foundTemplate.description,
        headerColor: foundTemplate.headerColor,
        accentColor: foundTemplate.accentColor,
        logoPosition: foundTemplate.logoPosition,
        showCompanyDetails: foundTemplate.showCompanyDetails,
        showBankDetails: foundTemplate.showBankDetails,
        footerText: foundTemplate.footerText,
        isDefault: foundTemplate.isDefault,
      })
    }
    setIsLoading(false)
  }, [router, params.id])

  const handleSave = () => {
    // In a real app, this would save to database
    console.log("Saving template:", formData)
    router.push("/templates")
  }

  const handlePreview = () => {
    router.push(`/templates/${params.id}/preview`)
  }

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
              <BreadcrumbPage>Edit: {template.name}</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold text-gray-900">Edit Template</h1>
              <p className="text-gray-600 mt-1">Customize your invoice template design and settings</p>
            </div>
            {formData.isDefault && (
              <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                <Star className="h-3 w-3" />
                Default Template
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave} className="bg-nanocodes-primary hover:bg-nanocodes-secondary">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>Configure the basic details of your template</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Template Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter template name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoPosition">Logo Position</Label>
                    <Select
                      value={formData.logoPosition}
                      onValueChange={(value) => setFormData({ ...formData, logoPosition: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe this template"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Design & Colors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Design & Colors
                </CardTitle>
                <CardDescription>Customize the visual appearance of your invoices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="headerColor">Header Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="headerColor"
                        type="color"
                        value={formData.headerColor}
                        onChange={(e) => setFormData({ ...formData, headerColor: e.target.value })}
                        className="w-16 h-10 p-1 rounded"
                      />
                      <Input
                        value={formData.headerColor}
                        onChange={(e) => setFormData({ ...formData, headerColor: e.target.value })}
                        placeholder="#0D0655"
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Main header background color</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={formData.accentColor}
                        onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                        className="w-16 h-10 p-1 rounded"
                      />
                      <Input
                        value={formData.accentColor}
                        onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                        placeholder="#3B82F6"
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Secondary color for highlights</p>
                  </div>
                </div>

                {/* Color Presets */}
                <div className="space-y-3">
                  <Label>Color Presets</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { name: "NanoCodes", header: "#0D0655", accent: "#3B82F6" },
                      { name: "Professional", header: "#1E40AF", accent: "#3B82F6" },
                      { name: "Modern", header: "#1E1B4B", accent: "#6366F1" },
                      { name: "Corporate", header: "#374151", accent: "#10B981" },
                    ].map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setFormData({ ...formData, headerColor: preset.header, accentColor: preset.accent })
                        }
                        className="flex items-center gap-2 h-auto p-3"
                      >
                        <div className="flex gap-1">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.header }}></div>
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.accent }}></div>
                        </div>
                        <span className="text-xs">{preset.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layout & Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="h-5 w-5" />
                  Layout & Content
                </CardTitle>
                <CardDescription>Configure what information to display on invoices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="showCompanyDetails" className="font-medium">
                        Show Company Details
                      </Label>
                      <p className="text-sm text-gray-500">Display your company information on invoices</p>
                    </div>
                    <Switch
                      id="showCompanyDetails"
                      checked={formData.showCompanyDetails}
                      onCheckedChange={(checked) => setFormData({ ...formData, showCompanyDetails: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="showBankDetails" className="font-medium">
                        Show Bank Details
                      </Label>
                      <p className="text-sm text-gray-500">Include payment information section</p>
                    </div>
                    <Switch
                      id="showBankDetails"
                      checked={formData.showBankDetails}
                      onCheckedChange={(checked) => setFormData({ ...formData, showBankDetails: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="isDefault" className="font-medium">
                        Set as Default Template
                      </Label>
                      <p className="text-sm text-gray-500">Use this template for new invoices by default</p>
                    </div>
                    <Switch
                      id="isDefault"
                      checked={formData.isDefault}
                      onCheckedChange={(checked) => setFormData({ ...formData, isDefault: checked })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="footerText">Footer Text</Label>
                  <Textarea
                    id="footerText"
                    value={formData.footerText}
                    onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
                    placeholder="Enter footer text that will appear at the bottom of invoices"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">
                    This text will appear at the bottom of all invoices using this template
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your changes look in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden transform scale-75 origin-top">
                    {/* Mini Invoice Preview */}
                    <div className="text-white p-4" style={{ backgroundColor: formData.headerColor }}>
                      <div className="flex justify-between items-start">
                        <div
                          className={`flex items-center gap-2 ${formData.logoPosition === "center" ? "mx-auto" : formData.logoPosition === "right" ? "ml-auto" : ""}`}
                        >
                          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-xs">N</span>
                          </div>
                          <div>
                            <h2 className="text-lg font-bold">INVOICE</h2>
                            <p className="text-xs text-white/80">NC-2024-XXX</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">₦60,000,000</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      {formData.showCompanyDetails && (
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <h4 className="font-semibold mb-1" style={{ color: formData.accentColor }}>
                              From:
                            </h4>
                            <p className="font-semibold">NanoCodes Technologies</p>
                            <p className="text-gray-600">Victoria Island, Lagos</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1" style={{ color: formData.accentColor }}>
                              To:
                            </h4>
                            <p className="font-semibold">Sample Customer</p>
                            <p className="text-gray-600">sample@company.com</p>
                          </div>
                        </div>
                      )}
                      <div className="border-t pt-2">
                        <div className="flex justify-between text-xs">
                          <span>Web Development</span>
                          <span className="font-semibold">₦60,000,000</span>
                        </div>
                      </div>
                      {formData.showBankDetails && (
                        <div className="border-t pt-2">
                          <h4 className="text-xs font-semibold mb-1" style={{ color: formData.accentColor }}>
                            Payment Info:
                          </h4>
                          <p className="text-xs text-gray-600">First Bank Nigeria</p>
                          <p className="text-xs text-gray-600">2034567890</p>
                        </div>
                      )}
                      {formData.footerText && (
                        <div className="border-t pt-2">
                          <p className="text-xs text-gray-500 text-center">{formData.footerText.slice(0, 50)}...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" onClick={handlePreview} className="w-full bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    Full Preview
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Template Info */}
            <Card>
              <CardHeader>
                <CardTitle>Template Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Template ID</p>
                  <p className="font-mono text-sm">{template.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <div className="flex items-center gap-2">
                    {formData.isDefault ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        <Star className="h-3 w-3" />
                        Default
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        Active
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
