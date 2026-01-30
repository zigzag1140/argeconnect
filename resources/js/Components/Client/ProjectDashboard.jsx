import { useState, useRef } from "react";
import { useForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import {
    CheckCircle2,
    MessageSquare,
    ThumbsUp,
    Send,
    Paperclip,
    X,
    Trash2,
    Pencil,
    FileImage,
    Info,
    Clock,
} from "lucide-react";

export default function ProjectDashboard({ project, feeds }) {
    const getDeadlineColor = (time) => {
        if (time === "Overdue") return "text-red-600 font-bold";
        return "text-gray-600";
    };

    return (
        <main className="max-w-5xl mx-auto py-8 px-6 space-y-8 pb-20">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-[#101828] text-3xl font-bold">
                        {project.title}
                    </h1>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                        {project.status || "In Development"}
                    </span>
                </div>
                <p className="text-[#4A5565] text-base">
                    Track your project progress and provide feedback
                </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-[#101828] text-xl font-bold">
                        Overall Progress
                    </h2>

                    <div className="flex items-center gap-6">
                        <div
                            className={`flex items-center gap-2 text-sm ${getDeadlineColor(project.remaining_time)}`}
                        >
                            <Clock size={18} />
                            <span>{project.remaining_time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#2563EB]">
                            <span className="text-xl font-bold">
                                {project.progress}% Complete
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] h-4 rounded-full transition-all duration-1000 ease-out shadow-sm"
                        style={{ width: `${project.progress}%` }}
                    ></div>
                </div>
            </div>

            <div>
                <h2 className="text-[#101828] text-xl font-bold mb-6">
                    Development Timeline
                </h2>
                <div className="space-y-8">
                    {feeds.length > 0 ? (
                        feeds.map((feed) => (
                            <FeedItem key={feed.id} feed={feed} />
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                            <p className="text-gray-500">
                                No updates on the timeline yet.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

function FeedItem({ feed }) {
    const [showCommentForm, setShowCommentForm] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        content: "",
        media: null,
    });
    const fileInputRef = useRef(null);

    const handleApprove = () => {
        Swal.fire({
            title: "Approve this update?",
            text: "This confirms that you are satisfied with this progress report.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#00C950",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, Approve it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    route("client.feed.approve", feed.id),
                    {},
                    {
                        onSuccess: () => {
                            Swal.fire({
                                title: "Approved!",
                                text: "Thank you for your feedback.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                            });
                        },
                    },
                );
            }
        });
    };

    const handleSubmitComment = (e) => {
        e.preventDefault();
        post(route("client.feed.comment.store", feed.id), {
            onSuccess: () => {
                reset();
                setShowCommentForm(false);
                Swal.fire({
                    icon: "success",
                    title: "Feedback Sent",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };

    return (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {feed.type === "system" ? (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm bg-orange-500">
                            <Info size={24} />
                        </div>
                    ) : (
                        <img
                            src={
                                feed.user_avatar
                                    ? `/storage/${feed.user_avatar}`
                                    : "/images/default.jpg"
                            }
                            alt={feed.user_name}
                            className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-200"
                        />
                    )}

                    <div>
                        <h3 className="text-[#101828] font-bold text-base">
                            {feed.type === "system"
                                ? "System Update"
                                : feed.user_name}
                        </h3>
                        <p className="text-[#6A7282] text-sm">
                            {feed.user_role}
                        </p>
                    </div>
                </div>
                <span className="text-[#6A7282] text-sm">
                    {feed.created_at_human}
                </span>
            </div>

            <div className="pl-0 sm:pl-[60px]">
                {feed.type === "system" ? (
                    <div
                        className="p-4 bg-orange-50 border border-orange-100 rounded-xl text-orange-900 text-sm"
                        dangerouslySetInnerHTML={{
                            __html: feed.content.replace(/\*\*/g, ""),
                        }}
                    ></div>
                ) : (
                    <div>
                        <h4 className="text-[#101828] font-bold text-lg mb-2">
                            Update Report
                        </h4>
                        <p className="text-[#4A5565] text-base leading-relaxed whitespace-pre-wrap mb-4">
                            {feed.content}
                        </p>
                    </div>
                )}

                {feed.media && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                        <img
                            src={feed.media}
                            alt="Attachment"
                            className="w-full h-auto object-cover max-h-[400px]"
                        />
                    </div>
                )}

                {feed.type !== "system" && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        {feed.approval_status === "approved" ? (
                            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 w-fit">
                                <CheckCircle2 size={20} />
                                <span className="font-semibold">
                                    Approved by Client
                                </span>
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleApprove}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-[#00C950] text-[#008236] font-semibold hover:bg-green-50 transition-colors"
                                >
                                    <ThumbsUp size={18} />
                                    Approve
                                </button>

                                <button
                                    onClick={() =>
                                        setShowCommentForm(!showCommentForm)
                                    }
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#EF4444] text-white font-semibold hover:bg-red-600 transition-colors shadow-sm"
                                >
                                    <MessageSquare size={18} />
                                    Discuss / Revision Needed
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {showCommentForm && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-top-2">
                        <textarea
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#2563EB] focus:border-[#2563EB] text-sm"
                            placeholder="Describe what needs revision..."
                            rows="3"
                        ></textarea>

                        {data.media && (
                            <div className="flex items-center gap-2 mt-2 text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-100 w-fit">
                                <FileImage size={14} />
                                {data.media.name}
                                <button
                                    onClick={() => setData("media", null)}
                                    className="text-red-500 ml-2"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        )}

                        <div className="flex justify-between items-center mt-3">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                className="flex items-center gap-2 text-gray-500 text-sm hover:text-[#2563EB]"
                            >
                                <Paperclip size={16} /> Attach File
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={(e) =>
                                    setData("media", e.target.files[0])
                                }
                            />

                            <button
                                onClick={handleSubmitComment}
                                disabled={processing}
                                className="bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
                            >
                                <Send size={14} /> Send Feedback
                            </button>
                        </div>
                    </div>
                )}

                {feed.comments.length > 0 && (
                    <div className="mt-6 space-y-4">
                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Discussion History
                        </h5>
                        {[...feed.comments].reverse().map((comment) => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function CommentItem({ comment }) {
    const [isEditing, setIsEditing] = useState(false);
    const { data, setData, post, processing } = useForm({
        content: comment.content,
        _method: "POST",
    });

    const handleDelete = () => {
        Swal.fire({
            title: "Delete this comment?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("client.comment.destroy", comment.id), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your comment has been deleted.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    },
                });
            }
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        router.post(
            route("client.comment.update", comment.id),
            {
                content: data.content,
                _method: "POST",
            },
            {
                onSuccess: () => setIsEditing(false),
            },
        );
    };

    return (
        <div
            className={`p-4 rounded-xl border ${comment.is_own ? "bg-blue-50 border-blue-100 ml-8" : "bg-gray-50 border-gray-100 mr-8"}`}
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <img
                        src={
                            comment.user_avatar
                                ? `/storage/${comment.user_avatar}`
                                : "/images/default.jpg"
                        }
                        alt={comment.user_name}
                        className="w-6 h-6 rounded-full object-cover border border-gray-200"
                    />

                    <span className="font-bold text-sm text-gray-800">
                        {comment.user_name}
                    </span>
                    <span className="text-xs text-gray-500">
                        • {comment.created_at}
                    </span>
                </div>

                {comment.is_own && !isEditing && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-gray-400 hover:text-blue-600"
                        >
                            <Pencil size={12} />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-gray-400 hover:text-red-600"
                        >
                            <Trash2 size={12} />
                        </button>
                    </div>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleUpdate}>
                    <textarea
                        value={data.content}
                        onChange={(e) => setData("content", e.target.value)}
                        className="w-full text-sm p-2 border rounded mb-2"
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="text-xs text-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="text-xs bg-blue-600 text-white px-3 py-1 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {comment.content}
                    </p>
                    {comment.media && (
                        <div className="mt-2">
                            <a
                                href={comment.media}
                                target="_blank"
                                className="text-xs text-blue-600 underline flex items-center gap-1"
                            >
                                <Paperclip size={12} /> Attachment
                            </a>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
