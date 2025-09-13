export function loggerMiddleware(req, _, next) {
  console.log(
    `Received Request at: ${new Date().toDateString()}, method: ${
      req.method
    }, url: ${req.url}`
  );
  next();
}
