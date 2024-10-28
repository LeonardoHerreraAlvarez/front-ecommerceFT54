'use client'
import { Toast } from '@/helpers'
import { register } from '@/helpers/auth.helper'
import { validateRegisterForm } from '@/helpers/validate'
import { IRegisterprops, TRegisterErrors } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const RegisterView = () => {
    const router = useRouter()
    const initialState = {
        email: "",
        password: "",
        name: "",
        address: "",
        phone: "",
    }
    
    const [dataUser, setDataUser] = useState<IRegisterprops>(initialState)
    const [errors, setErrors] = useState<TRegisterErrors>(initialState)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setHasSubmitted(true);
    
        const validationErrors = validateRegisterForm(dataUser);
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length > 0) {
            Toast.fire({
                icon: "error",
                title: "Please fill out the required fields.",
            });
            return;
        }
    
        const response = await register(dataUser);
        if (response) {
            Toast.fire({
                icon: "success",
                title: "Registered successfully",
            });
            router.push("/login");
        } 
    };
        
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDataUser({...dataUser, [name]: value})
    }

    useEffect(() => {
        if (hasSubmitted) {
            const validationErrors = validateRegisterForm(dataUser);
            setErrors(validationErrors);
        }
    }, [dataUser, hasSubmitted])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Register in Super Tech Store</h1>

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
                        {hasSubmitted && errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
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
                        {hasSubmitted && errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name:</label>
                        <input 
                            id='name'
                            type='text'
                            name='name'
                            value={dataUser.name}
                            placeholder='John Doe'
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {hasSubmitted && errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address:</label>
                        <input 
                            id='address'
                            type='text'
                            name='address'
                            value={dataUser.address}
                            placeholder='123 Main St.'
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {hasSubmitted && errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone:</label>
                        <input 
                            id='phone'
                            type='text'
                            name='phone'
                            value={dataUser.phone}
                            placeholder='+1 555 555 5555'
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {hasSubmitted && errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                    </div>

                    <button 
                        type='submit'
                        className="w-full mx-auto mt-4 bg-[#1A2238] text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterView
