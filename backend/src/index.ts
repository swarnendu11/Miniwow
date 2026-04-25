import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import path from 'path';

import pdfRoutes from './routes/pdfRoutes';
import toolRoutes from './routes/toolRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Setup temporary folder for multer uploads
const tempDir = path.join(__dirname, '../temp');
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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
