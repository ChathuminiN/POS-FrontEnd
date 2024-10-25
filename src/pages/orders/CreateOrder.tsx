import axios from "axios";
import ItemType from "../../types/ItemType";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateOrder() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [orderedItem, setOrderedItem] = useState<ItemType[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [total, setTotal] = useState<number>(0); // Track total price
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

  function handleQuantity(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(Number(event.target.value));
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (!quantity) {
      alert("Please Insert Quantity");
      return;
    }

  // Add an item to the order list
  function addItemToOrder(item: ItemType) {
    const updatedOrder = [...orderedItem, item];
    setOrderedItem(updatedOrder);
  }

  // Calculate total price whenever orderedItem changes
  useEffect(() => {
    let newTotal = 0;
    orderedItem.forEach((item) => {
      newTotal += item.price*quantity;
    });
    setTotal(newTotal); // Update total price
  }, [orderedItem]);

  // Save the order and handle checkout
  async function saveOrder() {
    const itemIds = orderedItem.map((item) => item.id); // Collect item IDs from the order
    if (itemIds.length === 0) {
      alert("Your cart is empty. Please add items to place an order.");
      return;
    }

    try {
      // Send the order details to the backend (SalesController checkout endpoint)
      await axios.post("http://localhost:8082/sales/checkout", {
        itemIds: itemIds, // Send item IDs in the request body
      });
      alert("Order placed successfully!");
      navigate("/order"); // Navigate to the order page after successful checkout
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Error saving the order, please try again.");
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
          <div>
          <form onSubmit={handleSubmit} className="flex items-stretch ...">
          <label className="text-sm p-2 text-base mt-5">
            Quantity
            <input
              className="text-sm border border-cyan-100 rounded p-2 mt-5"
              type="text"
              value={quantity}
              name="quantity"
              onChange={handleQuantity}
              required
            />
          </label>
          <button type="submit" className="bg-cyan-950 mt-5 ms-2 p-2 text-0.5x text-cyan-300 bold border border-cyan-100 rounded hover:text-yellow-500   ">Add Quantity</button>
          </form>
          </div>
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
            {orderedItem.map((item) => (
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
}

export default CreateOrder;