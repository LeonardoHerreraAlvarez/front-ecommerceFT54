import { IProduct } from "@/types";
import React from "react";
import Button from "@/components/Button/Button"
import { cookies } from "next/headers";


const ProductDetail: React.FC<IProduct> = (props) => {
    
    const { name, image, description, stock, price } = props
    const cookieStore = cookies();
    const userData = JSON.parse(cookieStore.get('userData')?.value ?? "{}")
    
    
    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
                <img 
                    src={image} 
                    alt="product image" 
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            <div className="md:w-1/2 flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{name}</h1>

                <p className="text-gray-700 mb-6">{description}</p>

                <p className="text-xl font-semibold text-gray-900 mb-4">Price: 
                    <span className="text-gray-900"> ${price}</span>
                </p>

                <p className={`text-md ${stock > 0 ? 'text-green-500' : 'text-red-500'} mb-6`}>
                    {stock > 0 ? `In Stock: ${stock}` : 'Out of Stock'}
                </p>

                <Button userData={ userData } product={props}>
                    Add
                </Button>
            </div>
        </div>
    );
}

export default ProductDetail;
