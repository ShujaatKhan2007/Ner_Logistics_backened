import { Router } from 'express';
import { listRoads, createRoad, updateRoadStatus } from '../controllers/roadController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', protect, listRoads);
router.post('/', protect, createRoad);
router.patch('/:id/status', protect, updateRoadStatus);

export default router;
