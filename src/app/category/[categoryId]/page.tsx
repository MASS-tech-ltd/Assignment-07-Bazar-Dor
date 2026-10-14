import allProductsDataTypes from "@/app/allProductsDataTypes";
import Sorting from "@/app/Components/Sorting";
import { notFound } from "next/navigation";


const page = async ({ params }: { params: Promise<{ categoryId: string }> }) => {
    const { categoryId } = await params
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`)
    if (!res.ok) {
        throw new Error("Products fetch failed");
    }
    const categoryData: allProductsDataTypes[] = await res.json();

    if(categoryData.length === 0){
            notFound();
        }

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

                {/* Sorting section start */}
                <Sorting categoryData={categoryData} />
                {/* Sorting section end */}
            </div>
        </div>
    );
};

export default page;