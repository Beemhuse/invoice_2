"use client";

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
import Link from "next/link";
import { z } from "zod";
import { useState } from "react";
import { useOtpVerification } from "@/services/auth-service";
import { useCountdown } from "@/hooks/use-countdown";

const otpSchema = z.object({
  otp: z.string().min(4, "OTP must be 6 digits").max(4, "OTP must be 6 digits"),
});

type OtpFormData = z.infer<typeof otpSchema>;


export const OtpVerificationForm = () => {
 // This runs on client side only
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');  const email = searchParams.get("email") || "";

  const [error, setError] = useState("");
  const { countdown, startCountdown, isCounting } = useCountdown(30);
  const { handleVerifyOtp, handleResendOtp, isVerifying } = useOtpVerification(email);

  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: OtpFormData) => {
    setError("");
    handleVerifyOtp(data.otp, setError);
  };

  const onResendOtp = () => {
    setError("");
    startCountdown();
    handleResendOtp(setError);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nanocodes-primary/5 to-nanocodes-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-6 w-20 h-20 bg-nanocodes-primary rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <CardTitle className="text-2xl font-bold text-nanocodes-primary">
            OTP Verification
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter the 4-digit code sent to {email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234"
                        {...field}
                        className="h-11 text-center tracking-[0.5em]"
                        maxLength={4}
                      />
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
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              {countdown > 0 ? (
                <span className="text-gray-500">Resend in {countdown}s</span>
              ) : (
                <button
                  onClick={onResendOtp}
                  disabled={isCounting}
                  className="text-nanocodes-primary hover:underline font-medium"
                >
                  {isCounting ? "Sending..." : "Resend OTP"}
                </button>
              )}
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm text-nanocodes-primary hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};