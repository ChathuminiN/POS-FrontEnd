import axios from 'axios';
import { useEffect, useState } from 'react';
import ItemType from '../../types/ItemType';

const AddToCart = () => {
    const [quantity, setQuantity] = useState(1); // Start with quantity 1
    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null); // Store selected item
    const [items, setItems] = useState<ItemType[]>([]);

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

    const handleAddToCart = async () => {
        if (!selectedItem) {
            alert('Please select an item to add to the cart.');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8082/sales/add-to-cart/${selectedItem.id}/${quantity}`);
            alert(response.data);
            // Reset selection after adding to cart
            setSelectedItem(null);
            setQuantity(1);
        } catch (error) {
            console.error(error);
            alert('Error adding to cart');
        }
    };

    return (
        <div className="w-[400px] border-r border-slate-500 p-2">
            <span className="text-xl font-semibold text-cyan-300">Items</span>
            <div className="mt-5">
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)} // Set selected item
                        className={`border border-slate-500 rounded-lg p-2 mb-2 cursor-pointer hover:bg-slate-600 ${
                            selectedItem?.id === item.id ? 'bg-slate-500' : '' // Highlight selected item
                        }`}
                    >
                        <div className="text-lg font-semibold text-cyan-100">{item.name}</div>
                        <div className="text-sm font-semibold">{item.category?.name}</div>
                        <div className="text-sm font-semibold text-right">Rs. {item.price}</div>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="mt-5">Add to Cart</h2>
                {selectedItem ? ( // Show selected item info
                    <div>
                        <div className="font-semibold">Selected Item: {selectedItem.name}</div>
                        <div className="font-semibold">Price: Rs. {selectedItem.price}</div>
                    </div>
                ) : (
                    <div className="text-red-500">Please select an item.</div>
                )}
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    min={1}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="mt-2 border border-slate-500 rounded p-1"
                />
                <button onClick={handleAddToCart} className="mt-2 bg-cyan-500 text-white rounded px-3 py-1">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default AddToCart;
