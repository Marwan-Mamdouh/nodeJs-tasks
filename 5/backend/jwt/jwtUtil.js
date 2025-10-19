import jwt from "jsonwebtoken";

process.loadEnvFile(".env");
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = "2h";

export const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiresIn,
    issuer: "bookstore-api",
    subject: `${payload.id}`,
  });
};

export const verifyToken = (token) => jwt.verify(token, jwtSecret);
