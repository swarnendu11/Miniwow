import express from 'express';
import multer from 'multer';
import { handleGenericTool } from '../controllers/toolController';

const router = express.Router();
const upload = multer({ dest: 'temp/' });

// Catch-all route for tools
router.post('/:slug', upload.array('files'), handleGenericTool);

export default router;
