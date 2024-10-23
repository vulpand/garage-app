import { useState } from 'react';
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
    TextField,
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddDocumentModal, DeleteModal } from '../Modal';
import * as Yup from 'yup';
import { DocumentCredentioals } from '../../types';

const initialDocuments: DocumentCredentioals[] = [
    { id: 1, name: 'Document1.pdf', uploadDate: '2024-01-01' },
    { id: 2, name: 'Document2.docx', uploadDate: '2024-02-15' },
    { id: 3, name: 'Document3.txt', uploadDate: '2024-01-10' },
    { id: 4, name: 'Document4.pdf', uploadDate: '2024-03-01' },
];

const DocumentTable = () => {
    const [documents, setDocuments] = useState<DocumentCredentioals[]>(initialDocuments);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [docToDelete, setDocToDelete] = useState<DocumentCredentioals | null>(null);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof DocumentCredentioals>('name');

    // Validation schema for adding a document
    const validationSchema = Yup.object().shape({
        documentName: Yup.string().required('Document name is required'),
        file: Yup.mixed().required('File is required'),
    });

    // Filtered documents based on search term
    const filteredDocs = documents.filter((doc) =>
        doc.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle modal close for adding and deleting
    const handleModalClose = () => setModalOpen(false);
    const handleDeleteModalClose = () => setDeleteModalOpen(false);

    // Add a new document
    const handleAddDocument = (values: { documentName: string; file: File | null }) => {
        const newDocument: DocumentCredentioals = {
            id: documents.length + 1,
            name: values.documentName,
            uploadDate: new Date().toISOString().split('T')[0],
        };
        setDocuments([...documents, newDocument]);
        handleModalClose();
    };

    // Sort documents by column
    const handleSort = (property: keyof DocumentCredentioals) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);

        const sortedDocuments = [...documents].sort((a, b) => {
            if (property === 'uploadDate') {
                return isAsc
                    ? new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
                    : new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
            } else {
                return isAsc ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
            }
        });
        setDocuments(sortedDocuments);
    };

    // Handle delete confirmation modal open
    const handleDeleteClick = (doc: DocumentCredentioals) => {
        setDocToDelete(doc);
        setDeleteModalOpen(true);
    };

    // Handle actual document deletion
    const handleDeleteConfirm = () => {
        if (docToDelete) {
            setDocuments(documents.filter((doc) => doc.id !== docToDelete.id));
            handleDeleteModalClose(); // Close modal after deletion
        }
    };

    // Function to handle view action (placeholder)
    const handleViewDocument = (doc: DocumentCredentioals) => {
        alert(`Viewing ${doc.name}`); // Replace with actual logic
    };

    // Function to handle download action (placeholder)
    const handleDownloadDocument = (doc: DocumentCredentioals) => {
        alert(`Downloading ${doc.name}`); // Replace with actual logic
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" gap={3} sx={{ mb: 2 }}>
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
                            <TableCell>Actions</TableCell> {/* New column for actions */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDocs.map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell>{doc.name}</TableCell>
                                <TableCell>{doc.uploadDate}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleViewDocument(doc)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDownloadDocument(doc)}>
                                        <DownloadIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(doc)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <AddDocumentModal
                open={modalOpen}
                onClose={handleModalClose}
                onSubmit={handleAddDocument}
            />

            <DeleteModal
                open={deleteModalOpen}
                onClose={handleDeleteModalClose}
                onConfirm={handleDeleteConfirm}
                itemName={docToDelete?.name}
                confirmButtonText="Delete"
                cancelButtonText="Cancel"
             />
        </Box>
    );
};

export default DocumentTable;
