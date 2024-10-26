import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from './pages/Category';
import Item from './pages/Item';
import Stock from './pages/Stock';
import Order from './pages/orders/Order';
import CreateOrder from './pages/orders/CreateOrder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect to /category */}
        
        <Route path="/category" element={<Category />} />
        <Route path="/item" element={<Item/>} />        
        <Route path="/stock" element={<Stock/>} />
        <Route path="/orders" element={<Order/>} />
        <Route path="/orders/create" element={<CreateOrder/>} />
      
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
