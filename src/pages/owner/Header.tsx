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

export default function Header({ }: { username: string }) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <header className="flex justify-between items-center mb-8 bg-gradient-to-r from-white to-emerald-50 shadow-lg border border-emerald-100 px-8 py-6 rounded-2xl">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-emerald-700 bg-clip-text text-transparent">
            Store Owner Dashboard 👋
          </h1>
          <p className="text-gray-600 text-sm mt-1">Manage your stores and view ratings</p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-full transition-all duration-200 hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center border-2 border-emerald-200 hover:border-emerald-300 transition-colors">
            <FaUserCircle size={24} className="text-emerald-600" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 rounded-xl border border-gray-200 bg-white/95 backdrop-blur-sm shadow-xl">
          <DropdownMenuItem 
            onClick={() => setIsPasswordModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-3 cursor-pointer hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <span>Change Password</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center space-x-2 px-4 py-3 cursor-pointer hover:bg-red-50 rounded-lg transition-colors">
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Password Change Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-sm shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">Change Password</DialogTitle>
          </DialogHeader>
          <UpdatePasswordForm onClose={() => setIsPasswordModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </header>
  );
}
