import { Head, Link } from "@inertiajs/react";
import {
    LayoutDashboard,
    FolderOpen,
    Zap,
    Users,
    Bell,
    Search,
} from "lucide-react";

export default function AllProjects({ auth, projects }) {

    return (
        <div className="flex h-screen bg-[#F9FAFB] font-sans">
            <Head title="All Projects - ArgeConnect" />

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
                    <Link
                        href={route("dashboard")}
                        className="flex items-center gap-3 px-4 py-3 text-[#364153] hover:bg-gray-50 rounded-[10px] cursor-pointer transition-colors"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-base font-normal">
                            Dashboard Overview
                        </span>
                    </Link>

                    {/* Active State */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-[10px] shadow-sm cursor-pointer transition-colors">
                        <FolderOpen className="w-5 h-5" />
                        <span className="text-base font-normal">
                            All Projects
                        </span>
                    </div>

                    <Link
                        href={route("admin.feed")}
                        className="flex items-center justify-between px-4 py-3 text-[#364153] hover:bg-gray-50 rounded-[10px] cursor-pointer transition-colors"
                    >
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

                    <Link
                        href={route("admin.users")}
                        className="flex items-center gap-3 px-4 py-3 text-[#364153] hover:bg-gray-50 rounded-[10px] cursor-pointer transition-colors"
                    >
                        <Users className="w-5 h-5" />
                        <span className="text-base font-normal">
                            User Management
                        </span>
                    </Link>
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

            <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen">
                <div className="w-full mx-auto">
                    <div className="mb-8">
                        <h2 className="text-[#101828] text-3xl font-bold leading-9 mb-2">
                            All Projects
                        </h2>
                        <p className="text-[#4A5565] text-base font-normal">
                            Manage and monitor all active projects
                        </p>
                    </div>

                    <div className="mb-8 bg-white p-4 rounded-[14px] border border-[#E5E7EB] shadow-sm">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-[#99A1AF]" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="block w-full pl-10 pr-4 py-2.5 border border-[#D1D5DC] rounded-[10px] text-[#101828] placeholder:text-[#99A1AF] placeholder:opacity-50 focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* MAPPING DATA DARI DATABASE */}
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm flex flex-col gap-6"
                            >
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-[#101828] text-lg font-bold">
                                        {project.title}
                                    </h3>
                                    <p className="text-[#4A5565] text-sm font-normal">
                                        {project.client}
                                    </p>
                                </div>

                                <div>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#DBEAFE] text-[#2563EB]">
                                        {project.status}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-[#364153] font-normal">
                                            Progress
                                        </span>
                                        <span className="text-[#2563EB] font-bold">
                                            {project.progress}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-[#F3F4F6] rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] h-2 rounded-full"
                                            style={{
                                                width: `${project.progress}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-[#F3F4F6] flex gap-2">
                                    <button className="flex-1 bg-[#2563EB] hover:bg-blue-700 text-white py-2 rounded-[10px] text-base font-normal transition-colors">
                                        View Details
                                    </button>
                                    <button className="px-4 py-2 border border-[#D1D5DC] text-[#364153] rounded-[10px] text-base font-normal hover:bg-gray-50 transition-colors">
                                        Updates
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
