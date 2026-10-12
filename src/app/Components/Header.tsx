import Image from 'next/image';
import Logo from "@/assets/logo-icon.png"
import Navlinks from './Navlinks';
import Link from 'next/link';
import Marquee from './Marquee';


const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full"
    })
    return (
        <div className=' border border-[#D5DDD5] bg-[#fafcfa] sticky top-0 z-50'>

            <div className="navbar container mx-auto mt-2">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content border border-[#C8E6D0] bg-[#E8F5EC] rounded-box z-1 mt-3 md:w-40 w-35 p-2 shadow">
                            <Navlinks></Navlinks>
                        </ul>
                    </div>
                    <Link href={"/"}>
                        <div className='flex'>
                            <div className='rounded-xl bg-[#05893e] md:w-11  md:h-11 min-[425px]:w-11 min-[425px]:h-11 min-[375px]:w-10 min-[375px]:h-10   flex justify-center items-center'>
                                <Image
                                    className='text-center'
                                    src={Logo}
                                    alt='LOGO'
                                    width={20}
                                    height={0}
                                ></Image>
                            </div>
                            <div className='ml-2'>
                                <h2 className='font-bold text-[#1d271f] md:text-xl min-[425px]:text-lg min-[375px]:text-base'>বাজার দর</h2>
                                <div className='font-normal md:text-xs min-[425px]:text-[9px] min-[375px]:text-[7px] text-[#1d271f]'>{date}</div>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="navbar-end md:mr-5 lg:mr-0 mr-1.5">
                    <Link href="/sign-in">
                        <button
                            className="font-semibold text-[#1d271f] md:text-base text-xs
                                    bg-base-200 md:rounded-lg rounded-md mr-2 md:px-3 px-2 md:py-1.5 py-1.5
                                    hover:bg-base-300 hover:shadow-sm
                                    active:scale-97 transition-all duration-200 ease-out"
                        >
                            সাইন ইন
                        </button>
                    </Link>

                    <Link href="/sign-up">
                        <button
                            className="font-semibold text-[#f3fbf4]
                                    md:text-base text-xs border border-[#047f39]
                                    md:rounded-lg rounded-md bg-[#05893e] md:px-3 px-2 md:py-1.5 py-1.5
                                    hover:bg-[#047832] hover:border-[#036b2d] hover:shadow-md
                                    active:scale-97 transition-all duration-200 ease-out"
                        >
                            সাইন আপ
                        </button>
                    </Link>
                </div>

            </div>
            {/* Navlinks */}

            <div className="hidden lg:flex pb-1 justify-center container mx-auto">
                <ul className="menu menu-horizontal px-1">
                    <Navlinks></Navlinks>
                </ul>
            </div>
            <div className='border-t border-[#D5DDD5]'></div>
            <Marquee></Marquee>
        </div>
    );
};

export default Header;