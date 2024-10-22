import { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import axios from 'axios';
import { InvoiceCredentials } from '../../types';

const InvoiceGenerator = () => {
    const [customerName, setCustomerName] = useState('');
    const [items, setItems] = useState<InvoiceCredentials[]>([
        { description: '', quantity: 0, unitPrice: 0, totalPrice: 0 },
    ]);

    const handleItemChange = (index: number, field: keyof InvoiceCredentials, value: any) => {
        const newItems = [...items];
        newItems[index][field] = value;
        if (field === 'quantity' || field === 'unitPrice') {
            newItems[index].totalPrice = newItems[index].quantity * newItems[index].unitPrice;
        }
        setItems(newItems);
    };

    const handleAddItem = () => {
        setItems([...items, { description: '', quantity: 0, unitPrice: 0, totalPrice: 0 }]);
    };

    const handleSubmit = async () => {
        const totalAmount = items.reduce((acc, item) => acc + item.totalPrice, 0);
        const invoiceData = { customerName, items };

        try {
            const response = await axios.post('/api/invoices/generate', invoiceData);
            console.log('Invoice generated:', response.data);
            // Poți adăuga un mesaj de succes sau redirecționare
        } catch (error) {
            console.error('Error generating invoice:', error);
            // Poți adăuga un mesaj de eroare
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4">Generate Invoice</Typography>
            <TextField
                label="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                fullWidth
            />
            {items.map((item, index) => (
                <Box key={index} display="flex" alignItems="center" marginTop={2}>
                    <TextField
                        label="Description"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Quantity"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                        fullWidth
                        style={{ marginLeft: '10px' }}
                    />
                    <TextField
                        label="Unit Price"
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, 'unitPrice', Number(e.target.value))}
                        fullWidth
                        style={{ marginLeft: '10px' }}
                    />
                    <TextField
                        label="Total Price"
                        value={item.totalPrice}
                        InputProps={{ readOnly: true }}
                        fullWidth
                        style={{ marginLeft: '10px' }}
                    />
                </Box>
            ))}
            <Button variant="contained" onClick={handleAddItem} style={{ marginTop: '10px' }}>
                Add Item
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '10px', marginLeft: '10px' }}>
                Generate Invoice
            </Button>
        </Box>
    );
};

export default InvoiceGenerator;
