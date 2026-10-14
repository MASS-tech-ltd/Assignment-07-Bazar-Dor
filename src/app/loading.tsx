

const loading = () => {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
                <span className="loading loading-spinner text-[#07883f] !w-10 !h-10 lg:!w-14 lg:!h-14"></span>
                <p className="mt-3 text-base font-medium text-[#1d271f]">
                    পণ্য লোড হচ্ছে...
                </p>
            </div>
        </div>
    );
};

export default loading;