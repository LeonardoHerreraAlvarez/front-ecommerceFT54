import Link from "next/link";
import React from "react";
import NavbarButtons from "../NavbarButtons/NavbarButtons";
import { cookies } from "next/headers";
import SearchBar from "../SearchBar/SearchBar";
import Image from "next/image";

const Navbar = () => {
    const cookieStore = cookies();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userData = JSON.parse(cookieStore.get('userData')?.value ?? "{}")

    return (
        <nav className="p-4 bg-[#1a2238]">
            <div className="flex items-center justify-between w-full">

                <Link href="./">
                    <Image
                        src="/assets/Logo.png"
                        alt="Logo"
                        width={48}
                        height={48}
                        className="rounded-full shadow-md sm:w-10 sm:h-10 md:w-16 md:h-16"
                        title="Home"
                    />
                </Link>

                <div className="flex-grow hidden md:flex justify-center mx-4">
                    <SearchBar />
                </div>

                <div className="flex space-x-2">
                    <NavbarButtons />
                </div>
            </div>

            <div className="w-full flex justify-center mt-2 md:hidden">
                <SearchBar />
            </div>
        </nav>
    );
};

export default Navbar;
