import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  const API_BASE = 'https://gifstuffapi.com';

  // GIF Generation proxy endpoint
  app.get('/api/gif/:endpoint', async (req, res) => {
    try {
      const { endpoint } = req.params;
      const { image } = req.query;
      
      if (!image) {
        return res.status(400).json({ success: false, error: 'Image URL is required' });
      }

      const response = await fetch(`${API_BASE}/${endpoint}/?image=${encodeURIComponent(image as string)}`);
      const data = await response.json();
      
      res.json(data);
    } catch (error) {
      console.error('GIF generation error:', error);
      res.status(500).json({ success: false, error: 'Failed to generate GIF' });
    }
  });

  // QR Code generation proxy endpoint
  app.get('/api/qr', async (req, res) => {
    try {
      const { url } = req.query;
      
      if (!url) {
        return res.status(400).json({ success: false, error: 'URL is required' });
      }

      const response = await fetch(`${API_BASE}/qr/?url=${encodeURIComponent(url as string)}`);
      const data = await response.json();
      
      res.json(data);
    } catch (error) {
      console.error('QR generation error:', error);
      res.status(500).json({ success: false, error: 'Failed to generate QR code' });
    }
  });

  // IP check proxy endpoint
  app.get('/api/checkip', async (req, res) => {
    try {
      const response = await fetch(`${API_BASE}/checkip/`);
      const ip = await response.text();
      
      res.json({ ip: ip.trim() });
    } catch (error) {
      console.error('IP check error:', error);
      res.status(500).json({ error: 'Failed to check IP address' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
