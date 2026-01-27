import { Link } from "@inertiajs/react";
import { Bell, LogOut } from "lucide-react";

export default function ClientNavbar({ user }) {
    return (
        <nav className="w-full bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="w-8 h-8 object-contain"
                    />
                </div>
                <span className="text-[#101828] text-xl font-bold">
                    argeconnect
                </span>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 pl-4 border-l border-[#E5E7EB]">
                    <div className="text-right hidden sm:block">
                        <p className="text-[#101828] text-sm font-medium">
                            {user?.name}
                        </p>
                        <p className="text-[#6A7282] text-xs">Client</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {user?.name
                            ? user.name.substring(0, 2).toUpperCase()
                            : "G"}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">
                        <Bell className="w-5 h-5 text-[#667085]" />
                    </div>
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
