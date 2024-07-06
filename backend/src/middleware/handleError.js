const errorHandler = (err, req, res) => {
  req.logger.error(err.stack)
  res.sendCatchError(err)
}

export default errorHandler;