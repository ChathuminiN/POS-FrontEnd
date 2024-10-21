import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from './pages/Category';
import Item from './pages/Item';
import Sales from './pages/Sales';
import Stock from './pages/Stock';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect to /category */}
        
        <Route path="/category" element={<Category />} />
        <Route path="/item" element={<Item/>} />
        <Route path="/sales" element={<Sales/>} />
        <Route path="/stock" element={<Stock/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
