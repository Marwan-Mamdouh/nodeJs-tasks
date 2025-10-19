import { verifyToken } from "../jwt/jwtUtil.js";

export const authMiddleware = async (req, res, next) => {
  console.log("Validating user authentication...");
  const authHeader = req.headers.authorization;

  // console.log(authHeader);
  if (!authHeader) {
    return res.status(401).send({
      error: "Missing access token.",
    });
  }

  const token = authHeader.split(" ")[1];
  // console.log(token);

  try {
    const result = verifyToken(token);
    req.currentUser = {
      id: result.id,
      username: result.username,
      role: result.role,
    };
    console.log(req.currentUser, "done");
    next();
  } catch (error) {
    res.status(401).send({
      error: error.message + "Invalid or expired token.",
    });
  }
};
