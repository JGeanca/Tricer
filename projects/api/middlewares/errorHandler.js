export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: 'Invalid JSON',
      errors: [{ message: 'The provided JSON is not valid. Please check your request body.' }]
    });
  }

  // Handle other errors
  res.status(err.status || 500).json({
    message: err.message || 'An unexpected error occurred',
    errors: [{ message: err.message || 'Please try again later' }]
  });
};