import axios from "axios";
import { useEffect, useState } from "react";
import OrderType from "../../types/OrderType";
import { Link } from "react-router-dom";

function Order(){

    const[orders,setorders]=useState<OrderType[]>([]);

    async function loadOrders(){
        try {
            const response=await axios.get("http://localhost:8082/sales");
            setorders(response.data)
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function(){
        loadOrders();
    })

    return(
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-xl text-amber-300">ORDERS </h1>
            <Link to="/order/create" className= "text-amber-300">Add Order</Link>
            <table className="border-collapse border border-slate-500 mt-5">
                <thead>
                    <tr>
                        <th className="border border-cyan-500 w-[80px]">Order ID</th>
                        <th className="border border-cyan-500 w-[200px]">Order Date & Time</th>
                        <th className="border border-cyan-500 w-[150px]">Description</th>
                        <th className="border border-cyan-500 w-[150px]">Total Amount</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {orders.map(function(order) {
                        return (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.orderDateAndTime.toLocaleString()}</td> {/* Convert Date to string */}
                            <td>{order.totalPrice}</td>
                        </tr>
                        );
                    })}
                </tbody>

            </table>
            


        </div>
    )
}

export default Order;