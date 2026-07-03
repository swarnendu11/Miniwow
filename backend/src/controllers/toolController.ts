import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const handleGenericTool = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  const files = (req.files as Express.Multer.File[]) || [];

  try {
    // If it's a JSON request (AI/Writing tools)
    if (req.is('json')) {
      const { text } = req.body;
      if (!text) {
        res.status(400).json({ error: 'Text input is required for this tool.' });
        return;
      }

      // Mock processing for text-based tools
      let processedText = `Mock backend processing for tool: ${slug}\nOriginal Text:\n${text}`;
      
      if (slug === 'word-counter') {
        const words = text.split(/\s+/).filter((w: string) => w.length > 0).length;
        const chars = text.length;
        processedText = `Words: ${words}\nCharacters: ${chars}`;
      } else if (slug === 'case-converter') {
        processedText = text.toUpperCase();
      } else if (slug === 'sentence-rewriter') {
        processedText = `(Rewritten): ${text}`;
      }

      res.json({ result: processedText });
      return;
    }

    // If it's a multipart/form-data request (File-based tools)
    if (files.length === 0) {
      res.status(400).json({ error: 'Please upload at least one file.' });
      return;
    }

    const file = files[0];
    if (!file || !file.path || !file.originalname) {
      res.status(400).json({ error: 'Invalid uploaded file.' });
      return;
    }

    // For generic tools, just return the first uploaded file back as a "processed" mock
    // This allows the frontend to show a successful download for all 200+ tools
    let fileBytes = fs.readFileSync(file.path);
    let mimetype = file.mimetype || 'application/octet-stream';
    let filename = `processed-${file.originalname}`;

    const optionsStr = req.body.options;
    let options: any = {};
    try {
      if (optionsStr) options = JSON.parse(optionsStr);
    } catch(e) {}

    if (slug === 'resize-image') {
      const sharp = require('sharp');
      const w = parseInt(options.width, 10);
      const h = parseInt(options.height, 10);
      const width = isNaN(w) ? undefined : w;
      const height = isNaN(h) ? undefined : h;
      if (width || height) {
        fileBytes = await sharp(fileBytes).resize({ width, height }).toBuffer();
      }
    } else if (slug === 'image-adjustments') {
      const sharp = require('sharp');
      const b = parseFloat(options.brightness);
      const s = parseFloat(options.saturation);
      const h = parseInt(options.hue, 10);
      
      const brightness = isNaN(b) ? 1 : b;
      const saturation = isNaN(s) ? 1 : s;
      const hue = isNaN(h) ? 0 : h;
      
      fileBytes = await sharp(fileBytes).modulate({
        brightness,
        saturation,
        hue
      }).toBuffer();
    } else if (slug === 'image-compressor') {
      const sharp = require('sharp');
      if (mimetype.includes('jpeg') || mimetype.includes('jpg')) {
        fileBytes = await sharp(fileBytes).jpeg({ quality: 60 }).toBuffer();
      } else if (mimetype.includes('png')) {
        fileBytes = await sharp(fileBytes).png({ quality: 60 }).toBuffer();
      } else if (mimetype.includes('webp')) {
        fileBytes = await sharp(fileBytes).webp({ quality: 60 }).toBuffer();
      } else {
        fileBytes = await sharp(fileBytes).jpeg({ quality: 60 }).toBuffer();
        mimetype = 'image/jpeg';
        filename = filename.replace(/\.[^/.]+$/, ".jpg");
      }
    }
    
    // Set generic headers based on original file type or pdf if unknown
    res.setHeader('Content-Type', mimetype);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    res.send(fileBytes);

  } catch (error) {
    console.error(`Error processing tool ${slug}:`, error);
    res.status(500).json({ error: 'Internal server error while processing.' });
  } finally {
    // Cleanup all temp files
    files.forEach(f => {
      try {
        if (f.path && fs.existsSync(f.path)) {
          fs.unlinkSync(f.path);
        }
      } catch (err) {}
    });
  }
};
