'use client';

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

// Zod schema for Signup validation
const SignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  mobile_number: z
    .string()
    .regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  passcode: z.string().min(1, "Passcode is required"),
});

export default function Signup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`,
        data
      );
      alert("Signup successful. Please login.");
      router.push("/login");
    } catch (error) {
      alert(`Error: ${error.response?.data || error.message}`);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-700 to-purple-900 p-6">
<div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
<div className="w-1/2 bg-gradient-to-r from-purple-900 to-cyan-700 text-white flex flex-col items-center justify-center p-8">
          
          <h2 className="text-2xl font-semibold mt-4 text-center">lets connect welcome!</h2>
        </div>
     <Card className="w-full max-w-md bg-white shadow-md">
         <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold text-gray-800">
             Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
             <Input
               type="text"
               placeholder="Name"
              {...register("name")}
              className="border-2 border-gray-300 rounded-md p-4 w-full"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="border-2 border-gray-300 rounded-md p-4 w-full"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            <Input
              type="tel"
              placeholder="Mobile Number"
              {...register("mobile_number")}
              className="border-2 border-gray-300 rounded-md p-4 w-full"
            />
            {errors.mobile_number && (
              <p className="text-red-500">{errors.mobile_number.message}</p>
            )}
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="border-2 border-gray-300 rounded-md p-4 w-full"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            <Input
              type="text"
              placeholder="Passcode"
              {...register("passcode")}
              className="border-2 border-gray-300 rounded-md p-4 w-full"
            />
            {errors.passcode && <p className="text-red-500">{errors.passcode.message}</p>}
            <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p
            onClick={() => router.push("/login")}
            className="text-center text-sm text-blue-500 cursor-pointer"
          >
            Already have an account? Login
          </p>
        </CardFooter>
      </Card>
</div>
    </main>
  );
}

