import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from './pages/Category';
import Item from './pages/Item';
import Stock from './pages/Stock';
import AddToCart from './pages/sales/AddToCart';
import Checkout from './pages/sales/Checkout';
import SalesByDate from './pages/sales/SalesByDate';
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
        <Route path="/order" element={<Order/>} />
        <Route path="/order/create" element={<CreateOrder/>} />
        <Route path="/addtocart" element={<AddToCart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/salesbydate" element={<SalesByDate/>} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
