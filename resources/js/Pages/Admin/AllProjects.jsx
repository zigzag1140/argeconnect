import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AdminSidebar from "@/Components/Admin/AdminSidebar";
import Swal from "sweetalert2";
import { Search, Clock, Plus, User, FolderOpen, Trash2 } from "lucide-react";

export default function AllProjects({ auth, projects }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");

    const getStatusColor = (status) => {
        switch (status) {
            case "In Progress":
                return "bg-blue-100 text-[#2563EB]";
            case "Completed":
                return "bg-green-100 text-green-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getDeadlineColor = (remaining) => {
        if (remaining === "Overdue") return "text-red-600 font-bold";
        return "text-gray-600";
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this! All data related to this project will be lost.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("admin.projects.destroy", id), {
                    onSuccess: () => {
                        Swal.fire(
                            "Deleted!",
                            "The project has been deleted.",
                            "success",
                        );
                    },
                });
            }
        });
    };

    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.client.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "All Status" || project.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="flex h-screen bg-[#F9FAFB] font-sans">
            <Head title="All Projects - ArgeConnect" />

            <AdminSidebar activePage="projects" />

            <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen">
                <div className="w-full mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                            All Projects
                        </h1>
                        <p className="text-gray-600 text-base font-normal">
                            Manage and monitor all active projects
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="flex-1 relative w-full">
                                <Search
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none text-sm"
                                />
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="w-full md:w-48 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none bg-white text-sm cursor-pointer"
                            >
                                <option value="All Status">All Status</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>

                            <Link
                                href={route("admin.projects.create")}
                                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1d4ed8] transition-colors shadow-sm whitespace-nowrap text-sm"
                            >
                                <Plus size={20} />
                                <span>New Project</span>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer flex flex-col h-full group"
                                >
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex items-start justify-between mb-4 gap-4">
                                            <div className="flex-1 min-w-0">
                                                <h3
                                                    className="text-lg font-semibold text-gray-900 mb-1 truncate"
                                                    title={project.title}
                                                >
                                                    {project.title}
                                                </h3>
                                                <p
                                                    className="text-sm text-gray-600 truncate"
                                                    title={project.client}
                                                >
                                                    {project.client}
                                                </p>
                                            </div>
                                            <span
                                                className={`shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(project.status)}`}
                                            >
                                                {project.status}
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-700">
                                                    Progress
                                                </span>
                                                <span className="text-sm font-semibold text-[#2563EB]">
                                                    {project.progress}%
                                                </span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] rounded-full transition-all"
                                                    style={{
                                                        width: `${project.progress}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                                            <div className="flex items-center gap-1.5">
                                                <User size={16} />
                                                <span className="truncate max-w-[120px]">
                                                    {project.client}
                                                </span>
                                            </div>
                                            <div
                                                className={`flex items-center gap-1.5 ${getDeadlineColor(project.remaining_time)}`}
                                            >
                                                <Clock size={16} />
                                                <span>
                                                    {project.remaining_time}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 mt-auto flex gap-3">
                                            <Link
                                                href={route(
                                                    "admin.projects.show",
                                                    project.id,
                                                )}
                                                className="flex-1 bg-[#2563EB] hover:bg-blue-700 text-white py-2 rounded-[10px] text-base font-normal transition-colors text-center"
                                            >
                                                View Details
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(project.id)
                                                }
                                                className="px-3 py-2 bg-red-50 text-red-600 rounded-[10px] hover:bg-red-100 transition-colors border border-red-100"
                                                title="Delete Project"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-[#99A1AF]">
                                <FolderOpen className="h-12 w-12 mb-3 opacity-20" />
                                <p className="text-lg font-medium">
                                    No projects found
                                </p>
                                <p className="text-sm">
                                    Try adjusting your search or filters.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
