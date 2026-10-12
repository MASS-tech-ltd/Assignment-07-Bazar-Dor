import Image from 'next/image';
import heroImg from "@/assets/bazar-hero.png"

const Banner = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full"
    })
    return (
        <div className="bg-[#FFFFF5] border border-[#e1e8e1] rounded-3xl mx-3.5 md:mt-8 mt-5 md:mx-6 lg:mx-0 shadow-sm">
            <div className="flex flex-col md:flex-row-reverse justify-between">
                <div className="flex justify-center md:block">
                    <Image
                        src={heroImg}
                        alt='Hero-Image'
                        width={315}
                        height={0}
                    />
                </div>
                <div className='md:ml-8 min-[425px]:ml-5 min-[375px]:ml-3'>
                    <div className='text-[#05893e] bg-[#f0f5f0] rounded-xl md:mt-8 mt-8 w-44 py-1 flex justify-center text-sm'>{date}</div>
                    <h1 className='font-bold lg:text-4xl md:text-[28px] min-[425px]:text-[26px] min-[375px]:text-2xl text-[#1d271f] mt-4'>আজকের বাজারের দাম এক নজরে</h1>
                    <p className=" font-normal text-[#1d271f] text-base lg:w-xl md:w-92 min-[425px]:w-94 min-[375px]:w-78 md:mt-5 mt-3 md:mb-5.5 mb-4">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>
                    <div className='md:mb-12 mb-10'>
                        <a
                            href='#all-products'
                            className="md:mb-12 mb-8 font-semibold text-[#f3fbf4]
                                    md:text-base text-xs border border-[#047f39]
                                    md:rounded-lg rounded-md bg-[#05893e] md:px-4 px-2 md:py-1.5 py-1.5
                                    hover:bg-[#047832] hover:border-[#036b2d] hover:shadow-md
                                    active:scale-97 transition-all duration-200 ease-out"
                        >
                            সব পণ্য দেখুন
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;