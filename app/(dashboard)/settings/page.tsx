"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Building2,
  FileText,
  Bell,
  CreditCard,
  Shield,
  Palette,
  Save,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react";
import Invoice from "@/components/pages/settings/invoice";
import Notifications from "@/components/pages/settings/notifications";

export default function SettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Company Information State
  const [companyInfo, setCompanyInfo] = useState({
    name: "NanoCodes Technologies",
    email: "admin@nanocodes.tech",
    phone: "+234 801 234 5678",
    website: "https://nanocodes.tech",
    address: "123 Tech Street, Victoria Island, Lagos, Nigeria",
    taxId: "12345678-0001",
    logo: "",
  });

  // Invoice Settings State
  const [invoiceSettings, setInvoiceSettings] = useState({
    prefix: "INV",
    startingNumber: "1001",
    dueDays: "30",
    currency: "NGN",
    taxRate: "7.5",
    includeSignature: true,
    autoReminders: true,
    lateFeesEnabled: false,
    lateFeeAmount: "5000",
  });

  // Payment Settings State
  const [paymentSettings, setPaymentSettings] = useState({
    paystackEnabled: true,
    paystackPublicKey: "pk_test_xxxxxxxxxxxxxxxxxxxxx",
    paystackSecretKey: "sk_test_xxxxxxxxxxxxxxxxxxxxx",
    bankName: "First Bank of Nigeria",
    accountName: "NanoCodes Technologies Ltd",
    accountNumber: "1234567890",
    acceptCash: true,
    acceptTransfer: true,
    acceptCard: true,
  });

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: "60",
    passwordExpiry: "90",
    loginAttempts: "5",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Theme Settings State
  const [themeSettings, setThemeSettings] = useState({
    theme: "light",
    primaryColor: "#1e40af",
    fontSize: "medium",
    compactMode: false,
    showAnimations: true,
    language: "en",
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) {
      router.push("/login");
      return;
    }
    setIsLoggedIn(true);

    // Load settings from localStorage
    const savedSettings = localStorage.getItem("appSettings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setCompanyInfo(settings.companyInfo || companyInfo);
      setInvoiceSettings(settings.invoiceSettings || invoiceSettings);
      setNotificationSettings(
        settings.notificationSettings || notificationSettings
      );
      setPaymentSettings(settings.paymentSettings || paymentSettings);
      setSecuritySettings(settings.securitySettings || securitySettings);
      setThemeSettings(settings.themeSettings || themeSettings);
    }
  }, [router]);

  const handleSaveSettings = async (section: string) => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const allSettings = {
      companyInfo,
      invoiceSettings,
      notificationSettings,
      paymentSettings,
      securitySettings,
      themeSettings,
    };

    localStorage.setItem("appSettings", JSON.stringify(allSettings));

    setLoading(false);
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">
            Manage your application preferences and configurations
          </p>
        </div>

        <Tabs defaultValue="company" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Company
            </TabsTrigger>
            <TabsTrigger value="invoice" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Invoice
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Theme
            </TabsTrigger>
          </TabsList>

          {/* Company Information Tab */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      value={companyInfo.name}
                      onChange={(e) =>
                        setCompanyInfo({ ...companyInfo, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-email">Email Address</Label>
                    <Input
                      id="company-email"
                      type="email"
                      value={companyInfo.email}
                      onChange={(e) =>
                        setCompanyInfo({
                          ...companyInfo,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-phone">Phone Number</Label>
                    <Input
                      id="company-phone"
                      value={companyInfo.phone}
                      onChange={(e) =>
                        setCompanyInfo({
                          ...companyInfo,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-website">Website</Label>
                    <Input
                      id="company-website"
                      value={companyInfo.website}
                      onChange={(e) =>
                        setCompanyInfo({
                          ...companyInfo,
                          website: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-tax">Tax ID</Label>
                    <Input
                      id="company-tax"
                      value={companyInfo.taxId}
                      onChange={(e) =>
                        setCompanyInfo({
                          ...companyInfo,
                          taxId: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">Address</Label>
                  <Textarea
                    id="company-address"
                    value={companyInfo.address}
                    onChange={(e) =>
                      setCompanyInfo({
                        ...companyInfo,
                        address: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-gray-400" />
                    </div>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={() => handleSaveSettings("Company")}
                  disabled={loading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoice Settings Tab */}
          <TabsContent value="invoice">
            <Invoice />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Notifications />
          </TabsContent>

          {/* Payment Settings Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Paystack Integration</Label>
                      <p className="text-sm text-gray-500">
                        Enable Paystack payment gateway
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          paymentSettings.paystackEnabled
                            ? "default"
                            : "secondary"
                        }
                      >
                        {paymentSettings.paystackEnabled
                          ? "Enabled"
                          : "Disabled"}
                      </Badge>
                      <Switch
                        checked={paymentSettings.paystackEnabled}
                        onCheckedChange={(checked) =>
                          setPaymentSettings({
                            ...paymentSettings,
                            paystackEnabled: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                  {paymentSettings.paystackEnabled && (
                    <div className="grid grid-cols-1 gap-4 pl-4 border-l-2 border-gray-200">
                      <div className="space-y-2">
                        <Label htmlFor="paystack-public">
                          Paystack Public Key
                        </Label>
                        <div className="relative">
                          <Input
                            id="paystack-public"
                            type={showApiKey ? "text" : "password"}
                            value={paymentSettings.paystackPublicKey}
                            onChange={(e) =>
                              setPaymentSettings({
                                ...paymentSettings,
                                paystackPublicKey: e.target.value,
                              })
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowApiKey(!showApiKey)}
                          >
                            {showApiKey ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paystack-secret">
                          Paystack Secret Key
                        </Label>
                        <div className="relative">
                          <Input
                            id="paystack-secret"
                            type="password"
                            value={paymentSettings.paystackSecretKey}
                            onChange={(e) =>
                              setPaymentSettings({
                                ...paymentSettings,
                                paystackSecretKey: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Bank Account Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank-name">Bank Name</Label>
                      <Input
                        id="bank-name"
                        value={paymentSettings.bankName}
                        onChange={(e) =>
                          setPaymentSettings({
                            ...paymentSettings,
                            bankName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-name">Account Name</Label>
                      <Input
                        id="account-name"
                        value={paymentSettings.accountName}
                        onChange={(e) =>
                          setPaymentSettings({
                            ...paymentSettings,
                            accountName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-number">Account Number</Label>
                      <Input
                        id="account-number"
                        value={paymentSettings.accountNumber}
                        onChange={(e) =>
                          setPaymentSettings({
                            ...paymentSettings,
                            accountNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Accepted Payment Methods</h4>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Cash Payments</Label>
                      <p className="text-sm text-gray-500">
                        Accept cash payments
                      </p>
                    </div>
                    <Switch
                      checked={paymentSettings.acceptCash}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({
                          ...paymentSettings,
                          acceptCash: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Bank Transfer</Label>
                      <p className="text-sm text-gray-500">
                        Accept bank transfers
                      </p>
                    </div>
                    <Switch
                      checked={paymentSettings.acceptTransfer}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({
                          ...paymentSettings,
                          acceptTransfer: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Card Payments</Label>
                      <p className="text-sm text-gray-500">
                        Accept card payments via Paystack
                      </p>
                    </div>
                    <Switch
                      checked={paymentSettings.acceptCard}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({
                          ...paymentSettings,
                          acceptCard: checked,
                        })
                      }
                    />
                  </div>
                </div>
                <Button
                  onClick={() => handleSaveSettings("Payment")}
                  disabled={loading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          securitySettings.twoFactorEnabled
                            ? "default"
                            : "secondary"
                        }
                      >
                        {securitySettings.twoFactorEnabled
                          ? "Enabled"
                          : "Disabled"}
                      </Badge>
                      <Switch
                        checked={securitySettings.twoFactorEnabled}
                        onCheckedChange={(checked) =>
                          setSecuritySettings({
                            ...securitySettings,
                            twoFactorEnabled: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Session Management</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">
                        Session Timeout (minutes)
                      </Label>
                      <Select
                        value={securitySettings.sessionTimeout}
                        onValueChange={(value) =>
                          setSecuritySettings({
                            ...securitySettings,
                            sessionTimeout: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                          <SelectItem value="480">8 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-attempts">Max Login Attempts</Label>
                      <Select
                        value={securitySettings.loginAttempts}
                        onValueChange={(value) =>
                          setSecuritySettings({
                            ...securitySettings,
                            loginAttempts: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 attempts</SelectItem>
                          <SelectItem value="5">5 attempts</SelectItem>
                          <SelectItem value="10">10 attempts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Password Policy</h4>
                  <div className="space-y-2">
                    <Label htmlFor="password-expiry">
                      Password Expiry (days)
                    </Label>
                    <Select
                      value={securitySettings.passwordExpiry}
                      onValueChange={(value) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordExpiry: value,
                        })
                      }
                    >
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="0">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Change Password</h4>
                  <div className="grid grid-cols-1 gap-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword ? "text" : "password"}
                          value={securitySettings.currentPassword}
                          onChange={(e) =>
                            setSecuritySettings({
                              ...securitySettings,
                              currentPassword: e.target.value,
                            })
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={securitySettings.newPassword}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            newPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={securitySettings.confirmPassword}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => handleSaveSettings("Security")}
                  disabled={loading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Theme Settings Tab */}
          <TabsContent value="theme">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Theme & Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      value={themeSettings.theme}
                      onValueChange={(value) =>
                        setThemeSettings({ ...themeSettings, theme: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="font-size">Font Size</Label>
                    <Select
                      value={themeSettings.fontSize}
                      onValueChange={(value) =>
                        setThemeSettings({ ...themeSettings, fontSize: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={themeSettings.language}
                      onValueChange={(value) =>
                        setThemeSettings({ ...themeSettings, language: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="primary-color"
                        type="color"
                        value={themeSettings.primaryColor}
                        onChange={(e) =>
                          setThemeSettings({
                            ...themeSettings,
                            primaryColor: e.target.value,
                          })
                        }
                        className="w-16 h-10"
                      />
                      <Input
                        value={themeSettings.primaryColor}
                        onChange={(e) =>
                          setThemeSettings({
                            ...themeSettings,
                            primaryColor: e.target.value,
                          })
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Compact Mode</Label>
                      <p className="text-sm text-gray-500">
                        Use compact layout to fit more content
                      </p>
                    </div>
                    <Switch
                      checked={themeSettings.compactMode}
                      onCheckedChange={(checked) =>
                        setThemeSettings({
                          ...themeSettings,
                          compactMode: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Animations</Label>
                      <p className="text-sm text-gray-500">
                        Enable smooth animations and transitions
                      </p>
                    </div>
                    <Switch
                      checked={themeSettings.showAnimations}
                      onCheckedChange={(checked) =>
                        setThemeSettings({
                          ...themeSettings,
                          showAnimations: checked,
                        })
                      }
                    />
                  </div>
                </div>
                <Button
                  onClick={() => handleSaveSettings("Theme")}
                  disabled={loading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  );
}
