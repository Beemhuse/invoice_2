"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginFormData, loginSchema } from "@/schemas/auth";
import { useCreateData } from "@/hooks/use-api";
import { AUTH_ENDPOINTS } from "@/constant/_endpoints";
import { toast } from "@/components/ui/use-toast";
import { setCookie } from "@/lib/cookie-utils";

export default function LoginPage() {
  const [error, setError] = useState("");

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { mutate, isPending } = useCreateData(AUTH_ENDPOINTS.LOGIN, "login");

  const onSubmit = async (data: LoginFormData) => {
    setError("");
    const payload = {
      email: data.email,
      password: data.password,
    };
    try {
      mutate(payload, {
        onSuccess: (res) => {
          setCookie("isLoggedIn", "true");
          setCookie("invoice_token", JSON.stringify(res.data.access_token));
          console.log(res)
          router.push("/dashboard");
          toast({
            title: "Login Successful",
          });
        },
        onError: (error) => {
          setError(error.message || "Registration failed. Please try again.");
        },
      });
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nanocodes-primary/5 to-nanocodes-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-6 w-20 h-20 bg-nanocodes-primary rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <CardTitle className="text-2xl font-bold text-nanocodes-primary">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sign in to access the NanoCodes Invoice Management System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="admin@nanocodes.tech"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={"password"}
                          placeholder="Enter your password"
                          {...field}
                          className="h-11 pr-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-nanocodes-primary hover:bg-nanocodes-secondary text-white font-medium"
                disabled={isPending}
              >
                {isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Demo Credentials:
            </p>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">Email:</span> admin@nanocodes.tech
              </p>
              <p>
                <span className="font-medium">Password:</span> admin123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
