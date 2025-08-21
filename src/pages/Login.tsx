// src/pages/Login.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
  Button,
  Input,
} from "@/components/ui";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
// Login.tsx

async function onSubmit(data: LoginFormData) {
  try {
    const API_BASE_URL = 
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.user.role);

    alert("Login successful!");

    if (response.data.role === "admin") {
      window.location.href = "/admin/dashboard";
    } else if (response.data.role === "owner") {
      window.location.href = "/owner/dashboard";
    } else {
      window.location.href = "/user/dashboard";
    }

  } catch (error: any) {
    alert(error.response?.data?.message || "Login failed");
  }
}


 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm p-8 shadow-2xl shadow-gray-900/10"
            noValidate
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-gray-700 font-semibold text-sm">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      className="h-12 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500 font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-gray-700 font-semibold text-sm">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="h-12 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500 font-medium" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to our platform?</span>
              </div>
            </div>

            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 underline decoration-2 underline-offset-2"
              >
                Create account
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
