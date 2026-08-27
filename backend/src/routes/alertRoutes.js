import { Router } from 'express';
import { listAlerts, createAlert } from '../controllers/alertController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', protect, listAlerts);
router.post('/', protect, createAlert);

export default router;
