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
import Image from 'next/image';
//import '/globals.css';
import '@/app/globals.css';



// Zod schema for Login validation
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
        data
      );
      localStorage.setItem("token", response.data.token);
      router.push("/dashboard");
    } catch (error) {
      alert(`Error: ${error.response?.data || error.message}`);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-pink-800 p-6">
     
        <Image src="/login.png"  alt="Login" width='525'height='30' className="rounded-[20px]  animate-spin-slow mr-[90px]"/>

      <Card className="w-full max-w-md bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold text-gray-800">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="border-2 border-gray-300 rounded-md p-4 w-full"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="border-2 border-gray-300 rounded-md p-4 w-full"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p
            onClick={() => router.push("/signup")}
            className="text-center text-sm text-blue-500 cursor-pointer"
          >
            Don't have an account? Sign Up
          </p>
        </CardFooter>
      </Card>
      
    </main>
  );
}



