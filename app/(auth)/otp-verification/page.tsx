"use client";

// import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { OtpVerificationForm } from "@/components/pages/otp-verification-form";


function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function OtpVerificationPage() {
  
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <OtpVerificationForm />
    </Suspense>
  );
}
