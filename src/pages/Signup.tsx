// src/pages/Signup.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Button,
  Input,
  Select,
  Textarea,
} from "@/components/ui";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


const signupSchema = z.object({
  name: z.string()
  .min(2, "Name must be at least 2 characters")
  .max(60, "Name must be at most 60 characters"),

  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be 8-16 characters")
    .max(16)
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  address: z.string().max(400, "Address too long"),
  role: z.enum(["admin", "owner", "user"], "Select a valid role"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "user",
    },
  });

  async function onSubmit(data: SignupFormData) {
    try {
      await axios.post(
     `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/auth/signup`,

        data
      );
      alert("Signup successful! Please login.");
      form.reset();
    } catch (error: any) {
      alert(error.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Your Account</h1>
          <p className="text-gray-600 mt-2">Join our platform and get started today</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm p-8 shadow-2xl shadow-gray-900/10"
            noValidate
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-gray-700 font-semibold text-sm">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      {...field}
                      className="h-12 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
                      autoComplete="name"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500 font-medium" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-gray-700 font-semibold text-sm">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                      className="h-12 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500 font-medium" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-gray-700 font-semibold text-sm">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Create a strong password"
                      {...field}
                      className="h-12 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500 font-medium" />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-gray-700 font-semibold text-sm">Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your address"
                      {...field}
                      rows={3}
                      className="border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-gray-50 resize-none min-h-[80px]"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500 font-medium" />
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-gray-700 font-semibold text-sm">Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                      aria-label="Select Role"
                    >
                     <SelectTrigger className="h-12 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-gray-50">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>

                      <SelectContent className="w-full rounded-xl border border-gray-200 bg-white shadow-xl" position="popper">
                        <SelectItem value="user" className="cursor-pointer px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Normal User</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="owner" className="cursor-pointer px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Store Owner</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="admin" className="cursor-pointer px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Admin</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-sm text-red-500 font-medium" />
                </FormItem>
              )}
            />

            {/* Signup button */}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Account
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            {/* Login redirect */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 underline decoration-2 underline-offset-2"
              >
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
