import express from 'express';
import fs from 'fs';
import multer from 'multer';
import os from 'os';
import path from 'path';
import { handleGenericTool } from '../controllers/toolController';

const router = express.Router();
const tempDir = path.join(os.tmpdir(), 'miniwow-temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const upload = multer({ dest: tempDir });

// Catch-all route for tools
router.post('/:slug', upload.array('files'), handleGenericTool);

export default router;
