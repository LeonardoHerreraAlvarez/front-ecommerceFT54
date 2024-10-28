'use client'
import { IUserSession } from "@/types";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

const ProfileView = () => {
    const [userSession, setUserSession] = useState<IUserSession | null>(null);
    
    useEffect(() => {
        const storedUser = JSON.parse(Cookies.get("userData") ?? '{}');
        if (Object.keys(storedUser).length > 0) {
            setUserSession(storedUser);
        } else {
            setUserSession(null);
        }
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Profile</h1>
            <hr className="my-6 border-gray-400" />
            {userSession ? (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Name: <span className="font-normal">{userSession.user.name}</span>
                    </h2>
                    <p className="text-lg font-semibold text-gray-700">
                        Shipping Address: <span className="font-normal">{userSession.user.address}</span>
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                        Phone Number: <span className="font-normal">{userSession.user.phone}</span>
                    </p>
                </div>
            ) : (
                <p className="text-lg text-red-500">No user session available. Please login.</p>
            )}
        </div>
    );
};

export default ProfileView;
