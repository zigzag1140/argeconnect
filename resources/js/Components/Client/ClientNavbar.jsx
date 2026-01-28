import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import {
    LogOut,
    User,
    ChevronDown,
    AlertTriangle,
    X,
} from "lucide-react";

export default function ClientNavbar({ user }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogoutClick = () => {
        setIsDropdownOpen(false);
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        router.post(route("logout"));
    };

    return (
        <>
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
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 pl-4 border-l border-[#E5E7EB] focus:outline-none group"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-[#101828] text-sm font-medium group-hover:text-[#2563EB] transition-colors">
                                    {user?.name}
                                </p>
                                <p className="text-[#6A7282] text-xs">Client</p>
                            </div>

                            <img
                                src={
                                    user.avatar
                                        ? `/storage/${user.avatar}`
                                        : "/images/default.jpg"
                                }
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover border border-gray-200 group-hover:border-[#2563EB] transition-colors"
                            />
                            <ChevronDown
                                size={16}
                                className={`text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {isDropdownOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setIsDropdownOpen(false)}
                                ></div>

                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20 animate-in fade-in slide-in-from-top-2">
                                    <div className="px-4 py-2 border-b border-gray-50 sm:hidden">
                                        <p className="text-sm font-bold text-gray-900">
                                            {user?.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Client
                                        </p>
                                    </div>

                                    <Link
                                        href={route("client.profile")}
                                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2563EB] transition-colors"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <User size={16} />
                                        My Profile
                                    </Link>

                                    <div className="border-t border-gray-100 my-1"></div>

                                    <button
                                        onClick={handleLogoutClick}
                                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                                    >
                                        <LogOut size={16} />
                                        Log Out
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {isLogoutModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 overflow-hidden transform scale-100 transition-all">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                    <AlertTriangle className="w-5 h-5 text-red-600" />
                                </div>
                                <button
                                    onClick={() => setIsLogoutModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Confirm Log Out
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Are you sure you want to log out?
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsLogoutModalOpen(false)}
                                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmLogout}
                                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
