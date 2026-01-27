import { Head, Link, useForm } from "@inertiajs/react";
import AdminSidebar from "@/Components/Admin/AdminSidebar";
import { ArrowLeft, Save } from "lucide-react";

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

            <AdminSidebar activePage="projects" />

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
