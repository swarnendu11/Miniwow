import { Request, Response } from 'express';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export const mergePdfs = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length < 2) {
      res.status(400).json({ error: 'Please upload at least two PDF files to merge.' });
      return;
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
      
      // Clean up temp file
      fs.unlinkSync(file.path);
    }

    const mergedPdfBytes = await mergedPdf.save();
    
    // Set headers for download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="merged.pdf"');
    
    res.send(Buffer.from(mergedPdfBytes));
  } catch (error) {
    console.error('Error merging PDFs:', error);
    res.status(500).json({ error: 'Failed to merge PDFs' });
  }
};
