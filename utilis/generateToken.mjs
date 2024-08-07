import jwt from "jsonwebtoken";

const generateWebTokenAndSetCookies = (userId, res) => {
  const token = jwt.sign({ userId }, "SECRET-KEY", {
    expiresIn: "15d",
  });
//   console.log("jwt token", token);
//   return token

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: "development" !== "development",
  });
};

export default generateWebTokenAndSetCookies;
