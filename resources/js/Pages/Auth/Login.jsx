import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <div className="min-h-screen w-full flex font-sans overflow-hidden">
            <Head title="Log in - ArgeConnect" />

            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:flex w-1/2 bg-[#2563EB] flex-col justify-center items-center gap-8 relative p-12"
            >
                <div className="flex flex-col items-center gap-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: 0.5,
                            type: "spring",
                            stiffness: 200,
                        }}
                        className="w-[106px] h-[89px] flex items-center justify-center"
                    >
                        <img
                            src="/images/logo.png"
                            alt="ArgeConnect Logo"
                            className="w-full h-full object-contain drop-shadow-lg"
                        />
                    </motion.div>

                    <div className="text-center">
                        <h1 className="text-4xl font-bold font-sans tracking-tight">
                            <span className="text-[#001EFF]">arge</span>
                            <span className="text-[#FF0000]">connect</span>
                        </h1>
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-white text-xl font-normal leading-7 tracking-wide font-sans text-center"
                >
                    Track Your Vision, Step by Step
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center px-8 md:px-16 py-12"
            >
                <div className="w-full max-w-[448px]">
                    <div className="mb-8">
                        <h2 className="text-[#101828] text-3xl font-bold leading-9 mb-2 font-sans">
                            Welcome Back
                        </h2>
                        <p className="text-[#4A5565] text-base font-normal leading-6 font-sans">
                            Sign in to continue to argeconnect
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600 p-3 bg-green-50 rounded-lg border border-green-200">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-[#364153] text-sm font-normal leading-5 mb-2 font-sans">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#2563EB] transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="you@example.com"
                                    className="block w-full h-[50px] pl-10 pr-4 bg-white rounded-[10px] border border-[#D1D5DC] shadow-sm text-[#101828] placeholder:text-gray-400 placeholder:opacity-50 focus:border-[#2563EB] focus:ring-[#2563EB] sm:text-sm transition-all"
                                    autoFocus
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-[#364153] text-sm font-normal leading-5 mb-2 font-sans">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#2563EB] transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    className="block w-full h-[50px] pl-10 pr-12 bg-white rounded-[10px] border border-[#D1D5DC] shadow-sm text-[#101828] placeholder:text-gray-400 placeholder:opacity-50 focus:border-[#2563EB] focus:ring-[#2563EB] sm:text-sm transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-end">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-[#2563EB] text-sm font-normal hover:underline font-sans"
                                >
                                    Forgot Password?
                                </Link>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            disabled={processing}
                            className="w-full h-[48px] bg-[#2563EB] hover:bg-blue-700 text-white rounded-[10px] text-base font-normal shadow-md transition-all duration-200 flex items-center justify-center gap-2 font-sans"
                        >
                            {processing ? "Loading..." : "Log In"}
                        </motion.button>

                        <div className="flex items-center justify-center gap-2 mt-2">
                            <span className="text-[#4A5565] text-base font-normal font-sans">
                                Don't have an account?
                            </span>
                            <Link
                                href={route("register")}
                                className="text-[#2563EB] text-base font-normal hover:underline font-sans"
                            >
                                Register here
                            </Link>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
