import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/utils/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Input, Button } from "@/components/ui";
import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

const addUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(16)
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[^A-Za-z0-9]/, "Must contain special character"),
  address: z.string().max(400),
  role: z.enum(["admin", "owner", "user"]),
});

type AddUserFormData = z.infer<typeof addUserSchema>;

export default function AddUserForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
  });

  async function onSubmit(data: AddUserFormData) {
    setLoading(true);
    setMessage(null);
    try {
      await api.post("/admin/users", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMessage("User added successfully");
      form.reset();
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Failed to add user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Add New User</h2>
        <p className="text-gray-600 text-lg">Create a new user account with specific role and permissions</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-purple-200/50"
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
                    placeholder="Enter full name (min 2 characters)" 
                    {...field} 
                    className="h-12 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
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
                    placeholder="Enter email address" 
                    {...field} 
                    className="h-12 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
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
                    className="h-12 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
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
                  <Input 
                    placeholder="Enter address" 
                    {...field} 
                    className="h-12 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500 font-medium" />
              </FormItem>
            )}
          />

          {/* Role Select */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-700 font-semibold text-sm">User Role</FormLabel>
                <Select.Root
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue=""
                >
                  <Select.Trigger
                    className="h-12 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-gray-50 px-4"
                    aria-label="Role"
                  >
                    <Select.Value placeholder="Select user role" />
                    <Select.Icon>
                      <ChevronDownIcon />
                    </Select.Icon>
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content
                      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
                      position="popper"
                    >
                      <Select.Viewport>
                        {["user", "owner", "admin"].map((role) => (
                          <Select.Item
                            key={role}
                            value={role}
                            className="relative flex cursor-pointer select-none items-center rounded-lg px-6 py-3 text-sm font-medium text-gray-700 data-[highlighted]:bg-purple-50 data-[highlighted]:text-purple-700 transition-colors"
                          >
                            <Select.ItemText>
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  role === 'admin' ? 'bg-purple-500' : 
                                  role === 'owner' ? 'bg-emerald-500' : 'bg-blue-500'
                                }`}></div>
                                <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                              </div>
                            </Select.ItemText>
                            <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                              <CheckIcon />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
                <FormMessage className="text-sm text-red-500 font-medium" />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding User...</span>
              </div>
            ) : (
              "Add New User"
            )}
          </Button>

          {message && (
            <div className={`text-center p-4 rounded-xl ${
              message.includes("successfully") 
                ? "bg-green-50 border border-green-200 text-green-700" 
                : "bg-red-50 border border-red-200 text-red-700"
            }`}>
              <p className="font-medium">{message}</p>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
