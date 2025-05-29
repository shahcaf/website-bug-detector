import express from 'express';
import cors from 'cors';
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import puppeteer from 'puppeteer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint to scan a website
app.post('/api/scan', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Launch Chrome
    const chrome = await chromeLauncher.launch({ 
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'] 
    });
    
    const options = { 
      port: chrome.port,
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    };

    // Run Lighthouse
    const runnerResult = await lighthouse(url, options);
    
    // Take a screenshot using Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const screenshot = await page.screenshot({ encoding: 'base64' });
    await browser.close();
    
    // Format the results
    const report = {
      lighthouse: runnerResult.lhr,
      screenshot: `data:image/png;base64,${screenshot}`,
      timestamp: new Date().toISOString(),
      url: url
    };

    await chrome.kill();
    res.json(report);
    
  } catch (error) {
    console.error('Error during scan:', error);
    res.status(500).json({ 
      error: 'Failed to scan website',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
