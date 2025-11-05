const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const cors = require("cors");
const path = require("path"); // For serving static files
const fs = require("fs"); // ✅ Add this at the top


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

// Serve static files from uploads folder
app.use("/uploads", express.static(uploadsDir));

// ✅ Mount upload route
app.use("/api/upload", require("./src/routes/uploadRoutes"));
// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/cemetery", require("./src/routes/cemeteryRoutes"));
app.use("/api/graves", require("./src/routes/graveRoutes")); // ✅ Mount graves route


// Routes
const noticeRoutes = require('./src/routes/noticeRoutes');
app.use('/api/notices', noticeRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Test route
app.get("/api/auth/test", (req, res) => {
  res.send("Auth route works!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


