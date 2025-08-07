export interface Invoice {
  id: string
  invoiceNumber: string
  projectName: string
  serviceName: string
  description: string
  items: InvoiceItem[]
  totalAmount: number
  paidAmount: number
  status: "pending" | "paid" | "overdue" | "cancelled" | "partially_paid"
  dueDate: string
  expiryDate: string
  issueDate: string
  exchangeRate: number
  currency: string
  customerId: string
  bankDetails: BankDetails
  termsLink: string
  paymentLink: string
  remindersSent: number
  lastReminderDate?: string
  paymentHistory: Payment[]
  notes?: string
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  company?: string
  totalInvoices: number
  totalPaid: number
  totalPending: number
  createdAt: string
}

export interface BankDetails {
  id: string
  bankName: string
  accountName: string
  accountNumber: string
  sortCode?: string
}

export interface Company {
  name: string
  email: string
  address: string
  phone: string
  logo: string
  website: string
  taxId?: string
}

export interface Payment {
  id: string
  invoiceId: string
  amount: number
  paymentMethod: string
  paymentReference: string
  paymentDate: string
  status: "completed" | "pending" | "failed"
  notes?: string
}

export interface PaymentReceipt {
  id: string
  paymentId: string
  invoiceNumber: string
  customerName: string
  amount: number
  paymentDate: string
  paymentMethod: string
  receiptNumber: string
}

export interface InvoiceTemplate {
  id: string
  name: string
  description: string
  isDefault: boolean
  headerColor: string
  accentColor: string
  logoPosition: "left" | "center" | "right"
  showCompanyDetails: boolean
  showBankDetails: boolean
  footerText: string
}
