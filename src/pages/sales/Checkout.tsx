
import axios from 'axios';
import { useState } from 'react';

// Define the Sales type
interface Sales {
    id: number; // Adjust based on your actual response
    quantity: number;
    date: string; // Adjust as per your actual date format
}

const Checkout = () => {
    const [sales, setSales] = useState<Sales[]>([]); // Specify the type of sales

    const handleCheckout = async () => {
        try {
            const response = await axios.post<Sales[]>('http://localhost:8080/sales/checkout'); // Specify the response type
            setSales(response.data);
        } catch (error) {
            console.error(error);
            alert('Error during checkout');
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <button onClick={handleCheckout}>Checkout</button>
            {sales.length > 0 && (
                <ul>
                    {sales.map((sale) => (
                        <li key={sale.id}>Sale ID: {sale.id}, Quantity: {sale.quantity}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Checkout;
