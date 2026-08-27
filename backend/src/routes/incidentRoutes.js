import { Router } from 'express';
import { listIncidents, createIncident, updateIncidentStatus } from '../controllers/incidentController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', protect, listIncidents);
router.post('/', protect, upload.single('photo'), createIncident);
router.patch('/:id/status', protect, updateIncidentStatus);

export default router;
