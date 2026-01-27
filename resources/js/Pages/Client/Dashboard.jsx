import { Head } from "@inertiajs/react";
import ClientNavbar from "@/Components/Client/ClientNavbar";
import TokenInput from "@/Components/Client/TokenInput";
import ProjectDashboard from "@/Components/Client/ProjectDashboard";

export default function ClientDashboard({ auth, hasProject, project, feeds }) {
    return (
        <div className="min-h-screen bg-[#F9FAFB] font-sans">
            <Head
                title={
                    hasProject
                        ? `${project.title} - Dashboard`
                        : "Client Dashboard"
                }
            />

            <ClientNavbar user={auth.user} />

            {hasProject ? (
                <ProjectDashboard project={project} feeds={feeds} />
            ) : (
                <TokenInput />
            )}
        </div>
    );
}
