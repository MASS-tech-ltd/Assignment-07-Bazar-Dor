"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavlinksTypes {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const Navlinks = () => {
    const pathname = usePathname();
    const [categories, setCategories] = useState<NavlinksTypes[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(
                "https://openapi.programming-hero.com/api/bazardor/categories"
            );

            if (!res.ok) {
                throw new Error("Categories fetch failed");
            }

            const data: NavlinksTypes[] = await res.json();
            setCategories(data);
        };

        fetchCategories().catch((error) => {
            console.error("Categories fetch error:", error);
        });
    }, []);

    return (
        <div className="lg:flex lg:gap-5">
            {categories.map((category) => {
                const isActive =
                    pathname === `/category/${category.slug}`;

                return (
                    <li key={category.id} className="list-none">
                        <Link
                            className={`font-semibold lg:text-base md:text-sm text-sm transition-colors duration-200 ${isActive
                                ? "text-[#007104] bg-gray-200 rounded-lg px-3 py-2"
                                : "text-[#1d271f]"
                                }`}
                            href={`/category/${category.slug}`}
                        >
                            {category.icon} {category.nameBn}
                        </Link>
                    </li>
                );
            })}
        </div>
    );
};

export default Navlinks;