import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  },
});

function fileFilter(req, file, cb) {
  const allowed = ['image/jpeg', 'image/png'];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('Only JPG or PNG images are allowed.'));
  }
  cb(null, true);
}

const maxMb = Number(process.env.MAX_UPLOAD_MB || 8);

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxMb * 1024 * 1024 },
});
