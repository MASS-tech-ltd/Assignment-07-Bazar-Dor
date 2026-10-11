"use client";

import { useState } from "react";
import Link from "next/link";
import allProductsDataTypes from "@/app/allProductsDataTypes";

type SortingProps = {
    categoryData: allProductsDataTypes[];
};

const Sorting = ({ categoryData }: SortingProps) => {
    const [sortOrder, setSortOrder] = useState("default");

    const unitNames: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        dozen: "ডজন",
        piece: "টি",
    };

    const sortedProducts = [...categoryData].sort((a, b) => {
        if (sortOrder === "high-to-low") {
            return b.today - a.today;
        }

        if (sortOrder === "low-to-high") {
            return a.today - b.today;
        }

        return 0;
    });

    return (
        <>
            {/* Sorting section start */}

            <div className="flex items-center bg-[#FFFFF5] border border-[#C8D5C8] rounded-xl mt-6 lg:p-5 md:p-4 p-3 justify-end">
                <h5 className="font-medium text-sm text-[#1d271f]">
                    সাজান
                </h5>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="select ml-3 w-40 rounded-xl"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="high-to-low">দাম বেশি থেকে কম</option>
                    <option value="low-to-high">দাম কম থেকে বেশি</option>
                </select>
            </div>

            {/* Sorting section end */}

            <p className="mt-6 font-normal text-sm text-[#1d271f]">
                মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
            </p>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:mt-4 md:mt-3 mt-3">
                {sortedProducts.map((data) => (
                    <Link key={data.id} href={`/product/${data.id}`}>
                        <div className="bg-[#FFFFF5] border border-[#C8D5C8] rounded-2xl transition-all duration-300 ease-out hover:border-[#05893e] hover:-translate-y-1 hover:shadow-md">
                            <div className="lg:p-6 md:p-4 p-4">
                                <div className="flex items-center">
                                    <div className="text-3xl">
                                        {data.image}
                                    </div>

                                    <div className="ml-3">
                                        <h3 className="font-semibold text-base text-[#1d271f]">
                                            {data.nameBn}
                                        </h3>

                                        <p className="font-normal text-xs text-[#1d271f]">
                                            প্রতি {unitNames[data.unit] ?? data.unit}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mt-3">
                                    <div>
                                        <h5 className="font-normal text-xs text-[#1d271f]">
                                            আজকের দাম
                                        </h5>

                                        <h2>
                                            <span className="font-bold text-xl text-[#1d271f]">
                                                {data.today.toLocaleString("bn-BD")}
                                            </span>{" "}

                                            <span className="font-medium text-sm text-[#1d271f]">
                                                টাকা
                                            </span>
                                        </h2>
                                    </div>

                                    <div>
                                        {data.change.dir === "up" && (
                                            <div className="bg-red-100 rounded-xl px-1.5">
                                                <span className="text-red-600 font-medium text-sm">
                                                    ▲ {data.change.pct.toLocaleString("bn-BD")}%
                                                </span>
                                            </div>
                                        )}

                                        {data.change.dir === "down" && (
                                            <div className="bg-[#ddfdde] rounded-xl px-1.5">
                                                <span className="text-green-600 font-medium text-sm">
                                                    ▼ {Math.abs(data.change.pct).toLocaleString("bn-BD")}%
                                                </span>
                                            </div>
                                        )}

                                        {data.change.dir === "flat" && (
                                            <div className="bg-[#DADDE2] rounded-xl px-2">
                                                <span className="text-gray-600 font-medium text-sm">
                                                    — {Number(0).toLocaleString("bn-BD")}%
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Sorting;
