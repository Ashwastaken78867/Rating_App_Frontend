import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import LogoutButton from "../admin/LogoutButton";
import UpdatePasswordForm from "../user/UpdatePasswordForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Header({ username }: { username: string }) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <header className="flex justify-between items-center mb-8 bg-white shadow px-6 py-4 rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800">Welcome, {username} 👋</h1>

      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <FaUserCircle size={28} className="text-gray-700 cursor-pointer" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => setIsPasswordModalOpen(true)}>
            Change Password
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Password Change Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <UpdatePasswordForm onClose={() => setIsPasswordModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </header>
  );
}
