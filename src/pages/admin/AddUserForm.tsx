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
  name: z.string().min(20).max(60),
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-lg p-6 bg-white rounded shadow"
      >
        <h3 className="text-xl font-semibold mb-4">Add New User</h3>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role Select */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select.Root
                value={field.value}
                onValueChange={field.onChange}
                defaultValue=""
              >
                <Select.Trigger
                  className="inline-flex items-center justify-between rounded border border-gray-300 px-3 py-2 bg-white text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Role"
                >
                  <Select.Value placeholder="Select role" />
                  <Select.Icon>
                    <ChevronDownIcon />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content
                    className="overflow-hidden rounded-md border border-gray-300 bg-white shadow-md"
                    position="popper"
                  >
                    <Select.Viewport>
                      {["user", "owner", "admin"].map((role) => (
                        <Select.Item
                          key={role}
                          value={role}
                          className="relative flex cursor-pointer select-none items-center rounded-sm px-8 py-2 text-sm font-medium text-gray-700 data-[highlighted]:bg-indigo-600 data-[highlighted]:text-white"
                        >
                          <Select.ItemText>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
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
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Adding..." : "Add User"}
        </Button>

        {message && <p className="text-center mt-2">{message}</p>}
      </form>
    </Form>
  );
}
