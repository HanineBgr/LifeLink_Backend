
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Handle different types of errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        error: err.message,
      });
    }
  
    if (err.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid ID format',
        error: err.message,
      });
    }
  
    // General Error handler
    return res.status(err.status || 500).json({
      message: err.message || 'Something went wrong!',
      error: process.env.NODE_ENV === 'development' ? err.stack : {},
    });
  };
  
  export default errorHandler;
  