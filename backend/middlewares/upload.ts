import multer from "multer";
const storage = multer.memoryStorage(); // → keep file in buffer instead of disk

export const upload = multer({ storage });
