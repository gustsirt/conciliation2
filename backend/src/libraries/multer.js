import multer from "multer";
import { logger } from "../middleware/logger.js";

const storage = multer.memoryStorage();

const uploader = multer({ 
  storage, 
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  fileFilter: function (req, file, cb) {    
    // Filtrar solo archivos CSV
    if (file.mimetype === 'text/csv') {
      cb(null, true); // Permitir la carga del archivo
    } else {
      cb(new Error('Solo se permiten archivos CSV')); // Rechazar el archivo
    }
  },
  onError: function(err,next){
      logger.error(err)
      next()
  }
})

export default uploader;