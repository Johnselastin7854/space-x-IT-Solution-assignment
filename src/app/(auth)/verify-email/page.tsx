"use client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";

const VerfiyEmail = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);

  const onVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post("/api/auth/verify-email", {
        code: value,
        email,
      });
      router.push("/sign-in");
      toast.success("success!");
      setValue("");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Please Check the Code");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        className="flex w-96 flex-col items-center justify-center rounded-md border border-gray-300 p-10 text-black"
        onSubmit={onVerify}
      >
        <h1 className="text-[20px] font-semibold">Verify your email</h1>
        <p className="mb-5 text-xs">
          Enter the 8 digit code you have received.
        </p>
        <InputOTP
          maxLength={8}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
          </InputOTPGroup>
        </InputOTP>

        <Button
          disabled={loading ? true : false}
          className="mt-5 w-full uppercase"
          type="submit"
        >
          {loading && <Loader2 className="animate-spin" />}
          Verify
        </Button>
      </form>
    </div>
  );
};

export default VerfiyEmail;
