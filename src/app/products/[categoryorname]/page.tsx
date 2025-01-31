import Card from "@/components/Card/Card"
import { getProductsByCategoryOrName } from "@/helpers/products.helper"
import { IProduct } from "@/types"
import Link from "next/link"
import React from "react"

const Products: React.FC<{ params: { categoryorname: string }} > = async ({ params }) => {
    const products = await getProductsByCategoryOrName(params.categoryorname)

    return(
        <div className="flex flex-wrap items-center gap-4 p-4 justify-center">
            {products.length ?
                (products?.map((product: IProduct) => {
                    return (
                        <Link key={product.id} href={`/product/${product.id}`}>
                            <Card {...product} />
                        </Link>
                    )
                })) : (<div>Products not found.</div>)
            }
        </div>
    )
}

export default Products