
import allProductsDataTypes from "../allProductsDataTypes";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"


const Marquee = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const allProducts = await res.json();

    const unitNames: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        dozen: "ডজন",
        piece: "টি",
    };
    return (
        <MarqueeText direction="right" duration={18}>
            <div className="py-1">
                {
                    allProducts.map((product: allProductsDataTypes) => <span key={product.id}>
                        <span className="text-sm">{product.image}</span>
                        <span className="font-medium text-sm ml-1.5 text-[#1d271f]">{product.nameBn}</span>
                        <span className="ml-1.5">{product.today.toLocaleString("bn-BD")}</span>
                        <span className="font-normal text-[#1d271f] ml-1.5">টাকা/{unitNames[product.unit] ?? product.unit}</span>
                        {product.change.dir === "up" && (
                            <span className="ml-1.5 text-red-600 font-medium text-sm">
                                ▲ {product.change.pct.toLocaleString("bn-BD")}%
                            </span>
                        )}

                        {product.change.dir === "down" && (
                            <span className="ml-1.5 text-green-600 font-medium text-sm">
                                ▼ {Math.abs(product.change.pct)}%
                            </span>
                        )}

                        {product.change.dir === "flat" && (
                            <span className="ml-1.5 text-gray-600 font-medium text-sm">
                                — 0%
                            </span>
                        )}
                        <span className="mx-4 text-gray-500">●</span>
                    </span>)
                }
            </div>
        </MarqueeText>

    );
};

export default Marquee;