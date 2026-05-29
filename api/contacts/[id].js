import { connectDB } from '../lib/mongodb';

const ContactSchema = {
  name: String,
  email: String,
  message: String,
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
    const Contact =
      mongoose.models.Contact ||
      mongoose.model('Contact', new mongoose.Schema(ContactSchema));

    if (req.method === 'PUT') {
      const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
      if (!contact) return res.status(404).json({ error: 'Contact not found' });
      res.status(200).json(contact);
    } else if (req.method === 'DELETE') {
      const contact = await Contact.findByIdAndDelete(id);
      if (!contact) return res.status(404).json({ error: 'Contact not found' });
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
}
