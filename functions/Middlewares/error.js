module.exports = async function errorMiddleware(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Oops, something went wrong";
  return res.status(status).send(message);
};
