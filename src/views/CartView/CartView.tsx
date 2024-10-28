'use client'
import CartProduct from "@/components/CartProduct/CartProduct";
import { Toast } from "@/helpers";
import { createOrder } from "@/helpers/order.helper";
import { IProduct, IUserSession } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CartView: React.FC<{userData: IUserSession}> = ({userData}) => {
    const [cart, setCart] = useState<IProduct[]>([])
    const [total, setTotal] = useState(0)
    const router = useRouter();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
        if(storedCart) {
            let totalCart = 0
            storedCart?.forEach((item: IProduct) => {
                totalCart = totalCart + item.price
            })
            setTotal(totalCart)
            setCart(storedCart)
        }
    }, [])
    
    const handleCheckOut = async () => {
        const idProducts = cart?.map((product) => product.id)
        await createOrder(idProducts, userData.token)
        Toast.fire({
            icon: "success",
            title: "Successful purchase"
        })
        setCart([])
        setTotal(0)
        localStorage.setItem("cart", "[]")    
        router.refresh()    
        router.push("/dashboard/orders")
        router.refresh()    
    }

    const handleRemoveProduct = (productId: number) => {
        const updatedCart = cart.filter(product => product.id !== productId)
        setCart(updatedCart)
        localStorage.setItem("cart", JSON.stringify(updatedCart))

        const newTotal = updatedCart.reduce((acc, product) => acc + product.price, 0)
        setTotal(newTotal)

        Toast.fire({
            icon: "info",
            title: "Product removed from cart"
        })
    }

    const handleContinueShopping = () => {
        router.push("/")
    }

    return (
        <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
            <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
                    <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
                    <hr className="border-gray-300 mt-4 mb-8" />

                    <div className="space-y-4">
                        {cart.length ? cart?.map((product: IProduct) => (
                            <CartProduct 
                                key={product.id} 
                                {...product} 
                                onRemove={() => handleRemoveProduct(product.id)} 
                            />
                        )) : <p className="text-2xl">Add your favorite products to the cart and enjoy them.</p>}
                    </div>
                </div>

                <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
                    <h2 className="text-2xl font-bold text-gray-800">Order summary</h2>
                    <hr className="border-gray-300 mt-4 mb-8" />                    

                    <ul className="text-gray-800 mt-8 space-y-4">
                        <li className="flex flex-wrap gap-4 text-lg">Discount <span className="ml-auto font-bold">$0.00</span></li>
                        <li className="flex flex-wrap gap-4 text-lg">Shipping <span className="ml-auto font-bold">$0.00</span></li>
                        <li className="flex flex-wrap gap-4 text-lg">Tax <span className="ml-auto font-bold">$0.00</span></li>
                        <li className="flex flex-wrap gap-4 text-lg font-bold">Total <span className="ml-auto">${total}</span></li>
                    </ul>

                    <div className="mt-8 space-y-2">
                        <button onClick={handleCheckOut} type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-[#1A2238] hover:bg-blue-700 text-white rounded-md">Checkout</button>
                        <button onClick={handleContinueShopping} type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md">Continue Shopping</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartView;
