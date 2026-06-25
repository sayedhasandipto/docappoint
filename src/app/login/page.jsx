"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@heroui/react";

const LoginPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleGoogleSign = async () => {
        await authClient.signIn.social({ provider: "google" });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFormError("");
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        });

        setIsLoading(false);

        if (error) {
            setFormError(error.message || "Failed to login. Please try again.");
            toast.error("Login failed!");
        } else {
            toast.success("Login successful!");
            router.push("/");
        }
    };

    return (
        <div className="container mx-auto my-20 max-sm:p-4">
            <form
                className="flex w-full max-w-md mx-auto flex-col gap-5 p-8 bg-white rounded-2xl shadow-sm border border-gray-100"
                onSubmit={onSubmit}
            >
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
                    <p className="text-gray-500">Welcome back! Please login to your account.</p>
                </div>

                {formError && (
                    <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm">
                        {formError}
                    </div>
                )}

                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            placeholder="john@example.com"
                            className="w-full h-11 pl-9 pr-3 py-2 bg-transparent border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            placeholder="Enter your password"
                            className="w-full h-11 pl-9 pr-10 py-2 bg-transparent border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                <div className="flex justify-end -mt-2">
                    <Link href="#" className="text-sm text-blue-600 hover:underline">
                        Forgot Password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full h-11 rounded-lg font-medium text-white transition-colors ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>

                <div className="text-center text-sm">
                    <span className="text-gray-600">Don&apos;t have an account? </span>
                    <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
                        Register
                    </Link>
                </div>

                <div className="flex items-center gap-3 my-1">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-gray-400 font-medium">OR</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <Button
                    onClick={handleGoogleSign}
                    className="w-full h-10" variant="tertiary">
                    <Icon icon="devicon:google" />
                    Sign in with Google
                </Button>
            </form>
        </div>
    );
};

export default LoginPage;