'use client'
import { IUserSession } from "@/types"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import Cookies from 'js-cookie'
import Logout from "../Logout/Logout"

const NavbarButtons: React.FC = () => {
    const [userSession, setUserSession] = useState<IUserSession | null>(null) 
    const pathname = usePathname()
    
    useEffect(() => {
        const storedUser = JSON.parse(Cookies.get("userData") ?? '{}')
        setUserSession(storedUser)
    }, [pathname])     
    
    return (
        <div className="flex space-x-4">
            {
                !userSession?.token ? (
                    <>
                        <Link
                            href="/register"
                            className="text-white bg-red-500 hover:bg-red-600 font-semibold py-1 px-2 sm:py-1 sm:px-2 md:py-2 md:px-4 rounded"
                            >
                            Sign in
                        </Link>
                        <Link
                            href="/login"
                            className="text-white bg-red-500 hover:bg-red-600 font-semibold py-1 px-2 sm:py-1 sm:px-2 md:py-2 md:px-4 rounded"
                            >
                            Login
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            href="/cart"
                            className="text-white bg-red-500 hover:bg-red-600 font-semibold py-1 px-2 sm:py-1 sm:px-2 md:py-2 md:px-4 rounded"
                            >
                            Cart
                        </Link>
                        <Link
                            href="/dashboard"
                            className="text-white bg-red-500 hover:bg-red-600 font-semibold py-1 px-2 sm:py-1 sm:px-2 md:py-2 md:px-4 rounded"
                            >
                            Dashboard
                        </Link> 
                        <div className="text-white bg-red-500 hover:bg-red-600 font-semibold py-1 px-2 sm:py-1 sm:px-2 md:py-2 md:px-4 rounded"
                        >
                            <Logout setUserSession={setUserSession}/>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default NavbarButtons
