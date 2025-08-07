import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
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

export default function Notifications() {
   const handleSaveSettings = async (section: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

   
  }
   // Notification Settings State
    const [notificationSettings, setNotificationSettings] = useState({
      emailNotifications: true,
      smsNotifications: false,
      invoiceCreated: true,
      paymentReceived: true,
      invoiceOverdue: true,
      weeklyReports: true,
      monthlyReports: true,
      systemUpdates: false,
    })
  return (
    <Card>
                 <CardHeader>
                   <CardTitle className="flex items-center gap-2">
                     <Bell className="h-5 w-5" />
                     Notification Settings
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <div className="space-y-4">
                     <div className="flex items-center justify-between">
                       <div className="space-y-0.5">
                         <Label>Email Notifications</Label>
                         <p className="text-sm text-gray-500">Receive notifications via email</p>
                       </div>
                       <Switch
                         checked={notificationSettings.emailNotifications}
                         onCheckedChange={(checked) =>
                           setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                         }
                       />
                     </div>
                     <div className="flex items-center justify-between">
                       <div className="space-y-0.5">
                         <Label>SMS Notifications</Label>
                         <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                       </div>
                       <Switch
                         checked={notificationSettings.smsNotifications}
                         onCheckedChange={(checked) =>
                           setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                         }
                       />
                     </div>
                   </div>
                   <Separator />
                   <div className="space-y-4">
                     <h4 className="font-medium">Event Notifications</h4>
                     <div className="flex items-center justify-between">
                       <div className="space-y-0.5">
                         <Label>Invoice Created</Label>
                         <p className="text-sm text-gray-500">When a new invoice is created</p>
                       </div>
                       <Switch
                         checked={notificationSettings.invoiceCreated}
                         onCheckedChange={(checked) =>
                           setNotificationSettings({ ...notificationSettings, invoiceCreated: checked })
                         }
                       />
                     </div>
                     <div className="flex items-center justify-between">
                       <div className="space-y-0.5">
                         <Label>Payment Received</Label>
                         <p className="text-sm text-gray-500">When a payment is received</p>
                       </div>
                       <Switch
                         checked={notificationSettings.paymentReceived}
                         onCheckedChange={(checked) =>
                           setNotificationSettings({ ...notificationSettings, paymentReceived: checked })
                         }
                       />
                     </div>
                     <div className="flex items-center justify-between">
                       <div className="space-y-0.5">
                         <Label>Invoice Overdue</Label>
                         <p className="text-sm text-gray-500">When an invoice becomes overdue</p>
                       </div>
                       <Switch
                         checked={notificationSettings.invoiceOverdue}
                         onCheckedChange={(checked) =>
                           setNotificationSettings({ ...notificationSettings, invoiceOverdue: checked })
                         }
                       />
                     </div>
                   </div>
                   <Separator />
                   <div className="space-y-4">
                     <h4 className="font-medium">Report Notifications</h4>
                     <div className="flex items-center justify-between">
                       <div className="space-y-0.5">
                         <Label>Weekly Reports</Label>
                         <p className="text-sm text-gray-500">Receive weekly business reports</p>
                       </div>
                       <Switch
                         checked={notificationSettings.weeklyReports}
                         onCheckedChange={(checked) =>
                           setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                         }
                       />
                     </div>
                     <div className="flex items-center justify-between">
                       <div className="space-y-0.5">
                         <Label>Monthly Reports</Label>
                         <p className="text-sm text-gray-500">Receive monthly business reports</p>
                       </div>
                       <Switch
                         checked={notificationSettings.monthlyReports}
                         onCheckedChange={(checked) =>
                           setNotificationSettings({ ...notificationSettings, monthlyReports: checked })
                         }
                       />
                     </div>
                     <div className="flex items-center justify-between">
                       <div className="space-y-0.5">
                         <Label>System Updates</Label>
                         <p className="text-sm text-gray-500">Receive system update notifications</p>
                       </div>
                       <Switch
                         checked={notificationSettings.systemUpdates}
                         onCheckedChange={(checked) =>
                           setNotificationSettings({ ...notificationSettings, systemUpdates: checked })
                         }
                       />
                     </div>
                   </div>
                   {/* <Button onClick={() => handleSaveSettings("Notification")} disabled={loading}>
                     <Save className="h-4 w-4 mr-2" />
                     {loading ? "Saving..." : "Save Changes"}
                   </Button> */}
                 </CardContent>
               </Card>
  );
}
