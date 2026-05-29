import { connectDB } from '../lib/mongodb';

const ContactSchema = {
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await connectDB();
    const mongoose = require('mongoose');
    const Contact =
      mongoose.models.Contact ||
      mongoose.model('Contact', new mongoose.Schema(ContactSchema));

    if (req.method === 'GET') {
      const contacts = await Contact.find().sort({ date: -1 });
      res.status(200).json(contacts);
    } else if (req.method === 'POST') {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const contact = new Contact({ name, email, message });
      await contact.save();
      res.status(201).json({
        message: 'Contact form submitted successfully',
        data: contact,
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
}
