import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { ArrowRight, FolderOpen, AlertCircle, Loader2, X } from "lucide-react";

export default function TokenInput() {
    const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        token: "",
    });

    const handleJoinProject = (e) => {
        e.preventDefault();
        post(route("client.project.join"), {
            onSuccess: () => {
                setIsTokenModalOpen(false);
                reset();
            },
        });
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-red-400/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

            <div className="w-full max-w-2xl flex flex-col items-center text-center z-10">
                <div className="w-64 h-64 relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF] to-[#FEF2F2] rounded-3xl transform rotate-3 shadow-sm"></div>
                    <div className="absolute inset-0 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-gray-100">
                        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center">
                            <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center relative">
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#EF4444] rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                                    !
                                </div>
                                <FolderOpen className="w-10 h-10 text-[#2563EB]" />
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className="text-[#101828] text-4xl font-bold mb-4 tracking-tight">
                    No Projects Linked Yet
                </h1>
                <p className="text-[#4A5565] text-lg max-w-xl leading-relaxed mb-10">
                    To track your project progress, please enter the unique{" "}
                    <span className="font-semibold text-[#101828]">
                        Access Token
                    </span>{" "}
                    provided by the Argenesia team.
                </p>

                <button
                    onClick={() => setIsTokenModalOpen(true)}
                    className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 bg-[#2563EB] rounded-full hover:bg-[#1D4ED8] hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB]"
                >
                    Enter Project Token
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* MODAL */}
            {isTokenModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all scale-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-[#101828]">
                                Link New Project
                            </h3>
                            <button
                                onClick={() => setIsTokenModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleJoinProject}>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-[#344054] mb-2">
                                    Access Token
                                </label>
                                <input
                                    type="text"
                                    value={data.token}
                                    onChange={(e) =>
                                        setData("token", e.target.value)
                                    }
                                    placeholder="e.g. 8s7d6f5g4h"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] text-center text-lg tracking-widest font-mono uppercase"
                                    autoFocus
                                />
                                {errors.token && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.token}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsTokenModalOpen(false)}
                                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-2.5 bg-[#2563EB] rounded-lg text-white font-medium hover:bg-[#1D4ED8] transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                                >
                                    {processing && (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    )}
                                    {processing ? "Verifying..." : "Connect"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}
