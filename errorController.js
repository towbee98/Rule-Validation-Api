module.exports = (err, req, res, next) => {
  console.log(err);
  return res.status(err.statusCode).json({
    status: err.status,
    data: null,
    message: err.message,
  });
};
