import jwt from "jsonwebtoken";
import { statusHelper } from "../utilis/statusHelper.mjs";
import { responseHelper } from "../utilis/responseHelper.mjs";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    // console.log("token",token)
    if (!token) {
      return res.status(statusHelper(5)).json(responseHelper(false,"Unauthorized no token access",null))
      // return res.status(401).json({ error: "Unauthorized no token acces" });
    }

    const decoded = jwt.verify(token.split(" ")[1], "SECRET-KEY");
    if (!decoded) {
      return res.status(statusHelper(5)).json(responseHelper(false,"Unauthorized no token access",null))
    }

    next();
  } catch (error) {
    console.log("error while protecting Route", error.message);
    return res.status(statusHelper(2)).json(responseHelper(false,"Unauthorized no token access",null))
  }
};

export default protectRoute;
