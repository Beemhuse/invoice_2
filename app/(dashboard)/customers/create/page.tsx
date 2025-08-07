"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, Save, User } from "lucide-react";
import { toast } from "sonner";
import { useCreateData } from "@/hooks/use-api";
import { MANAGEMENT_ENDPOINTS } from "@/constant/_endpoints";

const customerFormSchema = z.object({
  full_name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone_number: z.string().min(1, "Phone number is required"),
  billing_address: z.string().min(1, "Address is required"),
  tax_id: z.string().optional(),
  notes: z.string().optional(),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

export default function CreateCustomerPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreateData(
    MANAGEMENT_ENDPOINTS._, // Make sure this matches your actual endpoint
    "create customer"
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      billing_address: "",
      tax_id: "",
      notes: "",
    },
  });

  const onSubmit = async (data: CustomerFormValues) => {
    try {
      mutate(data, {
        onSuccess: () => {
          toast.success("Customer created successfully");
          reset()
          router.push("/customers");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create customer");
        },
      });
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/customers">Customers</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create Customer</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Create New Customer
              </h1>
              <p className="text-gray-600">
                Add a new customer to your database
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="full_name"
                      {...register("full_name")}
                      placeholder="Enter full name"
                      className={errors.full_name ? "border-red-500" : ""}
                    />
                    {errors.full_name && (
                      <p className="text-sm text-red-500">
                        {errors.full_name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="Enter email address"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone_number">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone_number"
                      {...register("phone_number")}
                      placeholder="Enter phone number"
                      className={errors.phone_number ? "border-red-500" : ""}
                    />
                    {errors.phone_number && (
                      <p className="text-sm text-red-500">
                        {errors.phone_number.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tax_id">Tax ID/Company</Label>
                    <Input
                      id="tax_id"
                      {...register("tax_id")}
                      placeholder="Enter tax ID or company (optional)"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing_address">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="billing_address"
                    {...register("billing_address")}
                    placeholder="Enter full address"
                    rows={3}
                    className={errors.billing_address ? "border-red-500" : ""}
                  />
                  {errors.billing_address && (
                    <p className="text-sm text-red-500">
                      {errors.billing_address.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    {...register("notes")}
                    placeholder="Additional notes about the customer (optional)"
                    rows={3}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || isPending}
                    className="bg-nanocodes-primary hover:bg-nanocodes-secondary"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting || isPending
                      ? "Creating..."
                      : "Create Customer"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting || isPending}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}