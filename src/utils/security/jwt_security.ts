import jwt from "jsonwebtoken";

function generateTokenJWT(data: string) {
  return jwt.sign(
    {
      data,
    },
    `${process.env.TOKEN_SECRET_KEY}`,
    {
      expiresIn: "1h",
    }
  );
}

function verifyTokenJWT(token: string) {
  return jwt.verify(token, `${process.env.TOKEN_SECRET_KEY}`);
}

export { generateTokenJWT, verifyTokenJWT };
