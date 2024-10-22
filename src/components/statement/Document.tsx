import React, { useState } from 'react';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BaseModal from '../BaseModal';
import * as Yup from 'yup';

interface Document {
    id: number;
    name: string;
    uploadDate: string;
}

const initialDocuments: Document[] = [
    { id: 1, name: 'Document1.pdf', uploadDate: '2024-01-01' },
    { id: 2, name: 'Document2.docx', uploadDate: '2024-02-15' },
    { id: 3, name: 'Document3.txt', uploadDate: '2024-01-10' },
    { id: 4, name: 'Document4.pdf', uploadDate: '2024-03-01' },
];

const DocumentManager: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>(initialDocuments);
    const [docs, setDocs] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Document>('name');

    const validationSchema = Yup.object().shape({
        documentName: Yup.string().required('Document name is required'),
        file: Yup.mixed().required('File is required'),
    });

    const filteredDocs = docs.filter((doc) =>
        doc.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleAddDocument = (values: { documentName: string; file: File | null }) => {
        const newDocument: Document = {
            id: documents.length + 1,
            name: values.documentName,
            uploadDate: new Date().toISOString().split('T')[0]
        };

        setDocuments([...documents, newDocument]);
        handleModalClose();
    };

    const handleSort = (property: keyof Document) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);

        const sortedDocuments = [...documents].sort((a, b) => {
            if (property === 'uploadDate') {
                return isAsc
                    ? new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
                    : new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
            } else {
                return isAsc
                    ? b.name.localeCompare(a.name)
                    : a.name.localeCompare(b.name);
            }
        });
        setDocuments(sortedDocuments);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display='flex' gap={3} sx={{ mb: 2 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    sx={{ width: '80%' }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    sx={{ width: '20%' }}
                    onClick={() => setModalOpen(true)}
                >
                    Add Document
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'name'}
                                    direction={orderBy === 'name' ? order : 'asc'}
                                    onClick={() => handleSort('name')}
                                >
                                    Document Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'uploadDate'}
                                    direction={orderBy === 'uploadDate' ? order : 'asc'}
                                    onClick={() => handleSort('uploadDate')}
                                >
                                    Upload Date
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documents.map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell>{doc.name}</TableCell>
                                <TableCell>{doc.uploadDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <BaseModal
                open={modalOpen}
                onClose={handleModalClose}
                onSubmit={handleAddDocument}
                validationSchema={validationSchema}
            />
        </Box>
    );
};

export default DocumentManager;
