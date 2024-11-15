const multer = require('multer');

function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size is too large. Maximum size is 1MB.' });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    // Custom or other errors
    return res.status(400).json({ error: err.message });
  }
  next();
}

module.exports = errorHandler;
