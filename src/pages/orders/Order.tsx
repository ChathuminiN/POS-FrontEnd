import axios from "axios";
import { useEffect, useState } from "react";
import OrderType from "../../types/OrderType";
import { Link } from "react-router-dom";

function Order() {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadOrders() {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:8082/orders");
            console.log("Orders loaded:", response.data); // Debugging line
            setOrders(response.data);
        } catch (error) {
            console.error("Error loading orders:", error);
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadOrders(); // Only run on component mount
    }, []);

    return (
        <div className="container mx-auto pt-5 pb-5">
            {loading && <p>Loading orders...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <>
                    <h1 className="text-xl text-amber-300">ORDERS</h1>
                    <Link to="/order/create" className="bg-cyan-950 p-0.3 m-1 text-sm text-cyan-300 font-bold border border-cyan-100 rounded hover:text-rose-500 mx-4">
                        Add Order
                    </Link>
                    <table className="border-collapse border border-slate-500 mt-5">
                        <thead>
                            <tr>
                                <th className="border border-cyan-500 w-[80px]">Order ID</th>
                                <th className="border border-cyan-500 w-[200px]">Order Date & Time</th>
                                
                                <th className="border border-cyan-500 w-[150px]">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{new Date(order.orderDateAndTime).toLocaleString()}</td>
                                    
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default Order;
