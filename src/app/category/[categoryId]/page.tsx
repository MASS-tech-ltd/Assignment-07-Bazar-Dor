import allProductsDataTypes from "@/app/allProductsDataTypes";


const page = async ({ params }: { params: Promise<{ categoryId: string }> }) => {
    const { categoryId } = await params
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`)
    if (!res.ok) {
        throw new Error("Products fetch failed");
    }
    const categoryData: allProductsDataTypes[] = await res.json();

    const unitNames: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        dozen: "ডজন",
        piece: "টি",
    };
    return (
        <div className="container mx-auto mt-6">
            <div className="md:mx-6 lg:mx-0 mx-3.5">
                {categoryData.length > 0 && (
                    <div className="flex items-center bg-[#FFFFF5] border border-[#C8D5C8] rounded-2xl p-5">
                        <div>
                            <span className="text-4xl">{categoryData[0].categoryIcon}</span>
                        </div>
                        <div className="ml-2.5">
                            <span className="font-bold text-2xl text-[#1d271f]">{categoryData[0].categoryNameBn}</span>
                            <p className="font-normal text-sm text-[#1d271f]">{categoryData.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
                        </div>
                    </div>
                )}
                <p className="mt-6 font-normal text-sm text-[#1d271f]">মোট {categoryData.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</p>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:mt-4 md:mt-3 mt-3">
                    {
                        categoryData.map((data: allProductsDataTypes) =>
                            <div
                                key={data.id}
                                className="bg-[#FFFFF5] border border-[#C8D5C8] rounded-2xl transition-all duration-300 ease-out hover:border-[#05893e] hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="lg:p-6 md:p-4 p-4">
                                    <div className="flex items-center">
                                        <div className="text-3xl ">{data.image}</div>
                                        <div className="ml-3">
                                            <h3 className="font-semibold text-base text-[#1d271f]">{data.nameBn}</h3>
                                            <p className="font-normal text-xs text-[#1d271f]">প্রতি {unitNames[data.unit] ?? data.unit}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end mt-3">
                                        <div>
                                            <h5 className="font-normal text-xs text-[#1d271f]">আজকের দাম</h5>
                                            <h2><span className="font-bold text-xl text-[#1d271f]">{data.today.toLocaleString("bn-BD")}</span> <span
                                                className="font-medium text-sm text-[#1d271f]">টাকা</span></h2>
                                        </div>
                                        <div>
                                            {
                                                data.change.dir === "up" && <div className="bg-red-100 rounded-xl px-1.5">
                                                    <span className="text-red-600 font-medium text-sm">
                                                        ▲ {data.change.pct.toLocaleString("bn-BD")}%
                                                    </span>
                                                </div>
                                            }
                                            {
                                                data.change.dir === "down" && <div className="bg-[#ddfdde] rounded-xl px-1.5">
                                                    <span className=" text-green-600 font-medium text-sm">
                                                        ▼ {Math.abs(data.change.pct).toLocaleString("bn-BD")}%
                                                    </span>
                                                </div>
                                            }
                                            {
                                                data.change.dir === "flat" && <div className="bg-[#DADDE2] rounded-xl px-2">
                                                    <span className="text-gray-600 font-medium text-sm">
                                                        — {Number(0).toLocaleString("bn-BD")}%
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default page;