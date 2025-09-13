export function authMiddleware(req, resp, next) {
  // signed in
  if (req.headers.authorization.toLowerCase() === "Marwan".toLowerCase()) {
    // from database get user info
    req.currentUser = {
      id: 1617,
      firstName: "Marwan",
      lastName: "AbdalMagied",
      email: "marwan@gmail.com",
    };
    next();
  }
  // Forbidden
  else {
    resp.status(403).send({ message: "you must sign in first" });
  }
}
