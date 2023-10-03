const notFound = (req, res, next) => {
  const err = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  //  Check if id it's a valid ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = `Ressource not found`;
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NOVE_ENV === "production" ? "🥞" : err.stack,
  });
};

export { errorHandler, notFound };
