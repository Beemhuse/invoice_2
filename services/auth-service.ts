import { setCookie } from "@/lib/cookie-utils";
import { useCreateData } from "@/hooks/use-api";
import { AUTH_ENDPOINTS } from "@/constant/_endpoints";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export const useOtpVerification = (email: string) => {
  const router = useRouter();
  const { mutate: verifyOtp, isPending: isVerifying } = useCreateData(
    AUTH_ENDPOINTS.VERIFY_OTP,
    "verify-otp"
  );

  const { mutate: resendOtp } = useCreateData(
    AUTH_ENDPOINTS.RESEND_OTP,
    "resend-otp"
  );

  const handleVerifyOtp = (otp: string, onError: (message: string) => void) => {
    verifyOtp({ otp }, {
      onSuccess: (res) => {
        setCookie("isLoggedIn", "true");
        setCookie("invoice_token", JSON.stringify(res.data.token));
        router.push("/login");
        toast({
          title: "Verification Successful",
        });
      },
      onError: (error) => {
        onError(error.message || "OTP verification failed. Please try again.");
      },
    });
  };

  const handleResendOtp = (onError: (message: string) => void) => {
    resendOtp(email, {
      onSuccess: () => {
        toast({
          title: "OTP Resent",
          description: "A new OTP has been sent to your email",
        });
      },
      onError: (error) => {
        onError(error.message || "Failed to resend OTP. Please try again.");
      },
    });
  };

  return {
    handleVerifyOtp,
    handleResendOtp,
    isVerifying,
  };
};