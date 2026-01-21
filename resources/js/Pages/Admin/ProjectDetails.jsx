import { useState, useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    LayoutDashboard,
    FolderOpen,
    Zap,
    Users,
    Bell,
    ArrowLeft,
    Save,
    Calendar,
    User,
    MessageSquare,
    Send,
    Paperclip,
    X,
    FileImage,
} from "lucide-react";

export default function ProjectDetails({ auth, project }) {
    // Form untuk Update Status & Progress
    const {
        data: controlsData,
        setData: setControlsData,
        patch,
        processing: controlsProcessing,
    } = useForm({
        status: project.status,
        progress: project.progress,
    });

    // Form untuk Feed & Media
    const {
        data: feedData,
        setData: setFeedData,
        post,
        processing: feedProcessing,
        reset,
    } = useForm({
        content: "",
        media: null,
    });

    const fileInputRef = useRef(null);

    const handleUpdate = (e) => {
        e.preventDefault();
        patch(route("admin.projects.update", project.id));
    };

    const handlePostFeed = (e) => {
        e.preventDefault();
        // Logika posting feed (nanti dihubungkan ke controller)
        // post(route('admin.feeds.store'));
        console.log("Posting:", feedData);
        reset(); // Reset form setelah post
    };

    const handleFileChange = (e) => {
        setFeedData("media", e.target.files[0]);
    };

    return (
        <div className="flex h-screen bg-[#F9FAFB] font-sans">
            <Head title={`${project.title} - Details`} />

            {/* --- SIDEBAR --- */}
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

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen">
                <div className="w-full max-w-6xl mx-auto">
                    {" "}
                    {/* Lebarkan container max-w-6xl */}
                    {/* Header Simple */}
                    <div className="mb-6">
                        <Link
                            href={route("admin.projects")}
                            className="inline-flex items-center text-sm text-[#6A7282] hover:text-[#2563EB] transition-colors mb-2"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Projects
                        </Link>
                        <h2 className="text-[#101828] text-3xl font-bold leading-9">
                            {project.title}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* KOLOM KIRI (2/3): Controls & Feed */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Card: Project Controls */}
                            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-[#101828] text-lg font-bold">
                                        Project Controls
                                    </h3>
                                    <span className="text-xs text-[#6A7282] bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                        Sync with client dashboard
                                    </span>
                                </div>
                                <form onSubmit={handleUpdate}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-xs font-semibold text-[#344054] uppercase tracking-wider mb-2">
                                                Current Status
                                            </label>
                                            <select
                                                value={controlsData.status}
                                                onChange={(e) =>
                                                    setControlsData(
                                                        "status",
                                                        e.target.value,
                                                    )
                                                }
                                                className="block w-full rounded-lg border border-[#D0D5DD] px-3.5 py-2.5 text-[#101828] shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#2563EB] sm:text-sm bg-white"
                                            >
                                                <option value="In Progress">
                                                    In Progress
                                                </option>
                                                <option value="Pending">
                                                    Pending
                                                </option>
                                                <option value="Review">
                                                    Review
                                                </option>
                                                <option value="Completed">
                                                    Completed
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-[#344054] uppercase tracking-wider mb-2">
                                                Completion:{" "}
                                                <span className="text-[#2563EB]">
                                                    {controlsData.progress}%
                                                </span>
                                            </label>
                                            <div className="flex items-center h-[42px]">
                                                {" "}
                                                {/* Tinggi disamakan dengan input select */}
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={
                                                        controlsData.progress
                                                    }
                                                    onChange={(e) =>
                                                        setControlsData(
                                                            "progress",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-gray-100">
                                        <button
                                            type="submit"
                                            disabled={controlsProcessing}
                                            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-[#2563EB] rounded-lg hover:bg-[#155EEF] transition-colors disabled:opacity-50 shadow-sm"
                                        >
                                            <Save className="w-4 h-4" />
                                            {controlsProcessing
                                                ? "Saving Changes..."
                                                : "Save Changes"}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Card: Project Feed */}
                            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <MessageSquare className="w-5 h-5 text-[#2563EB]" />
                                    <h3 className="text-[#101828] text-lg font-bold">
                                        Project Feed & Updates
                                    </h3>
                                </div>

                                {/* Input Box */}
                                <div className="mb-8 bg-[#F9FAFB] p-4 rounded-xl border border-[#E5E7EB] focus-within:ring-2 focus-within:ring-[#2563EB] focus-within:border-transparent transition-all">
                                    <textarea
                                        rows={3}
                                        value={feedData.content}
                                        onChange={(e) =>
                                            setFeedData(
                                                "content",
                                                e.target.value,
                                            )
                                        }
                                        className="block w-full rounded-lg border-0 bg-transparent text-[#101828] placeholder:text-[#99A1AF] focus:ring-0 sm:text-sm resize-none p-0"
                                        placeholder="Write an update, report progress, or attach a file..."
                                    ></textarea>

                                    {/* Media Preview */}
                                    {feedData.media && (
                                        <div className="mt-3 flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 w-fit">
                                            <FileImage className="w-4 h-4 text-blue-500" />
                                            <span className="text-xs text-gray-600 max-w-[200px] truncate">
                                                {feedData.media.name}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    setFeedData("media", null)
                                                }
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    )}

                                    {/* Toolbar */}
                                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#E5E7EB]">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    fileInputRef.current.click()
                                                }
                                                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <Paperclip className="w-3 h-3" />
                                                Attach Media
                                            </button>
                                            <span className="text-xs text-[#99A1AF]">
                                                Visible to client
                                            </span>
                                        </div>
                                        <button
                                            onClick={handlePostFeed}
                                            disabled={
                                                !feedData.content &&
                                                !feedData.media
                                            }
                                            className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-white bg-[#2563EB] rounded-lg hover:bg-[#155EEF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Send className="w-3 h-3" />
                                            Post Update
                                        </button>
                                    </div>
                                </div>

                                {/* Feed History Placeholder */}
                                <div className="space-y-6">
                                    <div className="relative pl-6 border-l-2 border-gray-100">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-white"></div>
                                        <div className="mb-1 flex items-center gap-2">
                                            <span className="text-sm font-bold text-[#101828]">
                                                Admin User
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                Just now
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Project initialized. Welcome to the
                                            workspace!
                                        </p>
                                    </div>

                                    {/* Empty State jika belum ada feed lain */}
                                    <div className="text-center py-8">
                                        <p className="text-sm text-[#99A1AF] italic">
                                            No other recent updates.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* KOLOM KANAN (1/3): Sidebar Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 h-fit">
                                <h3 className="text-[#101828] text-sm font-bold uppercase tracking-wider mb-6 border-b border-gray-100 pb-4">
                                    About This Project
                                </h3>

                                <div className="space-y-6">
                                    {/* Client Info */}
                                    <div>
                                        <label className="text-xs text-[#6A7282] block mb-1">
                                            Client
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] flex items-center justify-center text-white text-xs font-bold">
                                                {project.client
                                                    ? project.client.name
                                                          .substring(0, 2)
                                                          .toUpperCase()
                                                    : "NA"}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-[#101828]">
                                                    {project.client
                                                        ? project.client.name
                                                        : "Unassigned"}
                                                </p>
                                                <p className="text-xs text-[#6A7282]">
                                                    Active Client
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <label className="text-xs text-[#6A7282] block mb-1">
                                            Start Date
                                        </label>
                                        <div className="flex items-center gap-2 text-sm text-[#101828]">
                                            <Calendar className="w-4 h-4 text-[#99A1AF]" />
                                            {project.created_at}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="text-xs text-[#6A7282] block mb-1">
                                            Description
                                        </label>
                                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                            <p className="text-sm text-[#4A5565] leading-relaxed">
                                                {project.description ||
                                                    "No description provided."}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Members (Dummy dulu) */}
                                    <div>
                                        <label className="text-xs text-[#6A7282] block mb-2">
                                            Team Members
                                        </label>
                                        <div className="flex -space-x-2 overflow-hidden">
                                            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                                AD
                                            </div>
                                            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                                                +
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
