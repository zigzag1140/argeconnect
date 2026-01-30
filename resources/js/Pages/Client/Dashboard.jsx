import { useState } from "react";
import { Head, usePage, useForm, router } from "@inertiajs/react";
import ClientNavbar from "@/Components/Client/ClientNavbar";
import ProjectDashboard from "@/Components/Client/ProjectDashboard";
import Swal from "sweetalert2";
import { ArrowRight } from "lucide-react";

export default function Dashboard({
    auth,
    hasProject,
    project,
    feeds,
    myProjects,
}) {
    const user = auth.user;
    const { data, setData, post, processing, errors } = useForm({
        token: "",
    });

    const handleJoin = (e) => {
        e.preventDefault();
        post(route("client.project.join"));
    };

    const handleLeaveProject = () => {
        Swal.fire({
            title: "Leave this project?",
            text: "You will need the access token to join again.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, Leave",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("client.project.leave", project.id));
            }
        });
    };

    const handleSwitchProject = (projectId) => {
        if (projectId) {
            router.get(route("client.dashboard"), { project_id: projectId });
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] font-sans">
            <Head title="Dashboard - ArgeConnect" />

            <ClientNavbar
                user={user}
                project={hasProject ? project : null}
                myProjects={myProjects}
                onLeaveProject={handleLeaveProject}
                onSwitchProject={handleSwitchProject}
            />

            {hasProject ? (
                <ProjectDashboard project={project} feeds={feeds} />
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5E7EB] w-full max-w-md text-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg
                                className="w-8 h-8 text-[#2563EB]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-[#101828] mb-2">
                            Join a Project
                        </h2>
                        <p className="text-[#4A5565] mb-8">
                            Enter the access token provided by the
                            administrator.
                        </p>

                        <form onSubmit={handleJoin} className="space-y-4">
                            <div className="text-left">
                                <label className="block text-sm font-medium text-[#344054] mb-1.5">
                                    Access Token
                                </label>
                                <input
                                    type="text"
                                    value={data.token}
                                    onChange={(e) =>
                                        setData("token", e.target.value)
                                    }
                                    className="w-full rounded-lg border border-[#D0D5DD] px-3.5 py-2.5 text-[#101828] placeholder:text-gray-400 focus:ring-2 focus:ring-[#2563EB] sm:text-sm"
                                    placeholder="Enter token here..."
                                />
                                {errors.token && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.token}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 bg-[#2563EB] text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                Join Project <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
