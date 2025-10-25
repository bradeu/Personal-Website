import express from "express";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express();
const port = 3000;

// Serve static assets from the client/public directory
app.use('/assets', express.static(join(__dirname, 'client/public/assets')));

// API routes would go here (if you have any)
// app.use('/api', apiRouter);

// Catch-all route: serve index.html for all routes
// This allows React Router to handle client-side routing
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'client/public/index.html'));
});

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`)
});