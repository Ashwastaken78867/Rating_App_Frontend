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
    // import.meta.env.VITE_API_BASE_URL || 
    "http://localhost:5000";

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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-8 rounded-lg border border-gray-200 bg-white p-10 shadow-lg"
          noValidate
        >
          <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-6">
            Log In to Your Account
          </h2>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    className="border-gray-300 focus:ring-indigo-600 focus:border-indigo-600"
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                    className="border-gray-300 focus:ring-indigo-600 focus:border-indigo-600"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white font-semibold py-3 rounded-md shadow-sm transition"
          >
            Log In
          </Button>
        </form>
      </Form>
    </div>
  );
}
