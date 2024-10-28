'use client'
import { Toast } from "@/helpers"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const SearchBar = () => {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(searchQuery.length) {
            router.push(`/products/${searchQuery}`)
            setSearchQuery('')
        } else {
            Toast.fire({
                icon: "warning",                
                title: "Nothing to search"
            })
        }
    }   
    return(
        <form onSubmit={handleSearch} className="flex items-center border-none">
            <input 
                onChange={(e) => setSearchQuery(e.target.value)} 
                value={searchQuery}
                type="text" 
                placeholder="Find your product" 
                className="px-4 py-2 border-0 border-blue-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-700" 
            />
            <button 
                type="submit" 
                className="flex items-center justify-center px-4 py-2 bg-blue-700 text-white border border-blue-700 rounded-r-md hover:bg-blue-800 focus:ring-2 focus:ring-blue-700"
            >
                <svg 
                    className="w-6 h-6" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 20 20"
                >
                    <path 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" 
                    />
                </svg>
            </button>
        </form>
    )
}

export default SearchBar