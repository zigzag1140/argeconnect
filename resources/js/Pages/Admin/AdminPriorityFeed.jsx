import { useState, useRef } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import AdminSidebar from "@/Components/Admin/AdminSidebar";
import Swal from "sweetalert2";
import {
    Zap,
    MessageSquare,
    CheckCircle,
    ArrowRight,
    Send,
    Paperclip,
    X,
    FileImage,
    Users,
} from "lucide-react";

export default function PriorityFeed({ feeds, highPriorityCount }) {
    const [replyingToId, setReplyingToId] = useState(null);
    const { data, setData, post, processing, reset } = useForm({
        content: "",
        media: null,
    });
    const fileInputRef = useRef(null);

    const handleResolve = (id) => {
        Swal.fire({
            title: "Mark as Resolved?",
            text: "This will move the issue to the resolved list.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#00C950",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, Resolve it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("admin.feed.resolve", id));
                Swal.fire({
                    title: "Resolved!",
                    text: "Issue has been marked as resolved.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        });
    };

    const submitReply = (e, commentId) => {
        e.preventDefault();
        post(route("admin.feed.reply", commentId), {
            onSuccess: () => {
                reset();
                setReplyingToId(null);
                Swal.fire({
                    icon: "success",
                    title: "Reply Sent",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };

    const toggleReply = (id) => {
        if (replyingToId === id) setReplyingToId(null);
        else {
            setReplyingToId(id);
            reset();
        }
    };

    return (
        <div className="flex h-screen bg-[#F9FAFB] font-sans">
            <Head title="Priority Feed - ArgeConnect" />

            <AdminSidebar
                activePage="feed"
                highPriorityCount={highPriorityCount}
            />

            <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen">
                <div className="w-full mx-auto">
                    <div className="mb-8">
                        <h2 className="text-[#101828] text-3xl font-bold mb-2">
                            Priority Feed
                        </h2>
                        <p className="text-[#4A5565]">
                            Client feedback sorted by AI-detected priority.
                        </p>
                    </div>

                    {highPriorityCount > 0 ? (
                        <div className="mb-8 p-4 bg-gradient-to-r from-[#FEF2F2] to-[#FFF7ED] border border-[#FFC9C9] rounded-[14px] flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#EF4444] rounded-full flex items-center justify-center shrink-0">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-[#101828] font-bold">
                                    {highPriorityCount} High Priority Comments
                                </h3>
                                <p className="text-[#364153] text-sm">
                                    Urgent issues detected.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-[14px] flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#00C950] rounded-full flex items-center justify-center shrink-0">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-[#101828] font-bold">
                                    All Clear!
                                </h3>
                                <p className="text-[#364153] text-sm">
                                    No urgent issues.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4 pb-20">
                        {feeds.map((item) => (
                            <div
                                key={item.id}
                                className={`rounded-2xl border overflow-hidden bg-white shadow-sm transition-all ${item.priority === "High" ? "border-[#FFC9C9] bg-[#FEF2F2]/50" : "border-[#E5E7EB]"}`}
                            >
                                <div className="p-6">
                                    <div className="flex items-start gap-3 mb-4">
                                        <img
                                            src={
                                                item.user_avatar
                                                    ? `/storage/${item.user_avatar}`
                                                    : "/images/default.jpg"
                                            }
                                            alt={item.user}
                                            className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-200"
                                        />

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[#101828] font-bold">
                                                    {item.user}
                                                </span>
                                                <div className="flex items-center gap-1 text-[#4A5565] text-sm">
                                                    <Users size={14} />{" "}
                                                    {item.role}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[#2563EB] text-sm">
                                                    {item.project}
                                                </span>
                                                {item.priority === "High" ? (
                                                    <span className="bg-[#EF4444] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2">
                                                        <Zap
                                                            size={12}
                                                            fill="currentColor"
                                                        />{" "}
                                                        High Priority
                                                    </span>
                                                ) : (
                                                    <span className="bg-[#DBEAFE] text-[#2563EB] text-xs font-bold px-3 py-1.5 rounded-lg">
                                                        Normal Priority
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
                                        <p className="text-[#101828] whitespace-pre-wrap">
                                            {item.content}
                                        </p>
                                    </div>
                                    <div className="text-[#6A7282] text-sm mb-4 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>{" "}
                                        {item.time}
                                    </div>

                                    <div className="pt-4 border-t border-[#E5E7EB] flex gap-3">
                                        <button
                                            onClick={() => toggleReply(item.id)}
                                            className={`flex-1 h-12 border-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${replyingToId === item.id ? "border-[#2563EB] bg-blue-50 text-[#2563EB]" : "border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
                                        >
                                            <MessageSquare className="w-4.5 h-4.5" />{" "}
                                            {replyingToId === item.id
                                                ? "Cancel Reply"
                                                : "Reply & Attach Proof"}
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleResolve(item.id)
                                            }
                                            className="flex-1 h-12 border-2 border-[#00C950] text-[#008236] rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-green-50 transition-colors"
                                        >
                                            <CheckCircle className="w-4.5 h-4.5" />{" "}
                                            Mark as Resolved
                                        </button>
                                        <Link
                                            href={route(
                                                "admin.projects.show",
                                                item.project_id,
                                            )}
                                            className="px-4 h-12 border border-[#D1D5DC] text-[#364153] rounded-lg font-medium flex items-center justify-center hover:bg-gray-50"
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>

                                    {replyingToId === item.id && (
                                        <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-top-2">
                                            <form
                                                onSubmit={(e) =>
                                                    submitReply(e, item.id)
                                                }
                                            >
                                                <textarea
                                                    value={data.content}
                                                    onChange={(e) =>
                                                        setData(
                                                            "content",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#2563EB] focus:border-[#2563EB] text-sm mb-3"
                                                    placeholder={`Reply to ${item.user}...`}
                                                    rows="3"
                                                    autoFocus
                                                ></textarea>
                                                {data.media && (
                                                    <div className="mb-3 flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 w-fit">
                                                        <FileImage className="w-4 h-4 text-blue-500" />
                                                        <span className="text-xs text-gray-600 max-w-[200px] truncate">
                                                            {data.media.name}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setData(
                                                                    "media",
                                                                    null,
                                                                )
                                                            }
                                                            className="text-gray-400 hover:text-red-500"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                )}
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="file"
                                                            ref={fileInputRef}
                                                            className="hidden"
                                                            onChange={(e) =>
                                                                setData(
                                                                    "media",
                                                                    e.target
                                                                        .files[0],
                                                                )
                                                            }
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                fileInputRef.current.click()
                                                            }
                                                            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                                                        >
                                                            <Paperclip className="w-3.5 h-3.5" />{" "}
                                                            Attach Proof
                                                        </button>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        disabled={
                                                            processing ||
                                                            (!data.content &&
                                                                !data.media)
                                                        }
                                                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#2563EB] rounded-lg hover:bg-[#155EEF] disabled:opacity-50"
                                                    >
                                                        <Send className="w-3.5 h-3.5" />{" "}
                                                        Send Reply
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
