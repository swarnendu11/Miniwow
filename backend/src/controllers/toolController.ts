import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const handleGenericTool = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;

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
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ error: 'Please upload at least one file.' });
      return;
    }

    // For generic tools, just return the first uploaded file back as a "processed" mock
    // This allows the frontend to show a successful download for all 200+ tools
    const file = files[0];
    const fileBytes = fs.readFileSync(file.path);
    
    // Set generic headers based on original file type or pdf if unknown
    res.setHeader('Content-Type', file.mimetype || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="processed-${file.originalname}"`);
    
    res.send(Buffer.from(fileBytes));

    // Cleanup all temp files
    files.forEach(f => {
      try {
        fs.unlinkSync(f.path);
      } catch (err) {}
    });

  } catch (error) {
    console.error(`Error processing tool ${slug}:`, error);
    res.status(500).json({ error: 'Internal server error while processing.' });
  }
};
