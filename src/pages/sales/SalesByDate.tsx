
import axios from 'axios';
import { useState } from 'react';

// Define the Sales type
interface Sales {
    id: number;        // Adjust based on your actual backend response
    quantity: number;  // Add other relevant fields as needed
    date: string;      // Adjust as per your actual date format
}

const SalesByDate = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [salesList, setSalesList] = useState<Sales[]>([]); // Specify the type of salesList

    const handleGetSalesByDate = async () => {
        try {
            const response = await axios.get<Sales[]>('http://localhost:8080/sales/by-date', {
                params: {
                    startDate: startDate,
                    endDate: endDate,
                },
            });
            setSalesList(response.data);
        } catch (error) {
            console.error(error);
            alert('Error fetching sales by date');
        }
    };

    return (
        <div>
            <h2>Get Sales by Date</h2>
            <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button onClick={handleGetSalesByDate}>Get Sales</button>
            {salesList.length > 0 && (
                <ul>
                    {salesList.map((sale) => (
                        <li key={sale.id}>Sale ID: {sale.id}, Date: {new Date(sale.date).toLocaleString()}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SalesByDate;
