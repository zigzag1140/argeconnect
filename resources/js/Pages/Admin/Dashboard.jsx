import { Head, Link } from "@inertiajs/react";
import AdminSidebar from "@/Components/Admin/AdminSidebar";
import {
    FolderKanban,
    Users,
    AlertCircle,
    CheckCircle2,
    Info,
    MessageSquare,
} from "lucide-react";

export default function Dashboard({
    auth,
    totalProjects,
    activeProjects,
    totalClients,
    recentActivities,
}) {
    return (
        <div className="flex h-screen bg-[#F9FAFB] font-sans">
            <Head title="Dashboard - ArgeConnect" />

            <AdminSidebar activePage="dashboard" />

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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-[#EFF6FF] rounded-[14px] flex items-center justify-center mb-4">
                                <FolderKanban className="w-6 h-6 text-[#2563EB]" />
                            </div>
                            <div className="text-[#101828] text-3xl font-bold mb-1">
                                {activeProjects}
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
                                {totalClients}
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
                                5
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
                                {totalProjects - activeProjects}
                            </div>
                            <div className="text-[#364153] text-sm font-normal">
                                Completed Projects
                            </div>
                        </div>
                    </div>

                    <div className="bg-white w-full rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[#101828] text-xl font-bold">
                                Recent Activity
                            </h3>
                            <Link
                                href={route("admin.projects")}
                                className="text-[#2563EB] text-sm font-medium hover:underline"
                            >
                                View Projects
                            </Link>
                        </div>

                        <div className="space-y-2">
                            {recentActivities.length > 0 ? (
                                recentActivities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 items-start sm:items-center"
                                    >
                                        {activity.type === "system" ? (
                                            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                                <Info size={20} />
                                            </div>
                                        ) : (
                                            <img
                                                src={
                                                    activity.user_avatar
                                                        ? `/storage/${activity.user_avatar}`
                                                        : "/images/default-avatar.png"
                                                }
                                                alt={activity.user_name}
                                                className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0 bg-gray-100"
                                            />
                                        )}

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <span className="text-[#101828] font-bold">
                                                    {activity.user_name}
                                                </span>
                                                <span className="text-[#99A1AF] hidden sm:inline">
                                                    •
                                                </span>
                                                {activity.project_id ? (
                                                    <Link
                                                        href={route(
                                                            "admin.projects.show",
                                                            activity.project_id,
                                                        )}
                                                        className="text-[#2563EB] text-sm font-medium truncate hover:underline"
                                                    >
                                                        {activity.project_title}
                                                    </Link>
                                                ) : (
                                                    <span className="text-[#2563EB] text-sm font-medium truncate">
                                                        {activity.project_title}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[#4A5565] text-sm mb-1 truncate">
                                                <span
                                                    className={
                                                        activity.type ===
                                                        "system"
                                                            ? "text-gray-500"
                                                            : ""
                                                    }
                                                >
                                                    {activity.description}
                                                </span>
                                            </p>
                                            <span className="text-[#6A7282] text-xs">
                                                {activity.action_type} •{" "}
                                                {activity.time}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm text-center py-8">
                                    No recent activity found.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
