import React from "react";
import CartView from "@/views/CartView/CartView" 
import { cookies } from "next/headers";
import { IUserSession } from "@/types";

const Cart = () => {
    
    const cookieStore = cookies()
    const userData: IUserSession = JSON.parse(cookieStore.get('userData')?.value ?? "{}") 
    
    return(
        <CartView userData={userData}  />    
    )
}

export default Cart;