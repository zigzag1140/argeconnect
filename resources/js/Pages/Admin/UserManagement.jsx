import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import {
    LayoutDashboard,
    FolderOpen,
    Zap,
    Users,
    Bell,
    Search,
} from "lucide-react";

export default function UserManagement({ auth, clients }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredClients = clients.filter(
        (client) =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.project.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="flex h-screen bg-[#F9FAFB] font-sans">
            <Head title="User Management - ArgeConnect" />

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

                    <Link
                        href={route("admin.projects")}
                        className="flex items-center gap-3 px-4 py-3 text-[#364153] hover:bg-gray-50 rounded-[10px] cursor-pointer transition-colors"
                    >
                        <FolderOpen className="w-5 h-5" />
                        <span className="text-base font-normal">
                            All Projects
                        </span>
                    </Link>

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

                    <div className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-[10px] shadow-sm cursor-pointer transition-colors">
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

            <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen">
                <div className="w-full mx-auto">
                    <div className="mb-8">
                        <h2 className="text-[#101828] text-3xl font-bold leading-9 mb-2">
                            Client Access List
                        </h2>
                        <p className="text-[#4A5565] text-base font-normal">
                            Monitor clients and their active project connections
                        </p>
                    </div>

                    <div className="mb-8 w-full max-w-[448px]">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-[#99A1AF]" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search client name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-4 py-2.5 border border-[#D1D5DC] rounded-[10px] text-[#101828] placeholder:text-[#99A1AF] placeholder:opacity-50 focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none sm:text-sm bg-white"
                            />
                        </div>
                    </div>

                    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                        <div className="grid grid-cols-12 bg-[#F9FAFB] border-b border-[#E5E7EB] py-3 px-6">
                            <div className="col-span-4 text-[#2563EB] text-sm font-bold uppercase tracking-wider">
                                Client Name
                            </div>
                            <div className="col-span-5 text-[#2563EB] text-sm font-bold uppercase tracking-wider">
                                Accessed Project
                            </div>
                            <div className="col-span-3 text-[#2563EB] text-sm font-bold uppercase tracking-wider">
                                Status
                            </div>
                        </div>

                        <div className="divide-y divide-[#F3F4F6]">
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client) => (
                                    <div
                                        key={client.id}
                                        className="grid grid-cols-12 items-center py-4 px-6 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="col-span-4 flex items-center gap-3">
                                            <div
                                                className={`w-10 h-10 rounded-full bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] flex items-center justify-center text-white font-bold text-sm shrink-0`}
                                            >
                                                {client.initials}
                                            </div>
                                            <span className="text-[#101828] text-base font-normal truncate">
                                                {client.name}
                                            </span>
                                        </div>
                                        <div className="col-span-5 text-[#364153] text-base font-normal truncate pr-4">
                                            {client.project}
                                        </div>
                                        <div className="col-span-3">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-normal bg-[#DCFCE7] text-[#008236]">
                                                {client.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-8 text-center text-gray-500">
                                    No clients found.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <div className="text-[#4A5565] text-sm font-normal">
                            Showing{" "}
                            <span className="text-[#101828] font-bold">
                                {filteredClients.length}
                            </span>{" "}
                            of{" "}
                            <span className="text-[#101828] font-bold">
                                {clients.length}
                            </span>{" "}
                            clients
                        </div>
                        <div className="text-[#6A7282] text-sm font-normal">
                            All clients currently have active project access
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
