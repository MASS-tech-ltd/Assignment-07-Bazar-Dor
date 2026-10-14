import Link from "next/link";
import allProductsDataTypes from "../allProductsDataTypes";

const PriceDecreased = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products"
    );

    if (!res.ok) {
        throw new Error("Products fetch failed");
    }

    const allProducts: allProductsDataTypes[] = await res.json();

    const unitNames: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        dozen: "ডজন",
        piece: "টি",
    };
    return (
        <div className="lg:mt-14 md:mt-12 mt-12 mx-3.5 md:mx-6 lg:mx-0">
            <h3 className="font-bold text-xl text-[#1d271f]"><span className="text-green-600 font-medium text-base">▼</span> আজ দাম কমেছে</h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:mt-4 md:mt-3 mt-3">
                {
                    allProducts.filter((product: allProductsDataTypes) => product.change.dir === "down")
                        .sort((a, b) => a.change.pct - b.change.pct)
                        .slice(0, 6).map((product: allProductsDataTypes) =>
                            <Link key={product.id} href={`/product/${product.id}`}>
                                <div
                                    key={product.id}
                                    className="bg-[#FFFFF5] border border-[#C8D5C8] rounded-2xl transition-all duration-300 ease-out hover:border-[#05893e] hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="lg:p-6 md:p-4 p-4">
                                        <div className="flex items-center">
                                            <div className="text-3xl ">{product.image}</div>
                                            <div className="ml-3">
                                                <h3 className="font-semibold text-base text-[#1d271f]">{product.nameBn}</h3>
                                                <p className="font-normal text-xs text-[#1d271f]">প্রতি {unitNames[product.unit] ?? product.unit}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-end mt-3">
                                            <div>
                                                <h5 className="font-normal text-xs text-[#1d271f]">আজকের দাম</h5>
                                                <h2><span className="font-bold text-xl text-[#1d271f]">{product.today.toLocaleString("bn-BD")}</span> <span
                                                    className="font-medium text-sm text-[#1d271f]">টাকা</span></h2>
                                            </div>
                                            <div className="bg-[#ddfdde] rounded-xl px-1.5">
                                                <span className="ml-1.5 text-green-600 font-medium text-sm">
                                                    ▼ {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>)
                }
            </div>
        </div>
    );
};

export default PriceDecreased;