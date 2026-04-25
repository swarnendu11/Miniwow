import express from 'express';
import multer from 'multer';
import { mergePdfs } from '../controllers/pdfController';

const router = express.Router();

// Setup Multer for temporary file storage
const upload = multer({ dest: 'temp/' });

// Define routes
router.post('/merge', upload.array('files'), mergePdfs);

export default router;
