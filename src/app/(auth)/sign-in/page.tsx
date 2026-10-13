"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import { useState } from "react";

const SignInPage = () => {
    const router = useRouter();

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleLoginSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginData = new FormData(e.currentTarget);

        const email = String(loginData.get("email") ?? "").trim();
        const password = String(loginData.get("password") ?? "");

        setEmailError(!email);
        setPasswordError(!password);

        if (!email || !password) {
            return;
        }

        const user = Object.fromEntries(loginData.entries()) as {
            email: string;
            password: string;
        };

        console.log(user);

        const { data, error } = await authClient.signIn.email({
            ...user,
            callbackURL: "/"
        });

        if (data) {
            toast.success("সাইন ইন সফল হয়েছে!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
            router.push("/");
        }

        if (error) {
            toast.error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয় !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    // Google sign in part

    const handleGoogleSignIn = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });

        if (error) {
            toast.error("Google দিয়ে সাইন ইন করা যায়নি!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
            return;
        }

        if (data) {
            toast.success("Google সাইন ইন শুরু হয়েছে!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 sm:px-6 sm:py-10">
            <div className="mx-auto flex w-full md:max-w-[400px] max-w-[360px] flex-col items-center">

                {/* Heading */}
                <div className="mb-5 text-center">
                    <h1 className="text-2xl font-bold leading-tight text-[#1d271f]">
                        সাইন ইন
                    </h1>

                    <p className="mt-1 md:text-sm text-xs leading-5 text-[#737b73]">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রাইস হিস্ট্রি দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                {/* Login Card */}
                <div className="w-full rounded-2xl border border-[#dce7dc] bg-[#fbfdfb] p-5">

                    {/* Form Design */}
                    <form onSubmit={handleLoginSubmit}>
                        <div className="space-y-3.5">

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1.5 block text-sm font-medium text-[#1d271f]"
                                >
                                    ইমেইল
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    aria-invalid={emailError}
                                    onChange={(e) => {
                                        if (e.target.value.trim()) {
                                            setEmailError(false);
                                        }
                                    }}
                                    className={`h-[34px] w-full rounded-lg border ${emailError
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                        : "border-[#e0e5e0] focus:border-[#078744] focus:ring-[#078744]/10"
                                        } bg-transparent px-3 text-xs text-[#1d271f] outline-none placeholder:text-[#626962] transition focus:ring-2`}
                                />

                                {emailError && (
                                    <p className="mt-1 text-xs text-red-600">
                                        ইমেইল পূরণ করুন।
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-1.5 block text-sm font-medium text-[#1d271f]"
                                >
                                    পাসওয়ার্ড
                                </label>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="কমপক্ষে ৮ অক্ষর"
                                    aria-invalid={passwordError}
                                    onChange={(e) => {
                                        if (e.target.value.length > 0) {
                                            setPasswordError(false);
                                        }
                                    }}
                                    className={`h-[34px] w-full rounded-lg border ${passwordError
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                        : "border-[#e0e5e0] focus:border-[#078744] focus:ring-[#078744]/10"
                                        } bg-transparent px-3 text-xs text-[#1d271f] outline-none placeholder:text-[#626962] transition focus:ring-2`}
                                />

                                {passwordError && (
                                    <p className="mt-1 text-xs text-red-600">
                                        পাসওয়ার্ড পূরণ করুন।
                                    </p>
                                )}
                            </div>

                            {/* Sign In Button */}
                            <button
                                type="submit"
                                className="h-[35px] w-full rounded-lg bg-[#078744] text-sm font-semibold text-white shadow-[0_2px_3px_rgba(0,0,0,0.2)] transition hover:bg-[#06763b] active:scale-[0.99]"
                            >
                                সাইন ইন
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="my-3.5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#dce2dc]" />

                        <span className="text-sm text-[#525b52]">
                            অথবা
                        </span>

                        <div className="h-px flex-1 bg-[#dce2dc]" />
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-2">

                        {/* Google Button */}
                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            className="flex h-[34px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#e0e5e0] px-2 md:text-sm text-xs font-semibold text-[#303630] transition hover:bg-[#f0f5f0]"
                        >
                            <svg
                                viewBox="0 0 48 48"
                                className="h-[14px] w-[14px] shrink-0"
                                aria-hidden="true"
                            >
                                <path
                                    fill="#4285F4"
                                    d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5h6.7c3.9-3.6 6-8.9 6-14.9Z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.7-5c-1.9 1.3-4.1 2-6.8 2-5.2 0-9.6-3.5-11.2-8.2H5.9v5.2A20 20 0 0 0 24 44Z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M12.8 28a12 12 0 0 1 0-8v-5.2H5.9a20 20 0 0 0 0 18.4l6.9-5.2Z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M24 11.8c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 5.7 29.5 4 24 4A20 20 0 0 0 5.9 14.8l6.9 5.2c1.6-4.7 6-8.2 11.2-8.2Z"
                                />
                            </svg>

                            Google দিয়ে চালিয়ে যান
                        </button>

                        {/* GitHub Button */}
                        <button
                            type="button"
                            className="flex h-[34px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#e0e5e0] px-2 md:text-sm text-xs font-semibold text-[#303630] transition hover:bg-[#f0f5f0]"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-[14px] w-[14px] shrink-0 fill-current"
                                aria-hidden="true"
                            >
                                <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.2.8-.5v-2c-3.4.7-4.1-1.4-4.1-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.8-5.5 6.1.4.4.8 1 .8 2v3.3c0 .3.2.6.8.5A11.1 11.1 0 0 0 12 .9Z" />
                            </svg>

                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <p className="mt-3.5 text-center text-sm text-[#454d45]">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link
                            href="/sign-up"
                            className="font-semibold text-[#078744] hover:underline"
                        >
                            সাইন আপ করুন
                        </Link>
                    </p>
                </div>

                {/* Back to Home */}
                <Link
                    href="/"
                    className="mt-5 text-sm text-[#7a827a] transition hover:text-[#078744]"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
};

export default SignInPage;