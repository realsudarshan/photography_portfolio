import { connectDB } from '../lib/mongodb';

const PhotoSchema = {
  title: String,
  category: String,
  imageUrl: String,
  url: String,
  description: String,
  date: { type: Date, default: Date.now },
};

export default async function handler(req, res) {
  const { id } = req.query;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await connectDB();
    const mongoose = require('mongoose');
    const Photo =
      mongoose.models.Photo ||
      mongoose.model('Photo', new mongoose.Schema(PhotoSchema));

    if (req.method === 'PUT') {
      const photo = await Photo.findByIdAndUpdate(id, req.body, { new: true });
      if (!photo) return res.status(404).json({ error: 'Photo not found' });
      res.status(200).json(photo);
    } else if (req.method === 'DELETE') {
      const photo = await Photo.findByIdAndDelete(id);
      if (!photo) return res.status(404).json({ error: 'Photo not found' });
      res.status(200).json({ message: 'Photo deleted successfully' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
}
