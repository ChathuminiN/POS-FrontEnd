import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from './pages/Category';
import Item from './pages/Item';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect to /category */}
        
        <Route path="/category" element={<Category />} />
        <Route path="/item" element={<Item/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
