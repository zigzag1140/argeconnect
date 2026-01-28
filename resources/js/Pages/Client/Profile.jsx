import { useRef, useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import ClientNavbar from "@/Components/Client/ClientNavbar";
import { Camera, Save, Lock, User, Mail, AlertCircle } from "lucide-react";

export default function Profile({ auth }) {
    const { user } = usePage().props;
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(
        user.avatar ? `/storage/${user.avatar}` : "/images/default.jpg",
    );

    const { data, setData, post, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        avatar: null,
        password: "",
        password_confirmation: "",
        _method: "POST",
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("avatar", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("client.profile.update"), {
            onSuccess: () => {
                reset("password", "password_confirmation");
            },
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] font-sans">
            <Head title="My Profile" />

            <ClientNavbar user={user} />

            <main className="max-w-3xl mx-auto py-10 px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#101828]">
                        My Profile
                    </h1>
                    <p className="text-[#4A5565] mt-1">
                        Manage your account settings and preferences.
                    </p>
                </div>

                <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div className="flex flex-col items-center sm:flex-row gap-6 pb-8 border-b border-gray-100">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md ring-1 ring-gray-100">
                                    <img
                                        src={preview}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                    className="absolute bottom-0 right-0 bg-[#2563EB] text-white p-2 rounded-full shadow-sm hover:bg-blue-700 transition-colors"
                                    title="Change Photo"
                                >
                                    <Camera size={14} />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="text-lg font-bold text-[#101828]">
                                    Profile Photo
                                </h3>
                                <p className="text-sm text-[#6A7282] mt-1 max-w-xs">
                                    Upload a new avatar to update your profile
                                    picture. JPG, GIF or PNG.
                                </p>
                                {errors.avatar && (
                                    <p className="text-red-500 text-xs mt-2">
                                        {errors.avatar}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-[#344054] mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] text-sm"
                                        placeholder="Your Name"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#344054] mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                                        placeholder="you@example.com"
                                        disabled
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                    <AlertCircle size={12} /> Email cannot be
                                    changed automatically.
                                </p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <h3 className="text-lg font-bold text-[#101828] mb-4">
                                Change Password
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-[#344054] mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] text-sm"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#344054] mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                                        <input
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] text-sm"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 px-6 py-2.5 bg-[#2563EB] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-md shadow-blue-200"
                            >
                                <Save size={18} />
                                {processing
                                    ? "Saving Changes..."
                                    : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
