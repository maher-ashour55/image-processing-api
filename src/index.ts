import express from 'express';
import resizeImage from './utilities/resize.js';

const app = express();
const port = 3000;

app.get('/api/images', async (req, res) => {
  const { filename, width, height } = req.query;

  if (!filename || !width || !height) {
    return res.status(400).send('Missing required parameters');
  }

  const w = parseInt(width as string);
  const h = parseInt(height as string);

  if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
    return res.status(400).send('Width and height must be positive numbers');
  }

  try {
    const outputPath = await resizeImage(filename as string, w, h);
    res.sendFile(outputPath);
  } catch {
    res.status(404).send('Image not found or error processing');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;