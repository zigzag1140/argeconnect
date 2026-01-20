import { Head, Link } from "@inertiajs/react";
import {
    LayoutDashboard,
    FolderOpen,
    Zap,
    Users,
    Bell,
    MessageSquare,
    CheckCircle,
} from "lucide-react";

export default function PriorityFeed({ auth }) {
    const feeds = [
        {
            id: 1,
            user: "Sheila Jule",
            initials: "SJ",
            role: "FBS",
            project: "E-Commerce Website Revamp",
            priority: "High",
            content:
                "Jujur saya kurang suka dengan warna yang telah kalian pilih karena tidak sesuai dengan apa yang ada pada makna web saya",
            time: "5 minutes ago",
            color: "bg-blue-600",
        },
        {
            id: 2,
            user: "Naufal Rafiif",
            initials: "NR",
            role: "FTI",
            project: "Portfolio Website",
            priority: "Normal",
            content:
                "The image gallery looks great! Could we adjust the spacing between images slightly? Not urgent, but would improve the layout.",
            time: "2 hours ago",
            color: "bg-indigo-600",
        },
        {
            id: 3,
            user: "Rahmadatul Afdal",
            initials: "RA",
            role: "Tekom",
            project: "Patient Portal",
            priority: "Normal",
            content:
                "The color scheme works well. One small suggestion: could we make the primary button slightly darker for better contrast?",
            time: "4 hours ago",
            color: "bg-blue-500",
        },
    ];

    return (
        <div className="flex h-screen bg-[#F9FAFB] font-sans">
            <Head title="Priority Feed - ArgeConnect" />

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
                        className="flex items-center justify-between px-4 py-3 bg-[#2563EB] text-white rounded-[10px] shadow-sm cursor-pointer transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5" />
                            <span className="text-base font-normal">
                                Priority Feed
                            </span>
                        </div>
                        <span className="bg-white text-[#EF4444] text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
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
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-[#101828] text-3xl font-bold leading-9">
                                Priority Feed
                            </h2>
                        </div>
                        <p className="text-[#4A5565] text-base font-normal">
                            Client feedback sorted by AI-detected priority and
                            urgency
                        </p>
                    </div>

                    <div className="mb-8 p-4 bg-gradient-to-r from-[#FEF2F2] to-[#FFF7ED] border border-[#FFC9C9] rounded-[14px] flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#EF4444] rounded-full flex items-center justify-center shrink-0">
                            <Zap className="w-6 h-6 text-white fill-current" />
                        </div>
                        <div>
                            <h3 className="text-[#101828] text-base font-bold leading-6">
                                1 High Priority Comments Detected
                            </h3>
                            <p className="text-[#364153] text-sm font-normal leading-5">
                                AI has identified urgent issues requiring
                                immediate attention
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {feeds.map((item) => (
                            <div
                                key={item.id}
                                className={`rounded-2xl border overflow-hidden bg-white shadow-sm ${
                                    item.priority === "High"
                                        ? "border-[#FFC9C9] bg-[#FEF2F2]/50"
                                        : "border-[#E5E7EB]"
                                }`}
                            >
                                <div className="p-6">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0 bg-gradient-to-b from-[#2563EB] to-[#1D4ED8]`}
                                        >
                                            {item.initials}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[#101828] text-base font-bold">
                                                    {item.user}
                                                </span>
                                                <span className="w-2 h-2 bg-[#2563EB] rounded-full"></span>
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-3.5 h-3.5 text-[#4A5565]" />
                                                    <span className="text-[#4A5565] text-sm font-normal">
                                                        {item.role}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[#2563EB] text-sm font-normal">
                                                    {item.project}
                                                </span>
                                                {item.priority === "High" ? (
                                                    <span className="bg-[#EF4444] text-white text-xs font-bold px-3 py-1.5 rounded-[10px] uppercase tracking-wide flex items-center gap-2 shadow-sm">
                                                        <span className="w-3 h-3 bg-white border border-white rounded-sm"></span>
                                                        High Priority
                                                    </span>
                                                ) : (
                                                    <span className="bg-[#DBEAFE] text-[#2563EB] text-xs font-bold px-3 py-1.5 rounded-[10px] uppercase tracking-wide">
                                                        Normal Priority
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-[10px] border border-[#FFE2E2] p-4 mb-4">
                                        <p className="text-[#101828] text-base font-normal leading-relaxed">
                                            {item.content}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3.5 h-3.5 rounded-sm border border-[#6A7282] relative">
                                            <div className="absolute inset-0 m-auto w-0.5 h-1.5 bg-[#6A7282]"></div>
                                        </div>
                                        <span className="text-[#6A7282] text-sm font-normal">
                                            {item.time}
                                        </span>
                                    </div>

                                    <div className="pt-4 border-t border-[#E5E7EB] flex gap-3">
                                        <button className="flex-1 h-12 border-2 border-[#2563EB] text-[#2563EB] rounded-[10px] text-base font-normal flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                                            <MessageSquare className="w-4.5 h-4.5" />
                                            Reply
                                        </button>
                                        <button className="flex-1 h-12 border-2 border-[#00C950] text-[#008236] rounded-[10px] text-base font-normal flex items-center justify-center gap-2 hover:bg-green-50 transition-colors">
                                            <CheckCircle className="w-4.5 h-4.5" />
                                            Mark as Resolved
                                        </button>
                                        <button className="px-6 h-12 border border-[#D1D5DC] text-[#364153] rounded-[10px] text-base font-normal flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                                            View Context
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
