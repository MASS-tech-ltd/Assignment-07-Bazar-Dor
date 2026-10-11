
import allProductsDataTypes from "@/app/allProductsDataTypes";

const page = async ({params}: {params: Promise<{ productId: string }>}) => {
    
    const { productId } = await params;

    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${productId}`);

    if (!res.ok) {
        throw new Error("Products fetch failed");
    }

    const productData: allProductsDataTypes = await res.json();

    const unitNames: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        dozen: "ডজন",
        piece: "টি",
    };

    // Calculate market prices
    const markets = productData.markets ?? [];

    const allMinPrices = markets.map(
        (market) => market.min
    );

    const allMaxPrices = markets.map(
        (market) => market.max
    );

    const minPrice =
        markets.length > 0
            ? Math.min(...allMinPrices)
            : 0;

    const maxPrice =
        markets.length > 0
            ? Math.max(...allMaxPrices)
            : 0;

    const averagePrice =
        markets.length > 0
            ? markets.reduce(
                (total, market) =>
                    total + (market.min + market.max) / 2,
                0
            ) / markets.length
            : 0;

    const formatPrice = (price: number) =>
        price.toLocaleString("bn-BD", {
            maximumFractionDigits: 2,
        });

    return (
        <div className="container mx-auto mt-6">
            <div className="md:mx-6 lg:mx-0 mx-3.5">
                <div className="md:flex md:justify-between md:items-center bg-[#FFFFF5] border border-[#C8D5C8] rounded-2xl md:py-6 py-6 md:px-8 px-6">
                    <div className="flex">
                        <div className="bg-[#f0f5f0] h-22 md:h-auto rounded-2xl p-4">
                            <span className="text-5xl">
                                {productData.image}
                            </span>
                        </div>

                        <div className="ml-2.5">
                            <span className="font-bold text-3xl text-[#1d271f]">
                                {productData.nameBn}
                            </span>

                            <div>
                                <span className="font-normal text-[15px] text-gray-500">
                                    প্রতি{" "}
                                    {unitNames[productData.unit] ??
                                        productData.unit}{" "}
                                    · {productData.categoryNameBn}
                                </span>

                                {productData.change.dir === "up" && (
                                    <div>
                                        <span className="font-normal text-[15px] text-[#1d271f]">
                                            গতকালের তুলনায় আজ দাম{" "}
                                            <span className="font-semibold">
                                                বেড়েছে
                                            </span>{" "} {(productData.today - productData.yesterday).toLocaleString("bn-BD")}{" "}
                                            টাকা
                                        </span>
                                    </div>
                                )}

                                {productData.change.dir === "down" && (
                                    <div>
                                        <span className="font-normal text-[15px] text-[#1d271f]">
                                            গতকালের তুলনায় আজ দাম{" "}
                                            <span className="font-semibold">
                                                কমেছে
                                            </span>{" "} {(productData.yesterday - productData.today).toLocaleString("bn-BD")}{" "}
                                            টাকা
                                        </span>
                                    </div>
                                )}

                                {productData.change.dir === "flat" && (
                                    <div>
                                        <span className="font-normal text-[15px] text-[#1d271f]">
                                            আজ দাম অপরিবর্তিত আছে
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="hidden md:block bg-[#f0f5f0] rounded-2xl py-4 px-5 text-center">
                            <p className="font-normal text-[15px] text-gray-500">
                                আজকের দাম
                            </p>

                            <h2 className="text-3xl font-bold text-[#1d271f]">
                                {productData.today.toLocaleString("bn-BD")}
                            </h2>

                            <p className="font-normal text-[15px] text-gray-500">
                                টাকা /{" "}
                                {unitNames[productData.unit] ??
                                    productData.unit}
                            </p>

                            {productData.change.dir === "up" && (
                                <div>
                                    <span className="text-red-600 font-medium text-sm">
                                        ▲{" "}
                                        {productData.change.pct.toLocaleString(
                                            "bn-BD"
                                        )}
                                        %
                                    </span>
                                </div>
                            )}

                            {productData.change.dir === "down" && (
                                <div>
                                    <span className="text-green-600 font-medium text-sm">
                                        ▼{" "}
                                        {Math.abs(
                                            productData.change.pct
                                        ).toLocaleString("bn-BD")}
                                        %
                                    </span>
                                </div>
                            )}

                            {productData.change.dir === "flat" && (
                                <div>
                                    <span className="text-gray-600 font-medium text-sm">
                                        — {Number(0).toLocaleString("bn-BD")}%
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Mobile device */}
                        <div className="block md:hidden">
                            <div className="flex justify-between mt-4 items-center bg-[#f0f5f0] rounded-xl min-[425px]:px-4 min-[375px]:px-2.5 pb-1 text-center">
                                <div>
                                    <span className="font-normal text-[15px] text-gray-500">
                                        আজকের দাম
                                    </span>

                                    <span className="px-1.5 text-3xl font-bold text-[#1d271f]">
                                        {productData.today.toLocaleString(
                                            "bn-BD"
                                        )}
                                    </span>

                                    <span className="font-normal text-[15px] text-gray-500">
                                        টাকা /{" "}
                                        {unitNames[productData.unit] ??
                                            productData.unit}
                                    </span>
                                </div>

                                <div className="mt-1.5">
                                    {productData.change.dir === "up" && (
                                        <div>
                                            <span className="text-red-600 font-bold text-sm">
                                                ▲{" "}
                                                {productData.change.pct.toLocaleString(
                                                    "bn-BD"
                                                )}
                                                %
                                            </span>
                                        </div>
                                    )}

                                    {productData.change.dir === "down" && (
                                        <div>
                                            <span className="text-green-600 font-bold text-sm">
                                                ▼{" "}
                                                {Math.abs(
                                                    productData.change.pct
                                                ).toLocaleString("bn-BD")}
                                                %
                                            </span>
                                        </div>
                                    )}

                                    {productData.change.dir === "flat" && (
                                        <div>
                                            <span className="text-gray-600 font-bold text-sm">
                                                —{" "}
                                                {Number(0).toLocaleString(
                                                    "bn-BD"
                                                )}
                                                %
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2nd part start */}

                {/* Market Price Summary */}
                <div className="mt-6 mb-8">
                    <div className="rounded-2xl border border-[#C8D5C8] bg-[#FFFFF5] p-4 sm:p-5 md:p-6">
                        {/* Section Title */}
                        <h2 className="mb-3.5 text-lg font-bold text-[#1d271f]">
                            দামের সারসংক্ষেপ
                        </h2>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
                            {/* Minimum Price */}
                            <div className="rounded-xl border border-[#e0e5df] bg-[#fbfdfb] px-4 py-3.5">
                                <p className="text-xs font-medium text-gray-500">
                                    সর্বনিম্ন দাম
                                </p>

                                <h3 className="mt-1 text-2xl font-bold text-[#009719]">
                                    {formatPrice(minPrice)} <span className="text-sm font-medium">
                                        টাকা
                                    </span>
                                </h3>

                                <p className="mt-1 text-xs font-medium text-gray-600">
                                    সবচেয়ে কম দামের বাজার
                                </p>
                            </div>

                            {/* Maximum Price */}
                            <div className="rounded-xl border border-[#e0e5df] bg-[#fbfdfb] px-4 py-3.5">
                                <p className="text-xs font-medium text-gray-500">
                                    সর্বাধিক দাম
                                </p>

                                <h3 className="mt-1 text-2xl font-bold text-[#d80000]">
                                    {formatPrice(maxPrice)} <span className="text-sm font-medium">
                                        টাকা
                                    </span>
                                </h3>

                                <p className="mt-1 text-xs font-medium text-gray-600">
                                    সবচেয়ে বেশি দামের বাজার
                                </p>
                            </div>

                            {/* Average Price */}
                            <div className="rounded-xl border border-[#e0e5df] bg-[#fbfdfb] px-4 py-3.5">
                                <p className="text-xs font-medium text-gray-500">
                                    গড় দাম
                                </p>

                                <h3 className="mt-1 text-2xl font-bold text-[#000dc3]">
                                    {formatPrice(averagePrice)} <span className="text-sm font-medium">
                                        টাকা
                                    </span>
                                </h3>

                                <p className="mt-1 text-xs font-medium text-gray-600">
                                    প্রতি{" "}
                                    {unitNames[
                                        productData.unit
                                    ] ?? productData.unit}{" "}
                                    হিসেবে
                                </p>
                            </div>
                        </div>

                        {/* Market-wise Price Table */}
                        <h2 className="mb-3 mt-6 text-lg font-bold text-[#1d271f]">
                            বাজারভিত্তিক আজকের দাম
                        </h2>

                        <div className="overflow-hidden rounded-xl border border-[#e0e5df]">
                            <div className="w-full overflow-x-auto">
                                <table className="w-full min-w-[650px] border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b border-[#e7ebe7] bg-[#f9fcf9] text-left text-base font-medium text-gray-500">
                                            <th className="px-3 py-3 md:px-4">
                                                বাজার
                                            </th>
                                            <th className="px-3 py-3 md:px-4">
                                                বিভাগ
                                            </th>
                                            <th className="px-3 py-3 text-right md:px-4">
                                                সর্বনিম্ন
                                            </th>
                                            <th className="px-3 py-3 text-right md:px-4">
                                                সর্বাধিক
                                            </th>
                                            <th className="px-3 py-3 text-right md:px-4">
                                                গড়
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {markets.map((market, index) => {
                                            const marketAverage =
                                                (market.min +
                                                    market.max) /
                                                2;

                                            return (
                                                <tr
                                                    key={`${market.market}-${index}`}
                                                    className={`border-b border-[#dce2dc] last:border-b-0 ${index %
                                                        2 === 0 ? "bg-[#f9fcf9]" : "bg-[#f0f5f0]"
                                                        }`}
                                                >
                                                    <td className="whitespace-nowrap px-3 py-3 font-medium text-[#1d271f] md:px-4">
                                                        {market.market}
                                                    </td>

                                                    <td className="whitespace-nowrap px-3 py-3 text-[#1d271f] md:px-4">
                                                        {market.division}
                                                    </td>

                                                    <td className="whitespace-nowrap px-3 py-3 text-right text-[#1d271f] md:px-4">
                                                        {formatPrice(
                                                            market.min
                                                        )}{" "}
                                                        টাকা
                                                    </td>

                                                    <td className="whitespace-nowrap px-3 py-3 text-right text-[#1d271f] md:px-4">
                                                        {formatPrice(
                                                            market.max
                                                        )}{" "}
                                                        টাকা
                                                    </td>

                                                    <td className="whitespace-nowrap px-3 py-3 text-right font-semibold text-[#1d271f] md:px-4">
                                                        {formatPrice(
                                                            marketAverage
                                                        )}{" "}
                                                        টাকা
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                        {markets.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-4 py-8 text-center text-gray-500"
                                                >
                                                    কোনো বাজারের
                                                    তথ্য পাওয়া
                                                    যায়নি।
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2nd part end */}
            </div>
        </div>
    );
};

export default page;
