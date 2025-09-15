"use client";

import Button from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const verifySchema = z.object({
  otp: z
    .string()
    .min(8, "OTP must be 8 characters")
    .max(8, "OTP must be 8 characters"),
});

type VerifyFormData = z.infer<typeof verifySchema>;

export default function VerifyForm({ email }: { email: string }) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [generalError, setGeneralError] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: VerifyFormData) => {
    setIsVerifying(true);
    setGeneralError("");
    try {
      await axios.post(
        "/api/learner/verify",
        {
          email,
          otp: data.otp,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Handle success (adjust destination as needed)
      router.replace("/login?message=signup");
    } catch (err: any) {
      if (err.response?.data?.message) {
        const msg = Array.isArray(err.response.data.message)
          ? err.response.data.message.join(", ")
          : err.response.data.message;
        setGeneralError(msg);
      } else {
        setGeneralError("Verification failed. Please try again.");
      }
    } finally {
      setIsVerifying(false);
      reset({ otp: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "30px" }}>
      <div style={{ marginTop: "15px" }}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          readOnly
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: "#f8f8f8",
          }}
        />
      </div>

      <div style={{ marginTop: "15px" }}>
        <label htmlFor="otp">Enter OTP *</label>
        <input
          type="text"
          id="otp"
          {...register("otp")}
          style={{
            width: "100%",
            padding: "8px",
            border: `1px solid ${errors.otp ? "red" : "#ccc"}`,
            borderRadius: "4px",
          }}
          placeholder="Enter OTP from email"
        />
        {errors.otp && (
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.otp.message}
          </span>
        )}
      </div>

      {generalError && (
        <div
          style={{
            background: "rgba(255, 224, 224, 1)",
            color: "#ff3030",
            textAlign: "center",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "10px",
            marginTop: "15px",
          }}
        >
          <p>{generalError}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isVerifying}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
          cursor: isVerifying ? "not-allowed" : "pointer",
        }}
      >
        {isVerifying ? "Verifying..." : "Verify"}
      </Button>
    </form>
  );
}
