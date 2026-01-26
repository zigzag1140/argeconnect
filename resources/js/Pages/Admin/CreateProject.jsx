import { Head, Link, useForm } from "@inertiajs/react";
import {
    LayoutDashboard,
    FolderOpen,
    Zap,
    Users,
    Bell,
    ArrowLeft,
    Save,
} from "lucide-react";

export default function CreateProject({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        status: "In Progress",
        progress: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.projects.store"));
    };

    return (
        <div className="flex h-screen bg-[#F9FAFB] font-sans">
            <Head title="Create Project - ArgeConnect" />

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
                        className="flex items-center gap-3 px-4 py-3 text-[#364153] hover:bg-gray-50 rounded-[10px] transition-colors"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-base font-normal">
                            Dashboard Overview
                        </span>
                    </Link>

                    <Link
                        href={route("admin.projects")}
                        className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-[10px] shadow-sm transition-colors"
                    >
                        <FolderOpen className="w-5 h-5" />
                        <span className="text-base font-normal">
                            All Projects
                        </span>
                    </Link>

                    <Link
                        href={route("admin.feed")}
                        className="flex items-center justify-between px-4 py-3 text-[#364153] hover:bg-gray-50 rounded-[10px] transition-colors"
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
                        className="flex items-center gap-3 px-4 py-3 text-[#364153] hover:bg-gray-50 rounded-[10px] transition-colors"
                    >
                        <Users className="w-5 h-5" />
                        <span className="text-base font-normal">
                            User Management
                        </span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-[#E5E7EB]">
                    <div className="flex items-center gap-3 p-3 rounded-[10px] hover:bg-gray-50 transition-colors">
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
                <div className="w-full max-w-3xl mx-auto">
                    <div className="mb-6">
                        <Link
                            href={route("admin.projects")}
                            className="inline-flex items-center text-sm text-[#6A7282] hover:text-[#2563EB] transition-colors mb-4"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Projects
                        </Link>
                        <h2 className="text-[#101828] text-3xl font-bold leading-9">
                            Create New Project
                        </h2>
                        <p className="text-[#4A5565] text-base font-normal mt-1">
                            An access token will be generated automatically.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[#344054] mb-1.5">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="block w-full rounded-lg border border-[#D0D5DD] px-3.5 py-2.5 text-[#101828] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#2563EB] sm:text-sm sm:leading-6"
                                    placeholder="e.g. E-Commerce Revamp"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#344054] mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="block w-full rounded-lg border border-[#D0D5DD] px-3.5 py-2.5 text-[#101828] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#2563EB] sm:text-sm sm:leading-6"
                                    placeholder="Describe the project scope..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#344054] mb-1.5">
                                        Status
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="block w-full rounded-lg border border-[#D0D5DD] px-3.5 py-2.5 text-[#101828] shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#2563EB] sm:text-sm sm:leading-6 bg-white"
                                    >
                                        <option value="In Progress">
                                            In Progress
                                        </option>
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">
                                            Completed
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#344054] mb-1.5">
                                        Progress:{" "}
                                        <span className="font-bold text-[#2563EB]">
                                            {data.progress}%
                                        </span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={data.progress}
                                        onChange={(e) =>
                                            setData("progress", e.target.value)
                                        }
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-[#E5E7EB] flex justify-end gap-3">
                                <Link
                                    href={route("admin.projects")}
                                    className="px-4 py-2 text-sm font-medium text-[#344054] bg-white border border-[#D0D5DD] rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB] transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#2563EB] border border-transparent rounded-lg hover:bg-[#155EEF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-4 h-4" />
                                    {processing
                                        ? "Creating..."
                                        : "Create & Generate Token"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
