import { Head, Link } from "@inertiajs/react";
import {
    LayoutDashboard,
    FolderOpen,
    Zap,
    Users,
    Bell,
    FolderKanban,
    AlertCircle,
    CheckCircle2,
    Clock,
} from "lucide-react";

export default function Dashboard({ auth }) {
    return (
        <div className="flex h-screen bg-[#F9FAFB] font-sans">
            <Head title="Dashboard - ArgeConnect" />

            {/* SIDEBAR FIXED */}
            <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col fixed inset-y-0 left-0 z-10">
                <div className="h-20 flex items-center px-6 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <img
                                src="/images/logo.png"
                                alt="ArgeConnect Logo"
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
                    {/* MENU 1: DASHBOARD (AKTIF - BIRU) */}
                    <Link
                        href={route("dashboard")}
                        className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-[10px] shadow-sm cursor-pointer transition-colors"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-base font-normal">
                            Dashboard Overview
                        </span>
                    </Link>

                    {/* MENU 2: ALL PROJECTS (LINK) */}
                    <Link
                        href={route("admin.projects")}
                        className="flex items-center gap-3 px-4 py-3 text-[#364153] hover:bg-gray-50 rounded-[10px] cursor-pointer transition-colors"
                    >
                        <FolderOpen className="w-5 h-5" />
                        <span className="text-base font-normal">
                            All Projects
                        </span>
                    </Link>

                    {/* MENU 3: PRIORITY FEED */}
                    <Link
                        href={route("admin.feed")}
                        className="flex items-center justify-between px-4 py-3 text-[#364153] hover:bg-gray-50 rounded-[10px] cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5" />
                            <span className="text-base font-normal">
                                Priority Feed
                            </span>
                        </div>
                        <span className="bg-[#EF4444] text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                            5
                        </span>
                    </Link>

                    {/* MENU 4: USER MANAGEMENT */}
                    <div className="flex items-center gap-3 px-4 py-3 text-[#364153] hover:bg-gray-50 rounded-[10px] cursor-pointer transition-colors">
                        <Users className="w-5 h-5" />
                        <span className="text-base font-normal">
                            User Management
                        </span>
                    </div>
                </nav>

                <div className="p-4 border-t border-[#E5E7EB]">
                    <div className="flex items-center gap-3 p-3 rounded-[10px] hover:bg-gray-50 cursor-pointer transition-colors">
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
                        <Bell className="w-5 h-5 text-[#99A1AF]" />
                    </div>
                </div>
            </aside>

            {/* KONTEN UTAMA (DASHBOARD STATS) */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen">
                <div className="w-full mx-auto">
                    <div className="mb-8">
                        <h2 className="text-[#101828] text-3xl font-bold leading-9 mb-2">
                            Dashboard Overview
                        </h2>
                        <p className="text-[#4A5565] text-base font-normal">
                            Team Performance Summary
                        </p>
                    </div>

                    {/* STATS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-[#EFF6FF] rounded-[14px] flex items-center justify-center mb-4">
                                <FolderKanban className="w-6 h-6 text-[#2563EB]" />
                            </div>
                            <div className="text-[#101828] text-3xl font-bold mb-1">
                                12
                            </div>
                            <div className="text-[#364153] text-sm font-normal">
                                Active Projects
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-[#FAF5FF] rounded-[14px] flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-[#9810FA]" />
                            </div>
                            <div className="text-[#101828] text-3xl font-bold mb-1">
                                34
                            </div>
                            <div className="text-[#364153] text-sm font-normal">
                                Total Clients
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-[#FEF2F2] rounded-[14px] flex items-center justify-center mb-4">
                                <AlertCircle className="w-6 h-6 text-[#EF4444]" />
                            </div>
                            <div className="text-[#101828] text-3xl font-bold mb-1">
                                8
                            </div>
                            <div className="text-[#364153] text-sm font-normal">
                                Pending Revisions
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-[#F0FDF4] rounded-[14px] flex items-center justify-center mb-4">
                                <CheckCircle2 className="w-6 h-6 text-[#00A63E]" />
                            </div>
                            <div className="text-[#101828] text-3xl font-bold mb-1">
                                23
                            </div>
                            <div className="text-[#364153] text-sm font-normal">
                                Completed this Month
                            </div>
                        </div>
                    </div>

                    {/* RECENT ACTIVITY */}
                    <div className="bg-white w-full rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
                        <h3 className="text-[#101828] text-xl font-bold mb-6">
                            Recent Activity
                        </h3>

                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-[#FFE2E2] flex items-center justify-center shrink-0">
                                    <AlertCircle className="w-5 h-5 text-[#EF4444]" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="text-[#101828] font-medium">
                                            Rafiif
                                        </span>
                                        <span className="text-[#99A1AF] hidden sm:inline">
                                            •
                                        </span>
                                        <span className="text-[#2563EB] text-sm font-medium cursor-pointer hover:underline">
                                            E-Commerce Platform
                                        </span>
                                    </div>
                                    <p className="text-[#4A5565] text-sm mb-1">
                                        Requested revisions on checkout flow
                                    </p>
                                    <span className="text-[#6A7282] text-xs">
                                        10 minutes ago
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-[#00A63E]" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="text-[#101828] font-medium">
                                            Dafa
                                        </span>
                                        <span className="text-[#99A1AF] hidden sm:inline">
                                            •
                                        </span>
                                        <span className="text-[#2563EB] text-sm font-medium cursor-pointer hover:underline">
                                            Mobile App MVP
                                        </span>
                                    </div>
                                    <p className="text-[#4A5565] text-sm mb-1">
                                        Approved homepage design
                                    </p>
                                    <span className="text-[#6A7282] text-xs">
                                        1 hour ago
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-[#DBEAFE] flex items-center justify-center shrink-0">
                                    <Clock className="w-5 h-5 text-[#2563EB]" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="text-[#101828] font-medium">
                                            Alfat
                                        </span>
                                        <span className="text-[#99A1AF] hidden sm:inline">
                                            •
                                        </span>
                                        <span className="text-[#2563EB] text-sm font-medium cursor-pointer hover:underline">
                                            CRM Dashboard
                                        </span>
                                    </div>
                                    <p className="text-[#4A5565] text-sm mb-1">
                                        Added feedback on data visualization
                                    </p>
                                    <span className="text-[#6A7282] text-xs">
                                        3 hours ago
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
