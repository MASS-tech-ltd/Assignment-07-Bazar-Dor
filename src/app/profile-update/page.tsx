
"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import Link from "next/link";

export default function ProfileUpdatePage() {
    const { data: session } = authClient.useSession();
    const userdata = session?.user;

    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();



    const handleUpdate = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const updatedData = new FormData(e.currentTarget);
        const name = updatedData.get("name")?.toString().trim();

        if (!name) {
            toast.error("নাম লিখুন!");
            return;
        }

        // আগের নামের সঙ্গে নতুন নাম মিলিয়ে দেখা
        if (name === userdata?.name?.trim()) {
            toast.error("নতুন নাম দিন!");
            return;
        }

        setIsUpdating(true);

        try {
            const { error } = await authClient.updateUser({ name });

            if (error) {
                toast.error("নাম পরিবর্তন করা যায়নি!");
                return;
            }

            toast.success("আপনি সফলভাবে নাম পরিবর্তন করেছেন!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });

            router.push("/profile");
        } catch {
            toast.error("কিছু একটা সমস্যা হয়েছে!");
        } finally {
            setIsUpdating(false);
        }
    };



    return (
        <main className="min-h-screen bg-[#f0f5ef] px-4 py-4 text-[#26312b]">
            <div className="lg:mt-20 md:mt-12 mt-6 mx-auto w-full max-w-[528px]">
                <header className="mb-[18px]">
                    <h1 className="text-2xl font-bold leading-7">
                        তথ্য আপডেট
                    </h1>

                    <p className="mt-1 text-sm leading-4 text-[#7b827d]">
                        আপনার অ্যাকাউন্টের তথ্য পরিবর্তন করুন।
                    </p>
                </header>

                <section className="rounded-xl border border-[#e1e8e1] bg-[#FFFFF5] px-[14px] pb-[30px] pt-[15px]">
                    <h2 className="ml-1 mt-2 mb-6 text-lg font-bold leading-5">
                        তথ্য
                    </h2>

                    <form onSubmit={handleUpdate}>
                        <div className="px-[17px]">
                            <label
                                htmlFor="name"
                                className="mb-[5px] block text-base font-medium"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                defaultValue={userdata?.name ?? ""}
                                placeholder="নাম"
                                className="h-10 w-full rounded-lg border border-[#dcdedc] bg-transparent px-3 text-sm font-medium outline-none"
                            />

                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#07883f] text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#067436] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isUpdating && (
                                    <span className="loading loading-spinner loading-xs"></span>
                                )}

                                {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
                            </button>
                        </div>
                    </form>
                </section>

                {/* Back to Profile */}
                <Link
                    href="/profile"
                    className="mt-4 flex justify-center text-sm text-center text-[#7a827a] transition hover:text-[#078744]"
                >
                    ← প্রোফাইলে ফিরে যান
                </Link>
            </div>
        </main>
    );
}