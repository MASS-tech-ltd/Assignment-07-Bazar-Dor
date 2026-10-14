
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center px-4">
            <h1 className="lg:mt-45 md:mt-30 mt-30 lg:text-5xl md:text-4xl text-4xl font-bold text-green-700">
                404
            </h1>

            <h2 className="text-2xl font-semibold mt-2">
                Page Not Found
            </h2>

            <p className="text-gray-500 font-medium text-xl mt-2">
                দুঃখিত! পেজটি পাওয়া যায়নি।
            </p>

            <Link
                href="/"
                className="mt-6 rounded-lg bg-green-700 px-6 py-3 text-white hover:bg-green-800 transition"
            >
                হোম পেজে ফিরে যান
            </Link>
        </div>
    );
};

export default NotFound;
