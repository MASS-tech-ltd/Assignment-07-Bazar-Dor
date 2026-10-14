"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import userIcon from "@/assets/user.png";
import { FiLogOut, FiUser } from "react-icons/fi";
import { Bounce, toast } from "react-toastify";

const UserInfo = () => {
    const { data: session } = authClient.useSession();
    const userdata = session?.user;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut();
        setIsDropdownOpen(false);
        router.push("/");
        toast.info("আপনি সফলভাবে সাইন আউট করেছেন!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Bounce,
        });
    };

    return (
        <div>
            {userdata ? (
                // user info area start
                <div className="relative">
                    {/* Avatar and name */}
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        aria-expanded={isDropdownOpen}
                        className="flex items-center md:gap-3 gap-2 rounded-lg p-1
                        hover:bg-base-200 transition-colors duration-200"
                    >
                        {/* User avatar */}
                        <div className="avatar">
                            <div className="md:w-8 w-6 rounded-full ring-2
                            ring-emerald-700 ring-offset-2 ring-offset-base-100">
                                <Image
                                    src={userIcon}
                                    alt="user-icon"
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* User name */}
                        {/* User first name */}
                        <span className="font-semibold md:text-base text-sm text-[#1d271f]">
                            {userdata.name.trim().split(/\s+/)[0]}
                        </span>

                        {/* Dropdown arrow */}
                        <svg
                            className={`w-4 h-4 transition-transform duration-200
                            ${isDropdownOpen ? "rotate-180" : ""}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19 9-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full z-50 mt-3
                        md:w-54 lg:w-60 w-44 rounded-xl border border-gray-200
                        bg-base-200 p-4 shadow-lg">

                            {/* User information */}
                            <div className="border-b border-gray-200 pb-3">
                                <h2 className="break-words font-semibold text-base
                                text-[#1d271f]">
                                    {userdata.name}
                                </h2>

                                <p className="mt-1 break-all text-[13px]
                                text-base-content/70">
                                    {userdata.email}
                                </p>
                            </div>

                            {/* Edit profile */}
                            <Link
                                href="/profile"
                                onClick={() => setIsDropdownOpen(false)}
                                className="mt-3 flex gap-2 w-full items-center
                                rounded-lg px-3 py-2 text-sm font-medium
                                text-base-content hover:bg-base-200
                                transition-colors"
                            >
                                <FiUser size={16} />
                                আমার প্রোফাইল
                            </Link>

                            {/* Sign out */}
                            <button
                                type="button"
                                onClick={handleSignOut}
                                className=" flex gap-2 mt-1 w-full rounded-lg px-3 py-2
                                text-left text-sm font-semibold text-red-600
                                hover:bg-red-50 transition-colors"
                            >
                                <FiLogOut size={16} />
                                সাইন আউট
                            </button>
                        </div>
                    )}
                </div>
                // user info area end
            ) : (
                <div>
                    <Link href="/sign-in">
                        <button
                            className="font-semibold text-[#1d271f] md:text-base text-xs
                            bg-base-200 md:rounded-lg rounded-md mr-2 md:px-3 px-2
                            md:py-1.5 py-1.5 hover:bg-base-300 hover:shadow-sm
                            active:scale-97 transition-all duration-200 ease-out"
                        >
                            সাইন ইন
                        </button>
                    </Link>

                    <Link href="/sign-up">
                        <button
                            className="font-semibold text-[#f3fbf4]
                            md:text-base text-xs border border-[#047f39]
                            md:rounded-lg rounded-md bg-[#05893e] md:px-3 px-2
                            md:py-1.5 py-1.5 hover:bg-[#047832]
                            hover:border-[#036b2d] hover:shadow-md
                            active:scale-97 transition-all duration-200 ease-out"
                        >
                            সাইন আপ
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
