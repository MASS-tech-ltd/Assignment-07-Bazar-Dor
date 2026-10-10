import Link from "next/link";

interface NavlinksTypes {

    id: string,
    slug: string,
    nameBn: string,
    icon: string

}


const Navlinks = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories")
    const categories = await res.json();
    return (
        <div className="lg:flex lg:gap-5">
            {
                categories.map((category: NavlinksTypes) =>
                    <li key={category.id}>
                        <Link
                            className="font-semibold lg:text-base md:text-sm text-sm text-[#1d271f]"
                            href={category.slug}
                        >
                            {category.icon} {category.nameBn}
                        </Link>
                    </li>)
            }
        </div>
    );
};

export default Navlinks;