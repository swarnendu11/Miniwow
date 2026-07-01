import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import os from 'os';
import path from 'path';

import pdfRoutes from './routes/pdfRoutes';
import toolRoutes from './routes/toolRoutes';

dotenv.config();

const app = express();

// Setup temporary folder for multer uploads in a writable OS temp directory.
const tempDir = path.join(os.tmpdir(), 'miniwow-temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Security & Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(limiter);

// Routes
app.get('/', (req, res) => {
  res.send('MiniWow Backend API is running');
});

app.use('/api/pdf', pdfRoutes);
app.use('/api/tools', toolRoutes);

export default app;
export const config = {
  runtime: 'nodejs18.x',
  regions: ['iad', 'cdg', 'sfo1'],
};
