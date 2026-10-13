import { FiLogOut } from "react-icons/fi";

export default function ProfilePage() {
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

        <section className="mb-[17px] flex min-h-[86px] items-center justify-between gap-3 rounded-xl border border-[#e1e8e1] bg-[#FFFFF5] px-4.5 py-4">
          <div className="flex min-w-0 items-center gap-[13px]">
            <div className="flex h-[50px] w-[54px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#e8ece8]">
              <span className="text-lg font-semibold text-[#526257]">
                RA
              </span>
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-xl font-semibold leading-5">
                Rezwan Ahmed
              </h2>
              <p className="truncate text-sm leading-4 text-[#777f79]">
                rezwanahmed@gmail.com
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex gap-1.5 items-center shrink-0 rounded-md border border-[#e31616] px-3 py-2 text-sm font-semibold text-[#e31616] hover:bg-red-50 hover:shadow-sm active:scale-95 transition-all duration-200"
          >
            <FiLogOut size={16} /> সাইন আউট
          </button>
        </section>

        <section className="rounded-xl border border-[#e1e8e1] bg-[#FFFFF5] px-[14px] pb-[30px] pt-[15px]">
          <h2 className="ml-1 mt-2 mb-6 text-lg font-bold leading-5">
            তথ্য
          </h2>

          <div className="px-[17px]">
            <label
              htmlFor="name"
              className="mb-[5px] block text-sm font-medium"
            >
              নাম
            </label>
            <input
              id="name"
              type="text"
              readOnly
              className="h-10 w-full rounded-lg border border-[#dcdedc] bg-transparent px-3 text-[12px] outline-none"
            />
            <button
              type="button"
              className="mt-3 flex h-10 w-full items-center justify-center rounded-lg bg-[#07883f] text-sm font-semibold text-white shadow-[0_2px_3px_rgba(0,100,40,0.28)] hover:bg-[#067436] hover:shadow-md active:scale-[0.97] transition-all duration-200"
            >
              আপডেট
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}