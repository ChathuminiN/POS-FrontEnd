import axios from "axios";
import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";

function Category() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryName, setCategoryName] = useState<string>(""); // Use lowercase 'string' for TypeScript primitive type
  const [description, setDescription] = useState<string>("");

  // Function to load categories from the backend
  async function loadCategories() {
    try {
      const response = await axios.get("http://localhost:8082/categories");
      setCategories(response.data); // updating state with the fetched categories
    } catch (error) {
      console.error("Error loading categories:", error); // error handling
    }
  }

  function handleCategoryName(event: React.ChangeEvent<HTMLInputElement>) {
    setCategoryName(event.target.value);
  }

  function handleDescription(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }
  useEffect(
    function(){
        loadCategories();//function that is triggered at the side effect
    },categories//dependency array,if it is empty,then it will be triggered once
  )

  // Function to handle category submission
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); // Prevents the form from refreshing the page
    const data = {
      name: categoryName,
      description: description,
    };

    try {
      const response = await axios.post("http://localhost:8082/categories", data);
      console.log("Category created:", response.data);
      loadCategories(); // Refresh the categories list
      setCategoryName(""); // Clear input fields
      setDescription(""); // Clear input fields
    } catch (error) {
      console.error("Error creating category:", error); // error handling
    }
  }

  return (
    <div className="container mx-auto">
      <button onClick={loadCategories} className="bg-cyan-950 mt-5 ms-2 p-2 text-0.5x text-cyan-300 bold border border-cyan-100 rounded hover:text-yellow-500   " >Load Categories</button>
      
      {/* Conditional rendering */}
      {categories && categories.length > 0 ? (
        categories.map((category: CategoryType) => {
          return (
            <div className="text-cyan-500 px-1 text-0.5x border border-cyan-100 rounded p-2 mt-5 ">
            <div className="flex flex-row " key={category.id}> {/* Add key to ensure efficient rendering */}
              <p className="text-cyan-600 me-6">ID: {category.id}</p>
              <p className="text-cyan-400 me-6">Name: {category.name}</p>
              <p className="text-cyan-300 me-6">Description: {category.description}</p>
            </div>
            </div>
          );
        })
      ) : (
        <p className="text-rose-400">No categories found.</p> // fallback message if no categories exist
      )}
      <div className="place-items-end py-8 ">
      <h1 className="ms-2 text-lg font-bold text-cyan-400 ">Create Category</h1>
      <form onSubmit={handleSubmit}>
        <label className="text-0.5x p-2 text-base mt-5">Category Name</label>
        <input className="text-0.5x border border-cyan-100 rounded p-2 mt-5"
          type="text"
          value={categoryName} // Bind input field to state
          onChange={handleCategoryName}
          required
        />
        <label className="text-0.5x p-2 text-base mt-5">Description</label>
        <input className="text-0.5x border border-cyan-100 rounded p-2 mt-5"
          type="text"
          value={description} // Bind input field to state
          onChange={handleDescription}
        />
        
        <button type="submit" className="bg-cyan-950 mt-5 ms-2 p-2 text-0.5x text-cyan-300 bold border border-cyan-100 rounded hover:text-yellow-500   ">Create Category</button>
        
      </form>

      </div>
      
    </div>
  );
}

export default Category;
