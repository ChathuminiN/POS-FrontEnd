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

  // Function to load items from the backend
  async function loadItems() {
    try {
      const response = await axios.get("http://localhost:8082/item");
      setItems(response.data); // Updating state with the fetched items
    } catch (error) {
      console.error("Error loading items:", error);
      setErrorMessage("Failed to load items.");
    }
  }

  // Function to load categories from the backend
  async function loadCategories() {
    try {
      const response = await axios.get("http://localhost:8082/categories");
      setCategories(response.data); // Updating state with the fetched categories
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

  // Function to handle item submission
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
      catId: categoryId, //*********************/
    };

    try {
      const response = await axios.post("http://localhost:8082/item", data);
      console.log("Item created:", response.data);
      loadItems(); // Refresh the items list after creation
      // Clear input fields
      setItemName("");
      setStock(0);
      setDescription("");
      setPrice(0.0);
      setCategoryId(undefined); // Reset category
    } catch (error) {
      console.error("Error creating item:", error);
      setErrorMessage("Failed to create item.");
    }
  }

  return (
    <div className="container mx-auto pt-5 pb-5">
      <button
        onClick={loadItems}
        className="bg-cyan-950 mt-5 ms-2 p-2 text-sm text-cyan-300 font-bold border border-cyan-100 rounded hover:text-yellow-500"
      >
        Load Items
      </button>

      {errorMessage && (
        <p className="text-red-500 mt-5">{errorMessage}</p> // Error message display
      )}

      <table className="border-collapse border border-slate-500 mt-5">
        <thead>
          <tr>
            <th className="border border-cyan-500 w-[80px]">ID</th>
            <th className="border border-cyan-500 w-[200px]">Name</th>
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
              <td className="text-right border border-cyan-500 w-[150px]">
                {item.price}
              </td>
              <td className="text-center border border-cyan-500 w-[125px]">
                <button className="items-center bg-cyan-950 mt-5 ms-2 p-2 text-sm text-cyan-300 font-bold border border-cyan-100 rounded hover:text-yellow-500">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="place-items-end py-8">
        <h1 className="ms-2 text-lg font-bold text-cyan-400">Create Item</h1>

        <form onSubmit={handleSubmit}>
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
            className="bg-cyan-950 mt-5 ms-2 p-2 text-sm text-cyan-300 font-bold border border-cyan-100 rounded hover:text-yellow-500"
          >
            Create Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default Item;
