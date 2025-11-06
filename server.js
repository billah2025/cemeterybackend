const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Load env
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve uploads
app.use("/uploads", express.static(uploadsDir));

// ✅ API Key Middleware
const apiKeyMiddleware = require("./src/middleware/apiKeyMiddleware");

// ✅ Public route (No Auth) - For uploading images from admin panel
app.use("/api/upload", require("./src/routes/uploadRoutes"));

// ✅ Protected API Routes (frontend must send x-api-key)
app.use("/api/auth", apiKeyMiddleware, require("./src/routes/authRoutes"));
app.use("/api/cemetery", apiKeyMiddleware, require("./src/routes/cemeteryRoutes"));
app.use("/api/graves", apiKeyMiddleware, require("./src/routes/graveRoutes"));
app.use("/api/notices", apiKeyMiddleware, require("./src/routes/noticeRoutes"));

// Default route
app.get("/", (req, res) => {
  res.send("API is running and secure ✅");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
