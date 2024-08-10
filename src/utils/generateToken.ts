import jwt from "jsonwebtoken";
require("dotenv").config();

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "72h",
  });
};

export default generateToken;
