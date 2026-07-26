import express, { Request, Response } from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', app: 'Multan Clinic Engine' });
});

// Optional AI copy generator endpoint for Multan Clinic pitch/taglines
app.post('/api/ai/generate-clinic-copy', async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const { doctorName, niche, city, businessName } = req.body;

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const prompt = `You are a medical copywriter specializing in Pakistan local healthcare marketing in ${city || 'Multan'}.
Write 3 catchy tagline options and a 2-sentence Roman Urdu WhatsApp outreach message for:
- Clinic/Business Name: ${businessName || 'Multan Specialist Clinic'}
- Doctor/Specialist Name: ${doctorName || 'Dr. Specialist'}
- Niche: ${niche || 'Medical Clinic'}

Return JSON format:
{
  "taglines": ["Tagline 1", "Tagline 2", "Tagline 3"],
  "romanUrduPitch": "Assalam-o-Alaikum..."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (err: any) {
    console.error('AI Generator Error:', err);
    return res.status(500).json({
      error: 'Failed to generate clinic copy.',
      details: err.message
    });
  }
});

// Serve Vite or Static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Multan Clinic Engine listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
