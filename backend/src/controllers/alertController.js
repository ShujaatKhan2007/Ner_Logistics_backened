import Alert from '../models/Alert.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const listAlerts = asyncHandler(async (req, res) => {
  const { limit = 20 } = req.query;
  const alerts = await Alert.find().sort({ createdAt: -1 }).limit(Number(limit));
  res.json({ alerts });
});

export const createAlert = asyncHandler(async (req, res) => {
  const { tag, title, description } = req.body;
  if (!tag || !title) return res.status(400).json({ message: 'tag and title are required.' });
  const alert = await Alert.create({ tag, title, description, source: 'manual' });
  res.status(201).json({ alert });
});
