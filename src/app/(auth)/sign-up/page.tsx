
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";

const SignupPage = () => {
  const router = useRouter();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Sign Up button loading state
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSigningUp) return;

    const signUpData = new FormData(e.currentTarget);

    const user = Object.fromEntries(signUpData.entries()) as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Name Validation
    if (!user.name.trim()) {
      newErrors.name = "আপনার নাম লিখুন।";
    }

    // Email Validation
    if (!user.email.trim()) {
      newErrors.email = "আপনার ইমেইল লিখুন।";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(user.email)
    ) {
      newErrors.email = "সঠিক ইমেইল লিখুন।";
    }

    // Password Validation
    if (!user.password) {
      newErrors.password = "পাসওয়ার্ড লিখুন।";
    } else if (user.password.length < 8) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
    }

    // Confirm Password Validation
    if (!user.confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড নিশ্চিত করুন।";
    } else if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = "দুটি পাসওয়ার্ড মিলছে না।";
    }

    setErrors(newErrors);

    // 
    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    setIsSigningUp(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: user.name.trim(),
        email: user.email.trim(),
        password: user.password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          "এই ইমেইলটি আগে থেকেই ব্যবহৃত! অন্য ইমেইল ব্যবহার করুন।",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Bounce,
          }
        );

        return;
      }

      if (data) {
        await authClient.signOut();
        toast.success("অ্যাকাউন্ট তৈরি সফল হয়েছে!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });
        router.push("/sign-in");

      } else {
        toast.error("অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setIsSigningUp(false);
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
        autoClose: 2000,
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
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  // Github sign in part
  const handleGithubSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      toast.error("Github দিয়ে সাইন ইন করা যায়নি!", {
        position: "top-right",
        autoClose: 2000,
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
      toast.success("Github সাইন ইন শুরু হয়েছে!", {
        position: "top-right",
        autoClose: 2000,
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

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold leading-tight text-[#1d271f]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-1 text-sm text-[#737b73]">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="w-full rounded-2xl border border-[#dce7dc] bg-[#fbfdfb] p-5 sm:p-5">

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-3.5">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-[#1d271f]"
                >
                  নাম
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="নাম"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  onChange={() =>
                    setErrors((prev) => ({ ...prev, name: "" }))
                  }
                  className={`h-9 w-full rounded-lg border bg-transparent px-3 text-xs text-[#1d271f] outline-none placeholder:text-[#626962] focus:ring-2 focus:ring-[#078744]/10 ${errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                    : "border-[#e0e5e0] focus:border-[#078744]"
                    }`}
                />

                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

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
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  onChange={() =>
                    setErrors((prev) => ({ ...prev, email: "" }))
                  }
                  className={`h-9 w-full rounded-lg border bg-transparent px-3 text-xs text-[#1d271f] outline-none placeholder:text-[#626962] focus:ring-2 focus:ring-[#078744]/10 ${errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                    : "border-[#e0e5e0] focus:border-[#078744]"
                    }`}
                />

                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-500">
                    {errors.email}
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
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  onChange={() =>
                    setErrors((prev) => ({ ...prev, password: "" }))
                  }
                  className={`h-9 w-full rounded-lg border bg-transparent px-3 text-xs text-[#1d271f] outline-none placeholder:text-[#626962] focus:ring-2 focus:ring-[#078744]/10 ${errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                    : "border-[#e0e5e0] focus:border-[#078744]"
                    }`}
                />

                {errors.password && (
                  <p id="password-error" className="mt-1 text-xs text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1.5 block text-sm font-medium text-[#1d271f]"
                >
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="আবার লিখুন"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={
                    errors.confirmPassword
                      ? "confirmPassword-error"
                      : undefined
                  }
                  onChange={() =>
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: "",
                    }))
                  }
                  className={`h-9 w-full rounded-lg border bg-transparent px-3 text-xs text-[#1d271f] outline-none placeholder:text-[#626962] focus:ring-2 focus:ring-[#078744]/10 ${errors.confirmPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                    : "border-[#e0e5e0] focus:border-[#078744]"
                    }`}
                />

                {errors.confirmPassword && (
                  <p
                    id="confirmPassword-error"
                    className="mt-1 text-xs text-red-500"
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/*Account Button*/}
              <button
                type="submit"
                disabled={isSigningUp}
                className="flex h-[37px] w-full items-center justify-center gap-2 rounded-lg bg-[#078744] text-sm font-semibold text-white shadow-[0_2px_3px_rgba(0,0,0,0.2)] transition hover:bg-[#06763b] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSigningUp && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}

                {isSigningUp
                  ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                  : "অ্যাকাউন্ট তৈরি করুন"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-3.5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#dce2dc]" />
            <span className="text-xs text-[#525b52]">
              অথবা
            </span>
            <div className="h-px flex-1 bg-[#dce2dc]" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-2">

            {/* Google */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex h-[35px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#e0e5e0] md:text-sm text-xs font-semibold text-[#303630] transition hover:bg-[#f0f5f0]"
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

            {/* GitHub */}
            <button
              onClick={handleGithubSignIn}
              type="button"
              className="flex h-[35px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#e0e5e0] md:text-sm text-xs font-semibold text-[#303630] transition hover:bg-[#f0f5f0]"
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

          {/* Sign In */}
          <p className="mt-4 text-center text-sm text-[#454d45]">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-[#078744] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Back Home */}
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

export default SignupPage;
