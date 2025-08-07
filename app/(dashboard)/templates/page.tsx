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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Eye, Edit, Star, Palette, Layout, Settings } from "lucide-react"
import { invoiceTemplates } from "@/lib/dummy-data"

export default function TemplatesPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [templates, setTemplates] = useState(invoiceTemplates)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState(null)
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    headerColor: "#0D0655",
    accentColor: "#3B82F6",
    logoPosition: "left",
    showCompanyDetails: true,
    showBankDetails: true,
    footerText: "",
  })

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  const handleCreateTemplate = () => {
    const template = {
      id: Date.now().toString(),
      ...newTemplate,
      isDefault: false,
    }
    setTemplates([...templates, template])
    setCreateDialogOpen(false)
    setNewTemplate({
      name: "",
      description: "",
      headerColor: "#0D0655",
      accentColor: "#3B82F6",
      logoPosition: "left",
      showCompanyDetails: true,
      showBankDetails: true,
      footerText: "",
    })
  }

  const handleSetDefault = (templateId: string) => {
    setTemplates(
      templates.map((template) => ({
        ...template,
        isDefault: template.id === templateId,
      })),
    )
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
              <BreadcrumbPage>Invoice Templates</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 space-y-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoice Templates</h1>
            <p className="text-gray-600 mt-1">Customize your invoice designs and branding</p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-nanocodes-primary hover:bg-nanocodes-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Template</DialogTitle>
                <DialogDescription>Design a custom invoice template for your business</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Template Name</Label>
                    <Input
                      id="name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      placeholder="Enter template name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoPosition">Logo Position</Label>
                    <Select
                      value={newTemplate.logoPosition}
                      onValueChange={(value) => setNewTemplate({ ...newTemplate, logoPosition: value })}
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
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    placeholder="Describe this template"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="headerColor">Header Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="headerColor"
                        type="color"
                        value={newTemplate.headerColor}
                        onChange={(e) => setNewTemplate({ ...newTemplate, headerColor: e.target.value })}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={newTemplate.headerColor}
                        onChange={(e) => setNewTemplate({ ...newTemplate, headerColor: e.target.value })}
                        placeholder="#0D0655"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={newTemplate.accentColor}
                        onChange={(e) => setNewTemplate({ ...newTemplate, accentColor: e.target.value })}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={newTemplate.accentColor}
                        onChange={(e) => setNewTemplate({ ...newTemplate, accentColor: e.target.value })}
                        placeholder="#3B82F6"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showCompanyDetails">Show Company Details</Label>
                    <Switch
                      id="showCompanyDetails"
                      checked={newTemplate.showCompanyDetails}
                      onCheckedChange={(checked) => setNewTemplate({ ...newTemplate, showCompanyDetails: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showBankDetails">Show Bank Details</Label>
                    <Switch
                      id="showBankDetails"
                      checked={newTemplate.showBankDetails}
                      onCheckedChange={(checked) => setNewTemplate({ ...newTemplate, showBankDetails: checked })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="footerText">Footer Text</Label>
                  <Textarea
                    id="footerText"
                    value={newTemplate.footerText}
                    onChange={(e) => setNewTemplate({ ...newTemplate, footerText: e.target.value })}
                    placeholder="Enter footer text for invoices"
                    rows={2}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateTemplate} className="bg-nanocodes-primary hover:bg-nanocodes-secondary">
                    Create Template
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="relative overflow-hidden">
              {template.isDefault && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Star className="h-3 w-3 mr-1" />
                    Default
                  </Badge>
                </div>
              )}
              <CardHeader style={{ backgroundColor: template.headerColor }} className="text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <p className="text-sm opacity-90">{template.description}</p>
                  </div>
                  <Layout className="h-8 w-8 opacity-75" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Colors:</span>
                    <div className="flex gap-1">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: template.headerColor }}
                      ></div>
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: template.accentColor }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Logo: {template.logoPosition}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {template.showCompanyDetails && "Company Details • "}
                    {template.showBankDetails && "Bank Details"}
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  {!template.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(template.id)}
                      className="text-yellow-600 hover:text-yellow-700"
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Template Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Template Preview</CardTitle>
            <CardDescription>See how your invoices will look with different templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-nanocodes-primary text-white p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">INVOICE</h2>
                      <p className="text-blue-100">NC-2024-SAMPLE</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">₦50,000,000</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold mb-2">From:</h3>
                      <p className="font-semibold">NanoCodes Technologies</p>
                      <p className="text-sm text-gray-600">Suite 15, Tech Hub Plaza</p>
                      <p className="text-sm text-gray-600">Victoria Island, Lagos</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">To:</h3>
                      <p className="font-semibold">Sample Customer</p>
                      <p className="text-sm text-gray-600">sample@company.com</p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span>Web Development Services</span>
                      <span className="font-semibold">₦50,000,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
