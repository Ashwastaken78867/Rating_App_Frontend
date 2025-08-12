// src/pages/Signup.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

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

import { ChevronDownIcon } from "@radix-ui/react-icons";

const signupSchema = z.object({
  name: z.string().min(20, "Name must be at least 20 characters").max(60),
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
      await axios.post("http://localhost:5000/auth/signup", data);
      alert("Signup successful! Please login.");
      form.reset();
    } catch (error: any) {
      alert(error.response?.data?.message || "Signup failed");
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
            Create Your Account
          </h2>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    {...field}
                    className="border-gray-300 focus:ring-indigo-600 focus:border-indigo-600"
                    autoComplete="name"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />

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
                    placeholder="Create a strong password"
                    {...field}
                    className="border-gray-300 focus:ring-indigo-600 focus:border-indigo-600"
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-gray-700 font-medium">Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your address"
                    {...field}
                    rows={3}
                    className="border-gray-300 focus:ring-indigo-600 focus:border-indigo-600 resize-none"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-gray-700 font-medium">Role</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                    aria-label="Select Role"
                  >
                    <SelectTrigger
                      className="
                        flex items-center justify-between w-full rounded-md border border-gray-300 bg-white
                        px-4 py-2 text-sm font-medium text-gray-700
                        shadow-sm transition-colors
                        focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600
                        hover:border-indigo-400
                      "
                    >
                      <SelectValue placeholder="Select a role" />
                      <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                    </SelectTrigger>

                    <SelectContent
                      className="w-full rounded-md border border-gray-300 bg-white shadow-lg"
                      position="popper"
                    >
                      <SelectItem
                        value="user"
                        className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 rounded-md"
                      >
                        Normal User
                      </SelectItem>
                      <SelectItem
                        value="owner"
                        className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 rounded-md"
                      >
                        Store Owner
                      </SelectItem>
                      <SelectItem
                        value="admin"
                        className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 rounded-md"
                      >
                        Admin
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white font-semibold py-3 rounded-md shadow-sm transition"
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
}
