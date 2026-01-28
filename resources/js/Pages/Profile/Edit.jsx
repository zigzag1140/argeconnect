import AdminSidebar from "@/Components/Admin/AdminSidebar";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head, usePage } from "@inertiajs/react";

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    const isAdmin = user.role === "admin";

    return (
        <div className="min-h-screen bg-[#F3F4F6]">
            <Head title="Profile" />

            {isAdmin && <AdminSidebar activePage="profile" />}

            <main className={`py-12 ${isAdmin ? "ml-64" : ""}`}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex items-center justify-between px-4 sm:px-0">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Profile Settings
                            </h2>
                            <p className="text-sm text-gray-500">
                                Manage your account information and security.
                            </p>
                        </div>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </main>
        </div>
    );
}
