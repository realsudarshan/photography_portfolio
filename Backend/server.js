// Force Node to use public DNS resolvers to avoid local DNS/SRV lookup issues
// (Cloudflare + Google) — placed before any DNS/SRV-dependent code.
require('node:dns/promises').setServers(["1.1.1.1", "8.8.8.8"]);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ MongoDB connection
async function connectDB() {
  const opts = {};
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is not set. Please set Backend/.env');
    return;
  }

  try {
    await mongoose.connect(uri, opts);
    console.log('MongoDB connected to', uri);
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    console.error('If you are using MongoDB Atlas, please check:');
    console.error('- That the connection string in Backend/.env (MONGO_URI) is correct.');
    console.error("- Your Atlas project's Network Access includes your machine's IP or 0.0.0.0/0 (temporarily).");
    console.error('- That your network/DNS allows SRV lookups (mongodb+srv).');
    console.error('- After fixing, restart the server (nodemon will pick up changes with `rs`).');
  }
}

connectDB();

// ✅ Routes
const photoRoutes = require('./routes/photos');
const contactRoutes = require('./routes/contacts');
const blogRoutes = require('./routes/blogRoutes');

app.use('/api/photos', photoRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/blogs', blogRoutes);

const PORT = process.env.PORT || 5000;
// Touching this comment so nodemon restarts when .env is updated during development.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
