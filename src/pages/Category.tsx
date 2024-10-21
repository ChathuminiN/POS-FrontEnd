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
    <div>
      <button onClick={loadCategories}>Load Categories</button>
      {/* Conditional rendering */}
      {categories && categories.length > 0 ? (
        categories.map((category: CategoryType) => {
          return (
            <div key={category.id}> {/* Add key to ensure efficient rendering */}
              <p>ID: {category.id}</p>
              <p>Name: {category.name}</p>
              <p>Description: {category.description}</p>
            </div>
          );
        })
      ) : (
        <p>No categories found.</p> // fallback message if no categories exist
      )}
      
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <label>Category Name</label>
        <input
          type="text"
          value={categoryName} // Bind input field to state
          onChange={handleCategoryName}
          required
        />
        <label>Description</label>
        <input
          type="text"
          value={description} // Bind input field to state
          onChange={handleDescription}
        />
        <button type="submit">Create Category</button>
      </form>
    </div>
  );
}

export default Category;
