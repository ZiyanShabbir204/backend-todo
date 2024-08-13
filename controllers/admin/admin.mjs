import Admin from "../../models/admin/Admin.mjs";
import bcrypt from "bcrypt";
import generateWebTokenAndSetCookies from "../../utilis/generateToken.mjs";
import { responseHelper } from "../../utilis/responseHelper.mjs";
import { statusHelper } from "../../utilis/statusHelper.mjs";
export const signup = async (req, res) => {
  const { body } = req;
  const { fullname, email, password } = body;
  if (!fullname || !email || !password) {
    return res
      .status(statusHelper(3))
      .json(responseHelper(false, "invalid Fieldsss", null));
  }
  try {
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res
        .status(statusHelper(3))
        .json(responseHelper(false, "User already exists", null));
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      fullname,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    return res
      .status(statusHelper(1))
      .json(responseHelper(true, "new admin added", newAdmin));
  } catch (error) {
    return res
      .status(statusHelper(2))
      .json(responseHelper(false, "internal server error", null));
  }
};

export const login = async (req, res) => {
  const { body } = req;
  const { email, password } = body;
  console.log("email", email);
  console.log("password", password);
  try {
    if (!email || !password) {
      return res
        .status(statusHelper(3))
        .json(responseHelper(false, "invalid Fieldsss", null));
    }
    const admin = await Admin.findOne({ email }).select("password");
    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin?.password || " "
    );

    if (!isPasswordCorrect || !admin) {
      return res
        .status(statusHelper(3))
        .json(responseHelper(false, "Incorrect Credientials", null));
    }
    const token = generateWebTokenAndSetCookies(admin._id, res);

    return res.status(statusHelper(1)).json(
      responseHelper(true, "login succesfull", {
        admin: {
          _id: admin._id,
          fullname: admin.fullname,
          email: admin.email,
        },
        token: token,
      })
    );
  } catch (error) {
    return res
      .status(statusHelper(2))
      .json(responseHelper(false, "internal server error", null));
  }
};
