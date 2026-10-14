
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import userIcon from "@/assets/user.png";
import { BiSolidEdit } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const userdata = session?.user;

  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");

    toast.info("আপনি সফলভাবে সাইন আউট করেছেন!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <main className="min-h-screen bg-[#f0f5ef] px-4 py-4 text-[#26312b]">
      <div className="lg:mt-20 md:mt-12 mt-6 mx-auto w-full max-w-[528px]">
        <header className="mb-[18px]">
          <h1 className="text-2xl font-bold leading-7">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm leading-4 text-[#7b827d]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        <section className="mb-[17px] flex md:min-h-[86px] min-h-[70px] items-center justify-between gap-3 rounded-xl border border-[#e1e8e1] bg-[#FFFFF5] md:px-4.5 px-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex md:h-[50px] md:w-[54px] h-10 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#e8ece8]">
              <div className="avatar">
                <div className="md:w-9 w-6 rounded-full ring-2 ring-emerald-700 ring-offset-2 ring-offset-base-100">
                  <Image
                    src={userIcon}
                    alt="user-icon"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex min-w-0 items-center">
                <h2 className="min-w-0 flex-1 truncate lg:text-xl md:text-lg text-base font-semibold leading-5">
                  {userdata?.name}
                </h2>

                <Link
                  href="/profile-update"
                  aria-label="নাম আপডেট করুন"
                  title="নাম আপডেট করুন"
                  className="ml-3 shrink-0 lg:text-lg md:text-base text-sm text-[#505050] hover:text-[#07883f] hover:scale-110 transition-all duration-200"
                >
                  <BiSolidEdit />
                </Link>
              </div>

              <p className="truncate md:text-sm text-xs leading-4 text-[#777f79]">
                {userdata?.email}
              </p>
            </div>
          </div>

          <div className="grid gap-1">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex gap-1 items-center shrink-0 rounded-md border border-[#e31616] md:px-2.5 md:py-2 min-[425px]:px-2 min-[425px]:py-1.5 min-[375px]:px-1.5 min-[375px]:py-1 md:text-sm min-[425px]:text-xs min-[375px]:text-[11px] font-semibold text-[#e31616] hover:bg-red-50 hover:shadow-sm active:scale-95 transition-all duration-200"
            >
              <span className="md:text-sm min-[425px]:text-xs min-[375px]:text-[10px]">
                <FiLogOut size={16} />
              </span>
              সাইন আউট
            </button>
          </div>
        </section>

        {/* Back Home */}
        <Link
          href="/"
          className="mt-4 flex justify-center text-sm text-center text-[#7a827a] transition hover:text-[#078744]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}