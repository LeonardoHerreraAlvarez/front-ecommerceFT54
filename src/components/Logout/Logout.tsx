'use client'
import React from "react";
import Cookies from "js-cookie";
import { Toast } from "@/helpers";
import { useRouter } from "next/navigation";
import { IUserSession } from "@/types";

const Logout: React.FC<{ setUserSession: (session: IUserSession | null) => void }> = ({ setUserSession }) => {

    const router = useRouter();
    
    const handleLogout = () => {
        Cookies.remove('userData');
        setUserSession(null);
        Toast.fire({
            icon: "success",
            title: "Logout Successfully"
        });
        router.push("/");
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;
