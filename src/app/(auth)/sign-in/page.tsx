import Link from "next/link";

const SignInPage = () => {
    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-5 sm:px-6 sm:py-6 md:py-5">
            <div className="mx-auto flex w-full max-w-[345px] flex-col items-center">

                {/* Heading */}
                <div className="mb-5 text-center">
                    <h1 className="text-2xl font-bold leading-tight text-[#1d271f]">
                        সাইন ইন
                    </h1>

                    <p className="mt-1 text-xs leading-5 text-[#737b73]">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রাইস হিস্ট্রি দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                {/* Login Card */}
                <div className="w-full rounded-2xl border border-[#dce7dc] bg-[#fbfdfb] p-5">

                    {/* Form Design */}
                    <div className="space-y-3.5">

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-xs font-medium text-[#1d271f]"
                            >
                                ইমেইল
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="h-[34px] w-full rounded-lg border border-[#e0e5e0] bg-transparent px-3 text-xs text-[#1d271f] outline-none placeholder:text-[#626962] transition focus:border-[#078744] focus:ring-2 focus:ring-[#078744]/10"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-xs font-medium text-[#1d271f]"
                            >
                                পাসওয়ার্ড
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                className="h-[34px] w-full rounded-lg border border-[#e0e5e0] bg-transparent px-3 text-xs text-[#1d271f] outline-none placeholder:text-[#626962] transition focus:border-[#078744] focus:ring-2 focus:ring-[#078744]/10"
                            />
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="button"
                            className="h-[35px] w-full rounded-lg bg-[#078744] text-xs font-semibold text-white shadow-[0_2px_3px_rgba(0,0,0,0.2)] transition hover:bg-[#06763b] active:scale-[0.99]"
                        >
                            সাইন ইন
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="my-3.5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#dce2dc]" />

                        <span className="text-[11px] text-[#525b52]">
                            অথবা
                        </span>

                        <div className="h-px flex-1 bg-[#dce2dc]" />
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-2">

                        {/* Google Button */}
                        <button
                            type="button"
                            className="flex h-[34px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#e0e5e0] px-2 text-[11px] font-semibold text-[#303630] transition hover:bg-[#f0f5f0]"
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
                            className="flex h-[34px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#e0e5e0] px-2 text-[11px] font-semibold text-[#303630] transition hover:bg-[#f0f5f0]"
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
                    <p className="mt-3.5 text-center text-xs text-[#454d45]">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-[#078744] hover:underline"
                        >
                            সাইন আপ করুন
                        </Link>
                    </p>
                </div>

                {/* Back to Home */}
                <Link
                    href="/"
                    className="mt-5 text-xs text-[#7a827a] transition hover:text-[#078744]"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
};

export default SignInPage;