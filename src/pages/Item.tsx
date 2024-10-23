import { useEffect, useState } from "react";
import ItemType from "../types/ItemType";
import axios from "axios";
import CategoryType from "../types/CategoryType";

function Item() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [itemName, setItemName] = useState<string>("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [price, setPrice] = useState<number>(0.0);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [itemEditing, setItemEditing] = useState<ItemType | null>(null);

  // Function to load items from the backend
  async function loadItems() {
    try {
      const response = await axios.get("http://localhost:8082/item");
      setItems(response.data);
    } catch (error) {
      console.error("Error loading items:", error);
      setErrorMessage("Failed to load items.");
    }
  }

  // Function to load categories from the backend
  async function loadCategories() {
    try {
      const response = await axios.get("http://localhost:8082/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error loading categories:", error);
      setErrorMessage("Failed to load categories.");
    }
  }

  useEffect(() => {
    loadItems();
    loadCategories();
  }, []);

  function handleItemName(event: React.ChangeEvent<HTMLInputElement>) {
    setItemName(event.target.value);
  }

  function handleDescription(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function handleStock(event: React.ChangeEvent<HTMLInputElement>) {
    setStock(Number(event.target.value));
  }

  function handlePrice(event: React.ChangeEvent<HTMLInputElement>) {
    setPrice(Number(event.target.value));
  }

  function handleCategoryId(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategoryId(Number(event.target.value));
  }

  // Function to handle item submission (Create or Update)
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!categoryId) {
      alert("Please select a category.");
      return;
    }

    const data = {
      name: itemName,
      stock: stock,
      description: description,
      price: price,
      catId: categoryId,
    };

    try {
      if (itemEditing) {
        // Update the existing item (PUT request)
        const response = await axios.put(
          `http://localhost:8082/item/${itemEditing.id}`,
          data
        );
        console.log("Item updated:", response.data);
      } else {
        // Create a new item (POST request)
        const response = await axios.post("http://localhost:8082/item", data);
        console.log("Item created:", response.data);
      }

      // Refresh the items list after creation or update
      loadItems();
      // Clear input fields
      setItemName("");
      setStock(0);
      setDescription("");
      setPrice(0.0);
      setCategoryId(undefined);
      setItemEditing(null); // Reset the editing state
    } catch (error) {
      console.error("Error saving item:", error);
      setErrorMessage("Failed to save item.");
    }
  }

  // Function to handle item editing
  function editItem(item: ItemType) {
    setItemEditing(item);
    setItemName(item.name);
    setStock(item.stock);
    setDescription(item.description);
    setPrice(item.price);
    setCategoryId(item.category?.id);
  }

  // Function to handle item deletion
  async function deleteItem(itemId: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8082/item/${itemId}`);
        console.log("Item deleted");
        // Refresh the items list after deletion
        loadItems();
      } catch (error) {
        console.error("Error deleting item:", error);
        setErrorMessage("Failed to delete item.");
      }
    }
  }

  return (
    <div className="container mx-auto pt-5 pb-5">
      <h1 className="text-xl text-amber-300">ITEM DETAILS </h1>

      {errorMessage && <p className="text-red-500 mt-5">{errorMessage}</p>}

      <table className="border-collapse border border-slate-500 mt-5">
        <thead>
          <tr>
            <th className="border border-cyan-500 w-[80px]">Item ID</th>
            <th className="border border-cyan-500 w-[200px]">Item Name</th>
            <th className="border border-cyan-500 w-[150px]">Description</th>
            <th className="border border-cyan-500 w-[150px]">Price</th>
            <th className="border border-cyan-500 w-[125px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="text-center border border-cyan-500 w-[80px]">
                {item.id}
              </td>
              <td className="border border-cyan-500 w-[200px]">
                {item.name}
              </td>
              <td className="border border-cyan-500 w-[200px]">
                {item.description}
              </td>
              <td className="border border-cyan-500 w-[100px] text-right">
                {item.price.toFixed(2)}
              </td>

              <td className="border border-cyan-500 w-[125px]">
                <div className="flex justify-center items-center">
                  <button
                    className="bg-cyan-950 p-0.3 m-1 text-sm text-cyan-300 font-bold border border-cyan-100 rounded hover:text-emerald-400 mx-4"
                    onClick={() => editItem(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-cyan-950 p-0.3 m-1 text-sm text-cyan-300 font-bold border border-cyan-100 rounded hover:text-rose-500 mx-4"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-8">
        <h1 className="text-left ms-2 font-bold text-cyan-400">
          {itemEditing ? "Update Item" : "Create Item"}
        </h1>

        <form onSubmit={handleSubmit} className="flex items-stretch ...">
          <label className="text-sm p-2 text-base mt-5">
            Item Name
            <input
              className="text-sm border border-cyan-100 rounded p-2 mt-5"
              type="text"
              value={itemName}
              name="itemName"
              onChange={handleItemName}
              required
            />
          </label>

          <label className="text-sm p-2 text-base mt-5">
            Description
            <input
              className="text-sm border border-cyan-100 rounded p-2 mt-5"
              type="text"
              value={description}
              name="description"
              onChange={handleDescription}
            />
          </label>

          <label className="text-sm p-2 text-base mt-5">
            Stock
            <input
              className="text-sm border border-cyan-100 rounded p-2 mt-5"
              type="number"
              value={stock}
              name="stock"
              onChange={handleStock}
            />
          </label>

          <label className="text-sm p-2 text-base mt-5">
            Price
            <input
              className="text-sm border border-cyan-100 rounded p-2 mt-5"
              type="number"
              value={price}
              name="price"
              onChange={handlePrice}
            />
          </label>

          <label className="text-sm p-2 text-base mt-5">
            Category
            <select
              className="text-sm border border-cyan-100 rounded p-2 mt-5"
              onChange={handleCategoryId}
              value={categoryId || ""}
              name="categoryId"
              required
            >
              <option value="">Please select a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className={`bg-cyan-950 p-1.5 m-5 text-sm text-cyan-300 font-bold border border-cyan-100 rounded 
            ${itemEditing ? "hover:text-emerald-400" : "hover:text-yellow-500"}`}
          >
            {itemEditing ? "Update Item" : "Create Item"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Item;
