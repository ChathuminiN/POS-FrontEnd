import axios from "axios";
import ItemType from "../../types/ItemType";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateOrder() {
    const [items, setItems] = useState<ItemType[]>([]);
    const [orderedItems, setOrderedItems] = useState<ItemType[]>([]);
    const [total, setTotal] = useState<number>(0);
    const navigate = useNavigate();

    // Load items from the backend
    async function loadItems() {
        try {
            const response = await axios.get("http://localhost:8082/item");
            setItems(response.data);
        } catch (error) {
            console.error("Error loading items:", error);
        }
    }

    useEffect(() => {
        loadItems();
    }, []);

    // Add an item to the order list
    function addItemToOrder(item: ItemType) {
        const updatedOrder = [...orderedItems, item];
        setOrderedItems(updatedOrder);
    }

    // Calculate total price whenever orderedItems changes
    useEffect(() => {
        const totalPrice = orderedItems.reduce((sum, item) => sum + item.price, 0);
        setTotal(totalPrice);
    }, [orderedItems]);

    // Save the order and handle checkout
    async function saveOrder() {
        const itemIds = orderedItems.map(item => item.id);

        if (orderedItems.length === 0) {
            alert("Your cart is empty. Please add items to place an order.");
            return;
        }

        try {
            await axios.post("http://localhost:8082/orders", { itemIds });
            alert("Order placed successfully!");
            navigate("/order");
        } catch (error) {
            console.error("Error during checkout:", error);

            
        }
    }

    return (
        <div className="flex">
            {/* Item list section */}
            <div className="w-[400px] border-r border-slate-500 p-2">
                <span className="text-xl font-semibold text-cyan-300">Items</span>
                <div className="mt-5">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => addItemToOrder(item)}
                            className="border border-slate-500 rounded-lg p-2 mb-2 cursor-pointer hover:bg-slate-600"
                        >
                            <div className="text-lg font-semibold text-cyan-100">{item.name}</div>
                            <div className="text-sm font-semibold">{item.category?.name}</div>
                            <div className="text-sm font-semibold text-right">Rs. {item.price}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order summary and checkout section */}
            <div className="p-2">
                <span className="text-xl font-semibold text-yellow-300">New Order</span>
                <table className="border-collapse border border-slate-500 mt-5">
                    <thead>
                        <tr>
                            <th className="w-[80px] text-center text-cyan-200">Item ID</th>
                            <th className="w-[200px] text-left text-cyan-200">Description</th>
                            <th className="w-[125px] text-right text-cyan-200">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderedItems.map((item) => (
                            <tr key={item.id}>
                                <td className="w-[80px] text-center font-xs">{item.id}</td>
                                <td className="w-[200px] text-left font-xs">{item.name}</td>
                                <td className="w-[125px] text-right font-xs">{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Total price display */}
                <div className="text-right font-semibold mt-5 text-yellow-200">
                    Total Price: Rs. {total}
                </div>

                {/* Save order button */}
                <div>
                    <button
                        onClick={saveOrder}
                        className="bg-cyan-950 mt-5 ms-2 p-2 text-0.5x text-cyan-300 bold border border-cyan-100 rounded hover:text-yellow-500"
                    >
                        Save Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateOrder;
