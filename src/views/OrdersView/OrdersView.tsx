import { getOrders } from "@/helpers/order.helper";
import { IOrder, IUserSession } from "@/types";
import { cookies } from "next/headers";
import React from "react";

const OrdersView = async () => {
    
    const cookieStore = cookies();
    const userData: IUserSession = JSON.parse(cookieStore.get('userData')?.value ?? "{}");
    const orders: IOrder[] = await getOrders(userData.token);
    
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-start mx-auto p-0">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mt-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your Orders</h1>
                <hr className="my-6 border-gray-400" />
                {orders && orders.length > 0 ? (
                    <>
                        <div className="grid grid-cols-3 gap-4 text-xl text-gray-800 font-semibold mb-4 justify-items-center">
                            <div>Order ID</div>
                            <div>Date</div>
                            <div>Status</div>
                        </div>

                        {orders.map((order) => (
                            <div 
                                key={order.id} 
                                className="grid grid-cols-3 gap-4 border-b border-gray-200 py-4 justify-items-center"
                            >
                                <div className="text-gray-900">
                                    <p className="text-lg font-medium">{order.id}</p>
                                </div>
                                <div className="text-gray-900">
                                    <p className="text-lg font-medium">{new Date(order.date).toLocaleString()}</p>
                                </div>
                                <div>
                                    <span 
                                        className={`px-4 py-2 rounded-full text-white text-lg font-medium
                                        ${order.status === 'approved' ? 'bg-green-600' : 'bg-yellow-600'}`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <p className="text-center text-lg font-medium text-gray-900">You have no orders.</p>
                )}
            </div>
        </div>
    );
}

export default OrdersView;
