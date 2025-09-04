"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVerifyEmailMutation } from "@/tanstack-query/mutation";
import { redirect, useSearchParams } from "next/navigation";

function VerifyEmail() {
  const [otp, setOtp] = useState(Array.from({ length: 6 }, () => ""));
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate, isPending } = useVerifyEmailMutation();
  const searchParams = useSearchParams();
  const email = searchParams.get("e") as string;

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, otp.length);
  }, [otp.length]);

  useEffect(() => {
    // Countdown timer
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (!email) {
    redirect("/");
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (/^[0-9]{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("").slice(0, 6);
      setOtp(newOtp);

      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    console.log("Verifying OTP:", otpValue);

    mutate({ email, otp: otpValue });
  };

  const handleResendOTP = () => {
    setTimer(60);
    setCanResend(false);
    setOtp(Array.from({ length: 6 }, () => ""));
    inputRefs.current[0]?.focus();
    console.log("Resending OTP...");
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Verify your email
          </CardTitle>
          <CardDescription className="text-center">
            Enter the 6-digit code sent to your email
          </CardDescription>
          <CardDescription className="text-black text-center">
            Just type <strong>123456</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <div className="flex justify-between space-x-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="h-12 w-12 text-center text-xl font-semibold"
                    />
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary-btn hover:bg-primary-btn-hover hover:text-black cursor-pointer"
                disabled={otp.some((digit) => digit === "") || isPending}
              >
                {isPending ? "Verifying..." : "Verify"}
              </Button>

              <div className="text-center text-sm">
                {canResend ? (
                  <Button
                    variant="link"
                    onClick={handleResendOTP}
                    className="p-0 h-auto font-normal cursor-pointer"
                  >
                    Resend OTP
                  </Button>
                ) : (
                  <p>Resend OTP in {timer} seconds</p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default VerifyEmail;
