import { IProduct } from "@/types"
import React from "react"

interface CartProductProps extends IProduct {
    onRemove: () => void;
}

const CartProduct: React.FC<CartProductProps> = ({ image, name, price, onRemove }) => {
    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-md border border-gray-300">
            <div className="flex items-center gap-4">
                <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                    <img src={image} alt="product image" className="w-full h-full object-contain" />
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                    <h6 
                        className="text-sm font-semibold text-red-600 cursor-pointer mt-2"
                        onClick={onRemove}
                    >
                        X Remove
                    </h6>
                </div>
            </div>

            <div>
                <h4 className="text-xl font-bold text-gray-800">${price}</h4>
            </div>
        </div>
    )
}

export default CartProduct;
