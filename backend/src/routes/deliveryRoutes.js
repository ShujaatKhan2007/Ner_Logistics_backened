import { Router } from 'express';
import {
  listDeliveries,
  createDelivery,
  updateDeliveryStatus,
  listDeliveryDistricts,
} from '../controllers/deliveryController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', protect, listDeliveries);
router.get('/meta/districts', protect, listDeliveryDistricts);
router.post('/', protect, createDelivery);
router.patch('/:id/status', protect, updateDeliveryStatus);

export default router;
