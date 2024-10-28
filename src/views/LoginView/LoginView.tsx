'use client'
import { login } from '@/helpers/auth.helper'
import { validateLoginForm } from '@/helpers/validate'
import { ILoginErrors, ILoginProps } from '@/types'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Toast } from '@/helpers'
import { useRouter } from 'next/navigation'

const LoginView = () => {
    const router = useRouter()
    const initialState = {
        email: "",
        password: ""
    }
    
    const [dataUser, setDataUser] = useState<ILoginProps>(initialState)
    const [errors, setErrors] = useState<ILoginErrors>(initialState)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const response = await login(dataUser);
    
        if (response?.error) {
            Toast.fire({
                icon: "error",
                title: response.error
            });
            return;
        }
    
        const { token, user } = response;
        if (!token || !user) {
            Toast.fire({
                icon: "error",
                title: "Login failed: Invalid response from server"
            });
            return;
        }
    
        Cookies.set('userData', JSON.stringify({ token, user }), { expires: 1 });
        Toast.fire({
            icon: "success",
            title: "Login successfully"
        });
        router.push("/");
    };
    
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDataUser({
            ...dataUser,
            [name]: value
        })   
    }
    
    useEffect(() => {
        const errors = validateLoginForm(dataUser)
        setErrors(errors)
    }, [dataUser])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login in Super Tech Store</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email_address" className="block text-gray-700 font-medium mb-2">Email:</label>
                        <input 
                            id='email_address'
                            type='email'
                            name='email'
                            value={dataUser.email}
                            placeholder='JohnDoe@example.com'
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password:</label>
                        <div className="relative">
                            <input 
                                id='password'
                                type={isPasswordVisible ? 'text' : 'password'}
                                name='password'
                                value={dataUser.password}
                                placeholder='********'
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                                {isPasswordVisible ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    </div>

                    <button 
                        type='submit'
                        className="w-full mx-auto mt-4 bg-[#1A2238] text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginView
