import { useState, useRef, useEffect } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import {
    LayoutDashboard,
    FolderOpen,
    Zap,
    Users,
    Bell,
    ArrowLeft,
    Save,
    Calendar,
    MessageSquare,
    Send,
    Paperclip,
    X,
    FileImage,
    Info,
    Trash2,
    Pencil,
} from "lucide-react";

export default function ProjectDetails({ auth, project, feeds }) {
    // --- STATE UTAMA ---
    const {
        data: controlsData,
        setData: setControlsData,
        patch,
        processing: controlsProcessing,
    } = useForm({
        status: project.status,
        progress: project.progress,
    });

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

    // --- STATE EDITING FEED ---
    const [editingId, setEditingId] = useState(null);
    const [editContent, setEditContent] = useState("");

    const fileInputRef = useRef(null);

    // --- HANDLERS ---
    const handleUpdate = (e) => {
        e.preventDefault();
        patch(route("admin.projects.update", project.id));
    };

    const handlePostFeed = (e) => {
        e.preventDefault();
        post(route("admin.projects.feed.store", project.id), {
            onSuccess: () => {
                reset();
                setFeedData("media", null);
            },
        });
    };

    const handleFileChange = (e) => {
        setFeedData("media", e.target.files[0]);
    };

    // Fungsi Hapus Feed
    const handleDeleteFeed = (feedId) => {
        if (confirm("Are you sure you want to delete this update?")) {
            router.delete(route("admin.feeds.destroy", feedId));
        }
    };

    // Fungsi Mulai Edit
    const startEditing = (feed) => {
        setEditingId(feed.id);
        setEditContent(feed.content);
    };

    // Fungsi Simpan Edit
    const saveEdit = (feedId) => {
        router.patch(
            route("admin.feeds.update", feedId),
            {
                content: editContent,
            },
            {
                onSuccess: () => setEditingId(null),
            },
        );
    };

    return (
        <div className="flex h-screen bg-[#F9FAFB] font-sans">
            <Head title={`${project.title} - Details`} />

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
                <div className="w-full max-w-6xl mx-auto">
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
                        <div className="lg:col-span-2 space-y-6">
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

                            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <MessageSquare className="w-5 h-5 text-[#2563EB]" />
                                    <h3 className="text-[#101828] text-lg font-bold">
                                        Project Feed & Updates
                                    </h3>
                                </div>

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
                                                (!feedData.content &&
                                                    !feedData.media) ||
                                                feedProcessing
                                            }
                                            className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-white bg-[#2563EB] rounded-lg hover:bg-[#155EEF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Send className="w-3 h-3" />
                                            {feedProcessing
                                                ? "Posting..."
                                                : "Post Update"}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {feeds.length > 0 ? (
                                        feeds.map((feed) => (
                                            <div
                                                key={feed.id}
                                                className="relative pl-8 border-l-2 border-gray-100 group"
                                            >
                                                <div
                                                    className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${feed.type === "system" ? "bg-orange-400" : "bg-blue-500"}`}
                                                >
                                                    {feed.type === "system" ? (
                                                        <Info
                                                            size={12}
                                                            className="text-white"
                                                        />
                                                    ) : (
                                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                                    )}
                                                </div>

                                                <div className="mb-2 flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className={`text-sm font-bold ${feed.type === "system" ? "text-orange-600" : "text-[#101828]"}`}
                                                        >
                                                            {feed.type ===
                                                            "system"
                                                                ? "System Update"
                                                                : feed.user
                                                                      ?.name}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {feed.created_at}
                                                        </span>
                                                    </div>

                                                    {/* TOMBOL EDIT/DELETE */}
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {feed.type !==
                                                            "system" && (
                                                            <button
                                                                onClick={() =>
                                                                    startEditing(
                                                                        feed,
                                                                    )
                                                                }
                                                                className="text-gray-400 hover:text-[#2563EB] transition-colors"
                                                                title="Edit"
                                                            >
                                                                <Pencil
                                                                    size={14}
                                                                />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteFeed(
                                                                    feed.id,
                                                                )
                                                            }
                                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {editingId === feed.id ? (
                                                    // --- MODE EDIT ---
                                                    <div className="bg-white border border-[#2563EB] rounded-xl p-4 shadow-sm">
                                                        <textarea
                                                            value={editContent}
                                                            onChange={(e) =>
                                                                setEditContent(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="w-full text-sm border-gray-200 rounded-lg focus:ring-[#2563EB] focus:border-[#2563EB] min-h-[80px]"
                                                        />
                                                        <div className="flex justify-end gap-2 mt-3">
                                                            <button
                                                                onClick={() =>
                                                                    setEditingId(
                                                                        null,
                                                                    )
                                                                }
                                                                className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    saveEdit(
                                                                        feed.id,
                                                                    )
                                                                }
                                                                className="px-3 py-1.5 text-xs text-white bg-[#2563EB] hover:bg-[#1d4ed8] rounded-lg"
                                                            >
                                                                Save Changes
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : // --- MODE TAMPILAN BIASA ---
                                                feed.type === "system" ? (
                                                    <div
                                                        className="p-3 bg-orange-50 border border-orange-100 rounded-lg text-sm text-orange-800"
                                                        dangerouslySetInnerHTML={{
                                                            __html: feed.content,
                                                        }}
                                                    ></div>
                                                ) : (
                                                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                                        {feed.content && (
                                                            <p className="text-sm text-[#4A5565] whitespace-pre-wrap leading-relaxed">
                                                                {feed.content}
                                                            </p>
                                                        )}
                                                        {feed.media && (
                                                            <div className="mt-3 w-full rounded-lg overflow-hidden border border-gray-100">
                                                                <img
                                                                    src={
                                                                        feed.media
                                                                    }
                                                                    alt="Attachment"
                                                                    className="w-full h-auto object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-sm text-[#99A1AF] italic">
                                                No updates yet.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 h-fit">
                                <h3 className="text-[#101828] text-sm font-bold uppercase tracking-wider mb-6 border-b border-gray-100 pb-4">
                                    About This Project
                                </h3>

                                <div className="space-y-6">
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

                                    <div>
                                        <label className="text-xs text-[#6A7282] block mb-1">
                                            Start Date
                                        </label>
                                        <div className="flex items-center gap-2 text-sm text-[#101828]">
                                            <Calendar className="w-4 h-4 text-[#99A1AF]" />
                                            {project.created_at}
                                        </div>
                                    </div>

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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
