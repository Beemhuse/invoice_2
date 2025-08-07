import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

type Props = {};

export default function Invoice() {
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
   const handleSaveSettings = async (section: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

   
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Invoice Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="invoice-prefix">Invoice Prefix</Label>
            <Input
              id="invoice-prefix"
              value={invoiceSettings.prefix}
              onChange={(e) =>
                setInvoiceSettings({
                  ...invoiceSettings,
                  prefix: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="starting-number">Starting Number</Label>
            <Input
              id="starting-number"
              value={invoiceSettings.startingNumber}
              onChange={(e) =>
                setInvoiceSettings({
                  ...invoiceSettings,
                  startingNumber: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="due-days">Default Due Days</Label>
            <Input
              id="due-days"
              type="number"
              value={invoiceSettings.dueDays}
              onChange={(e) =>
                setInvoiceSettings({
                  ...invoiceSettings,
                  dueDays: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={invoiceSettings.currency}
              onValueChange={(value) =>
                setInvoiceSettings({ ...invoiceSettings, currency: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                <SelectItem value="USD">US Dollar ($)</SelectItem>
                <SelectItem value="EUR">Euro (€)</SelectItem>
                <SelectItem value="GBP">British Pound (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
            <Input
              id="tax-rate"
              type="number"
              step="0.1"
              value={invoiceSettings.taxRate}
              onChange={(e) =>
                setInvoiceSettings({
                  ...invoiceSettings,
                  taxRate: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="late-fee">Late Fee Amount</Label>
            <Input
              id="late-fee"
              type="number"
              value={invoiceSettings.lateFeeAmount}
              onChange={(e) =>
                setInvoiceSettings({
                  ...invoiceSettings,
                  lateFeeAmount: e.target.value,
                })
              }
              disabled={!invoiceSettings.lateFeesEnabled}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Include Signature</Label>
              <p className="text-sm text-gray-500">
                Add signature line to invoices
              </p>
            </div>
            <Switch
              checked={invoiceSettings.includeSignature}
              onCheckedChange={(checked) =>
                setInvoiceSettings({
                  ...invoiceSettings,
                  includeSignature: checked,
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto Reminders</Label>
              <p className="text-sm text-gray-500">
                Send automatic payment reminders
              </p>
            </div>
            <Switch
              checked={invoiceSettings.autoReminders}
              onCheckedChange={(checked) =>
                setInvoiceSettings({
                  ...invoiceSettings,
                  autoReminders: checked,
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Late Fees</Label>
              <p className="text-sm text-gray-500">
                Apply late fees to overdue invoices
              </p>
            </div>
            <Switch
              checked={invoiceSettings.lateFeesEnabled}
              onCheckedChange={(checked) =>
                setInvoiceSettings({
                  ...invoiceSettings,
                  lateFeesEnabled: checked,
                })
              }
            />
          </div>
        </div>
        <Button
          onClick={() => handleSaveSettings("Invoice")}
        //   disabled={loading}
        >
          <Save className="h-4 w-4 mr-2" />
          {/* {loading ? "Saving..." : "Save Changes"} */}
        </Button>
      </CardContent>
    </Card>
  );
}
