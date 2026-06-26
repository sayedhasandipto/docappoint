"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import { Mail, Lock, User, ImageIcon, Eye, EyeOff } from "lucide-react";
import { Button } from "@heroui/react";

const SignUpPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const validatePassword = (password) => {
        if (password.length < 6) return "Password must be at least 6 characters long.";
        if (!/[A-Z]/.test(password)) return "Password must contain at least 1 uppercase letter.";
        if (!/[a-z]/.test(password)) return "Password must contain at least 1 lowercase letter.";
        return null;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setPasswordError("");
        setFormError("");

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const validationError = validatePassword(user.password);
        if (validationError) {
            setPasswordError(validationError);
            return;
        }

        setIsLoading(true);

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image || "https://i.ibb.co/pfp.jpg",
        });

        setIsLoading(false);

        if (error) {
            setFormError(error.message || "Registration failed.");
            toast.error("Registration failed!");
        } else {
            toast.success("Account created successfully!");
            router.push('/');
        }
    };

    const handleGoogleSign = async () => {
        await authClient.signIn.social({ provider: "google" });
    };

    return (
        <div className="container mx-auto my-20 max-sm:p-4">
            <form
                className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-5"
                onSubmit={onSubmit}
            >
                <div className="text-center mb-2">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Register</h1>
                    <p className="text-gray-500">Create an account to book your appointments.</p>
                </div>

                {formError && (
                    <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm">
                        {formError}
                    </div>
                )}

                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                    <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            placeholder="John Doe"
                            className="w-full h-11 pl-9 pr-3 py-2 bg-transparent border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="reg-email" className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            id="reg-email"
                            type="email"
                            name="email"
                            required
                            placeholder="john@example.com"
                            className="w-full h-11 pl-9 pr-3 py-2 bg-transparent border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="photo" className="text-sm font-medium text-gray-700">Photo URL (Optional)</label>
                    <div className="relative">
                        <ImageIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            id="photo"
                            type="text"
                            name="image"
                            placeholder="https://example.com/image.jpg"
                            className="w-full h-11 pl-9 pr-3 py-2 bg-transparent border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="reg-password" className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            id="reg-password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            placeholder="Min 6 chars, 1 uppercase, 1 lowercase"
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
                    {passwordError && (
                        <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">Must have 6+ chars, 1 uppercase, 1 lowercase</p>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full h-11 rounded-lg font-medium text-white transition-colors ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {isLoading ? "Creating Account..." : "Register"}
                </button>

                <div className="text-center text-sm">
                    <span className="text-gray-600">Already have an account? </span>
                    <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                        Login
                    </Link>
                </div>

                <div className="flex items-center gap-3">
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

export default SignUpPage;