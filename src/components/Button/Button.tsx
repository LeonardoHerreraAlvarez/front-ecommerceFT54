"use client"
import React from "react"
import { IProduct, IUserSession } from "@/types"
import { Toast } from "@/helpers"

interface ButtonProps {
    children: React.ReactNode
    userData: IUserSession
    product: IProduct
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Button: React.FC<ButtonProps> = ({ children, userData, product}) => {
    
    const handleClick = () => {
        if(!userData.token) {
            Toast.fire({
                icon: "info",
                title: "you must be logged to add products"
            })
        } else {
            const cart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]")
            const productExist = cart.some((item: IProduct) => {
                if(item.id === product.id) return true;
                return false;                
            })

            if(productExist) {
                Toast.fire({
                    icon: "warning",
                    title: "This product already exist in your cart."
                })
            } else {
                cart.push(product)
                localStorage.setItem("cart", JSON.stringify(cart))
                Toast.fire({
                    icon: "success",
                    title: "Product added to your cart."
                })
            }            
        }
    }

    return(
        <button onClick={handleClick} className="w-2/3 mx-auto bg-[#1A2238] text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Add to Cart
        </button>
    )
}

export default Button