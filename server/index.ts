import express from "express";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for non-file routes (SPA)
  app.get("*", (req, res, next) => {
    // Only serve index.html for paths that don't have a file extension
    // or are not already handled by express.static
    const filePath = path.join(staticPath, req.path);
    if (!req.path.includes(".") || !fs.existsSync(filePath)) {
      res.sendFile(path.join(staticPath, "index.html"));
    } else {
      next();
    }
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
 