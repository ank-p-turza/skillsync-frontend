'use client';
import Button from "@/components/ui/Button";
import LinkBelow from "@/components/ui/link-below";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react"
import { useForm } from "react-hook-form";
import z from "zod";

const loginSchema = z
  .object({
    email: z
        .string()
        .email("Please enter a valid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")

  });

type LoginFormData = z.infer<typeof loginSchema>;
export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string>("");

  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  
  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setGeneralError("");
    try {
      const response = await axios.post("/api/auth/login",
        {
          email: data.email,
          password: data.password
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      
      if (response.data?.message) {
        alert(response.data.message);
      }
      else {
        // Redirect to dashboard and reload the page to update navigation
        window.location.href = "/profile";
        return;
      }
      reset();
    }
    catch(error : any){
      if(error.response){
        const {status , data} = error.response;
        if(status === 400 && data.message && Array.isArray(data.message)){
            data.message.forEach((msg: string) => {
            if (msg.toLowerCase().includes("email")) {
              setError("email", { message: msg });
            } else if (msg.toLowerCase().includes("password")) {
              setError("password", { message: msg });
            }
          });
        }
        else if (status === 401){
          setGeneralError("Invalid credentials");
        }else {
          alert(data.message || "An error occurred. Please try again.");
        }
      } else {
        alert("Network or unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div style={{ maxWidth: "450px", margin: "100px auto 0", padding: "25px" }}>
      <h1
        style={{
          fontSize: "2.2rem",
          textAlign: "center",
          marginBottom: "10px",
          fontWeight: "bold",
          color: "#1f2937",
        }}
      >
        Login
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "30px" }}>
        {message === 'signup' && (
          <div style={{
            background: "rgba(224, 255, 224, 1)", 
            color: "#039000", 
            textAlign: "center", 
            fontWeight: "bold", 
            borderRadius: "8px", 
            padding: "10px",
            marginBottom: "15px"
          }}>
            <p>Please Login again</p>
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            style={{
              width: "100%",
              padding: "8px",
              border: `1px solid ${errors.email ? "red" : "#ccc"}`,
              borderRadius: "4px",
            }}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            style={{
              width: "100%",
              padding: "8px",
              border: `1px solid ${errors.password ? "red" : "#ccc"}`,
              borderRadius: "4px",
            }}
            placeholder="Enter your password"
          />
          {errors.password && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.password.message}
            </span>
          )}
        </div>
        {/* General Error Display */}
        {generalError && (
          <div style={{
            background: "rgba(255, 224, 224, 1)", 
            color: "#ff3030", 
            textAlign: "center", 
            fontWeight: "bold", 
            borderRadius: "8px", 
            padding: "10px",
            marginBottom: "15px"
          }}>
            <p>{generalError}</p>
          </div>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Signing In..." : "Signin"}
        </Button>
      </form>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
          <LinkBelow descText="Create new account " linkText="Sign Up" href="/signup" variant="first" />
          <LinkBelow descText="Want to teach on SkillSync? " linkText="Become an Instructor" href="/instructor/signup" variant="second" />
      </div>
  
  </div>

  );
}
