// multer.middleware.js
import multer from "multer";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const tempDir = "./public/temp";

// Ensure the upload directory exists
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${base}-${unique}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  cb(null, allowed.includes(file.mimetype));
};

const baseUpload = multer({ storage, fileFilter });

function compressImages(req, res, next) {
  if (!req.files) return next();

  const tasks = Object.values(req.files).flat().map(async (file) => {
    const stats = fs.statSync(file.path);
    const isImage = ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype);

    if (isImage && stats.size > 5 * 1024 * 1024) {
      await sharp(file.path)
        .jpeg({ quality: 80 })
        .toFile(file.path); // Overwrite original
    }
  });

  Promise.all(tasks)
    .then(() => next())
    .catch(next);
}

// Export wrapper with dynamic method support
export const upload = {
  fields: (fieldConfig) => [
    baseUpload.fields(fieldConfig),
    compressImages,
  ],
  single: (fieldName) => [
    baseUpload.single(fieldName),
    compressImages,
  ],
  array: (fieldName, maxCount) => [
    baseUpload.array(fieldName, maxCount),
    compressImages,
  ]
};
