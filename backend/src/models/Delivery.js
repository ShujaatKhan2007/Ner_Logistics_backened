import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema(
  {
    displayId: { type: String, required: true, unique: true }, // "#8472"
    originLabel: { type: String, required: true },
    destinationLabel: { type: String, required: true },
    district: { type: String, default: 'Unassigned' },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    status: {
      type: String,
      enum: ['Scheduled', 'Assigned', 'In Progress', 'Delayed', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
    etaMinutes: { type: Number, default: null }, // null => "Completed" / "—"
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'RouteOptimization', default: null },
  },
  { timestamps: true }
);

deliverySchema.virtual('etaLabel').get(function etaLabel() {
  if (this.status === 'Completed') return 'Completed';
  if (this.status === 'Cancelled') return 'Cancelled';
  if (this.etaMinutes == null) return '—';
  const h = Math.floor(this.etaMinutes / 60);
  const m = this.etaMinutes % 60;
  return h > 0 ? `${h}h ${m}min` : `${m} min`;
});
deliverySchema.set('toJSON', { virtuals: true });

export default mongoose.model('Delivery', deliverySchema);
