import { Button, TextField, Box, Typography, IconButton, InputAdornment, Divider } from '@mui/material';
import { Field, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { InvoiceCredentials } from '../../types';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const InvoiceSchema = Yup.object().shape({
    customerName: Yup.string().required('Customer name is required'),
    date: Yup.date().required('Date is required'),
    poNumber: Yup.string().required('PO Number is required'),
    items: Yup.array().of(
        Yup.object().shape({
            description: Yup.string().required('Description is required'),
            quantity: Yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
            unitPrice: Yup.number().min(0, 'Unit Price must be positive').required('Unit Price is required'),
            totalPrice: Yup.number().min(0, 'Total Price must be positive'),
        })
    ),
});

const InvoiceGenerator = () => {
    const initialValues = {
        customerName: '',
        date: '',
        poNumber: '',
        items: [
            { description: '', quantity: 0, unitPrice: 0, totalPrice: 0 },
        ] as InvoiceCredentials[],
    };

    const handleSubmit = async (values: typeof initialValues) => {
        const totalAmount = values.items.reduce((acc, item) => acc + item.totalPrice, 0);
        const invoiceData = { 
            customerName: values.customerName,
            date: values.date,
            poNumber: values.poNumber,
            items: values.items 
        };

        try {
            const response = await axios.post('/api/invoices/generate', invoiceData);
            console.log('Invoice generated:', response.data);
            // Add success message or redirection here
        } catch (error) {
            console.error('Error generating invoice:', error);
            // Add error handling here
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Formik
                initialValues={initialValues}
                validationSchema={InvoiceSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, setFieldValue }) => (
                    <Form>
                        <Box mb={3} gap={2} display="flex" justifyContent="space-between">
                            <Field
                                as={TextField}
                                label="Customer Name"
                                name="customerName"
                                sx={{width: "40%"}}
                                error={Boolean(touched.customerName && errors.customerName)}
                                helperText={touched.customerName && errors.customerName}
                                onChange={handleChange}
                            />
                            <Field
                                as={TextField}
                                label="Date"
                                name="date"
                                type="date"
                                sx={{width: "20%"}}
                                InputLabelProps={{ shrink: true }}
                                error={Boolean(touched.date && errors.date)}
                                helperText={touched.date && errors.date}
                                onChange={handleChange}
                            />
                            <Field
                                as={TextField}
                                label="PO Number"
                                name="poNumber"
                                sx={{width: "40%"}}
                                error={Boolean(touched.poNumber && errors.poNumber)}
                                helperText={touched.poNumber && errors.poNumber}
                                onChange={handleChange}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            style={{ marginTop: '10px'}}
                        >
                            Generate Invoice
                        </Button>
                        <Divider sx={{margin: "20px"}} />
                        <FieldArray name="items">
                            {({ push, remove }) => (
                                <div>
                                    {values.items.map((item, index) => (
                                        <Box key={index} display="flex" alignItems="center">
                                            <Field
                                                as={TextField}
                                                label="Description of item/service..."
                                                name={`items[${index}].description`}
                                                fullWidth
                                                error={Boolean(touched.items?.[index]?.description && errors.items && Array.isArray(errors.items))}
                                                helperText={touched.items?.[index]?.description}
                                                onChange={handleChange}
                                            />
                                            <Field
                                                as={TextField}
                                                label="Quantity"
                                                name={`items[${index}].quantity`}
                                                type="number"
                                                style={{ marginLeft: '10px' }}
                                                error={Boolean(touched.items?.[index]?.quantity && errors.items && Array.isArray(errors.items))}
                                                helperText={touched.items?.[index]?.quantity && errors.items && Array.isArray(errors.items)}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const value = Number(e.target.value);
                                                    setFieldValue(`items[${index}].quantity`, value);
                                                    setFieldValue(
                                                        `items[${index}].totalPrice`,
                                                        value * item.unitPrice
                                                    );
                                                }}
                                            />
                                            <Field
                                                as={TextField}
                                                label="Unit Price"
                                                name={`items[${index}].unitPrice`}
                                                type="number"
                                                style={{ marginLeft: '10px' }}
                                                error={Boolean(touched.items?.[index]?.unitPrice && errors.items && Array.isArray(errors.items))}
                                                helperText={touched.items?.[index]?.unitPrice && errors.items && Array.isArray(errors.items)}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const value = Number(e.target.value);
                                                    setFieldValue(`items[${index}].unitPrice`, value);
                                                    setFieldValue(
                                                        `items[${index}].totalPrice`,
                                                        value * item.quantity
                                                    );
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label="Total Price"
                                                value={item.totalPrice}
                                                sx={{ m: 1, width: '25ch' }}
                                                slotProps={{
                                                    input: {
                                                        startAdornment: <InputAdornment position="start">RON</InputAdornment>,
                                                    },
                                                }}
                                            />
                                            <IconButton
                                                onClick={() => remove(index)}
                                                color="error"
                                                style={{ marginLeft: '10px' }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    ))}
                                    <Box display="flex" alignItems="center" gap={10}>
                                        <Button 
                                            variant="contained" 
                                            onClick={() => push({ description: '', quantity: 0, unitPrice: 0, totalPrice: 0 })}
                                            style={{ display: 'flex', alignItems: 'center' }}
                                        >
                                            <AddIcon style={{ marginRight: '8px' }} />
                                            Add Item
                                        </Button>
                                        <Box >
                                            Total: RON {values.items.reduce((acc, item) => acc + item.totalPrice, 0)}
                                        </Box>
                                    </Box>
                                </div>
                            )}
                        </FieldArray>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default InvoiceGenerator;
