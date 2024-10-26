import { useEffect, useState } from "react";
import OrderType from "../../types/OrderType";
import axios from "axios";
import { Link } from "react-router-dom";

function Order(){
const[orders,setOrders]=useState<OrderType[]>([]);

async function loadOrders() {
    try {
        const response=await axios.get("http://localhost:8082/orders");
        setOrders(response.data)
        
    }catch(error){
        console.log(error);
    }
}
useEffect(() => {
    loadOrders();
}, []);

return(
    <div className="container mx-auto pt-5 pb-5">
      <h1 className="text-xl text-amber-300">ORDERS </h1>
      <Link to="/orders/create" className= "bg-cyan-950 p-1  text-sm text-amber-100 font-bold border border-cyan-100 rounded hover:text-emerald-400 ">Add Order</Link>
            <table className="border-collapse border border-slate-500 mt-5">
                <thead>
                    <tr>
                        <th className="border border-cyan-500 w-[80px] text-center">Order ID</th>
                        <th className="border border-cyan-500 w-[200px]">Order Date & Time</th>
                        <th className="border border-cyan-500 w-[150px] ">Total Amount</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {orders.map(function(order) {
                        return (
                        <tr key={order.id}>
                            <td className="text-center border border-cyan-500 w-[80px] text-center">{order.id}</td>
                            <td className="border border-cyan-500 w-[200px]">{new Date(order.orderDateTime).toLocaleString()}</td>
                            <td className="border border-cyan-500 w-[150px] text-right">{order.total_price.toFixed(2)}</td>
                        </tr>
                        );
                    })}
                </tbody>

            </table>

    </div>
)

}
export default Order;