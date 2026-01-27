import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import {
    LayoutDashboard,
    FolderOpen,
    Zap,
    Users,
    LogOut,
    AlertTriangle,
    X,
} from "lucide-react";

export default function AdminSidebar({ activePage, highPriorityCount = 0 }) {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const linkClasses = (page) =>
        `flex items-center gap-3 px-4 py-3 rounded-[10px] transition-colors ${
            activePage === page
                ? "bg-[#2563EB] text-white shadow-sm"
                : "text-[#364153] hover:bg-gray-50"
        }`;

    const confirmLogout = () => {
        router.post(route("logout"));
    };

    return (
        <>
            <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col fixed inset-y-0 left-0 z-10">
                <div className="h-20 flex items-center px-6 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <img
                                src="/images/logo.png"
                                alt="Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-[#101828] text-lg font-bold leading-tight">
                                argeconnect
                            </h1>
                            <span className="text-[#6A7282] text-xs font-normal">
                                Admin Portal
                            </span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <Link
                        href={route("dashboard")}
                        className={linkClasses("dashboard")}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-base font-normal">
                            Dashboard Overview
                        </span>
                    </Link>

                    <Link
                        href={route("admin.projects")}
                        className={linkClasses("projects")}
                    >
                        <FolderOpen className="w-5 h-5" />
                        <span className="text-base font-normal">
                            All Projects
                        </span>
                    </Link>

                    <Link
                        href={route("admin.feed")}
                        className={`justify-between ${linkClasses("feed")}`}
                    >
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5" />
                            <span className="text-base font-normal">
                                Priority Feed
                            </span>
                        </div>
                        {highPriorityCount > 0 && (
                            <span
                                className={`text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center ${activePage === "feed" ? "bg-white text-[#EF4444]" : "bg-[#EF4444] text-white"}`}
                            >
                                {highPriorityCount}
                            </span>
                        )}
                    </Link>

                    <Link
                        href={route("admin.users")}
                        className={linkClasses("users")}
                    >
                        <Users className="w-5 h-5" />
                        <span className="text-base font-normal">
                            User Management
                        </span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-[#E5E7EB]">
                    <div className="flex items-center gap-3 p-3 rounded-[10px] hover:bg-gray-50 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] flex items-center justify-center text-white font-bold text-sm shrink-0">
                            AD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[#101828] text-sm font-medium truncate">
                                Admin User
                            </p>
                            <p className="text-[#6A7282] text-xs font-normal truncate">
                                Developer
                            </p>
                        </div>

                        <button
                            onClick={() => setIsLogoutModalOpen(true)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            title="Log Out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </aside>

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
                                Are you sure you want to log out from the Admin
                                Portal? You will need to sign in again to access
                                the dashboard.
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
