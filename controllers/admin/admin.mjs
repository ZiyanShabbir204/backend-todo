import Admin from "../../models/admin/Admin.mjs";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import generateWebTokenAndSetCookies from "../../utilis/generateToken.mjs";
import { responseHelper } from "../../utilis/responseHelper.mjs";
import { statusHelper } from "../../utilis/statusHelper.mjs";

export const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    if (!admins) {
      return res
        .status(statusHelper(4))
        .json(responseHelper(false, "no admin found", null));
    }
    return res
      .status(statusHelper(1))
      .json(responseHelper(true, " admin found", admins));
  } catch (error) {
    return res
      .status(statusHelper(2))
      .json(responseHelper(false, "internal server error", null));
  }
};
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

    const response = await newAdmin.save();

    return res
      .status(statusHelper(1))
      .json(responseHelper(true, "new admin added", response));
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
    const admin = await Admin.findOne({ email }).select("+password");
    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin?.password || " "
    );

    if (!isPasswordCorrect || !admin) {
      return res
        .status(statusHelper(3))
        .json(responseHelper(false, "Incorrect Credientials", null));
    }
    if (!admin.isVerified) {
      return res
        .status(statusHelper(3))
        .json(responseHelper(false, "Please verify your account first", null));
    }
    const token = generateWebTokenAndSetCookies(admin._id, res);
    const adminData = {
      _id: admin._id,
      fullname: admin.fullname,
      email: admin.email,
      isVerified: admin.isVerified,
    };

    console.log("admin data", adminData);
    console.log("admin", admin);

    return res.status(statusHelper(1)).json(
      responseHelper(true, "login succesfull", {
        admin: adminData,
        token: token,
      })
    );
  } catch (error) {
    return res
      .status(statusHelper(2))
      .json(responseHelper(false, "internal server error", null));
  }
};

export const changePassword = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { password, newPassword } = body;
  try {
    if (!password || !newPassword) {
      return res
        .status(statusHelper(3))
        .json(responseHelper(false, "invalid Fieldsss", null));
    }
    const admin = await Admin.findById(id).select("password");
    // console.log("admin",admin)
    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin?.password || " "
    );
    if (!isPasswordCorrect || !admin) {
      return res
        .status(statusHelper(3))
        .json(responseHelper(false, "Incorrect Password", null));
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const temp = {
      password: hashedPassword,
    };
    const newAdmin = await Admin.findByIdAndUpdate(id, temp, {
      new: true,
    }).select("password");

    return res
      .status(statusHelper(1))
      .json(responseHelper(true, "password change successfully", newAdmin));
  } catch (error) {
    return res
      .status(statusHelper(2))
      .json(responseHelper(false, "internal server error", null));
  }
};

// export const sendEmail = async (req,res)=>{
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       auth: {
//         user: "lucas.boehm80@ethereal.email",
//         pass: "FDwAr1PXZMmju2jPrs",
//       },
//     });
//     const info = await transporter.sendMail({
//       from: '"lucas" <lucas.boehm80@ethereal.email>', // sender address
//       to: "ziyanshabbir25@gmail.com", // list of receivers
//       subject: "test node mailer", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });

//     return res.status(statusHelper(1)).json(responseHelper(true,"email deliver",info))

//   } catch (error) {
//     return res
//     .status(statusHelper(2))
//     .json(responseHelper(false, "internal server error", null));

//   }

// }

export const sendEmail = async (req, res) => {
  const { body } = req;
  const { email: recieverEmail,_id } = body;
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "ziyanshabbir25@gmail.com",
        pass: "ttazqajftqetnjjd",
      },
    });
    const info = await transporter.sendMail({
      from: "<ziyanshabbir25@gmail.com>", // sender address
      to: recieverEmail, // list of receivers
      subject: "Email Verification", // Subject line
      text: `please verify your email by clicking on a link http://localhost:5173/verifyemail/${_id} Thankyou!!`, // plain text body
    });

    return res
      .status(statusHelper(1))
      .json(responseHelper(true, "email deliver", info));
  } catch (error) {
    console.log("error while sending an email", error);
    return res
      .status(statusHelper(2))
      .json(responseHelper(false, "internal server error", null));
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { fullname, email } = body;
  try {
    if (!fullname || !email) {
      return res
        .status(statusHelper(3))
        .json(responseHelper(false, "invalid Fieldsss", null));
    }
    const admin = await Admin.findById(id);
    if (!admin) {
      return res
        .status(statusHelper(3))
        .json(responseHelper(false, "Admin not exists", null));
    }
    const temp = {
      fullname,
      email,
    };

    const newAdmin = await Admin.findByIdAndUpdate(id, temp, { new: true });
    return res
      .status(statusHelper(1))
      .json(responseHelper(true, "user profile updated", newAdmin));
  } catch (error) {
    return res
      .status(statusHelper(2))
      .json(responseHelper(false, "internal server error", null));
  }
};

export const verifyEmail = async(req,res)=>{
  const {id} = req.params
  try {
    const updateAdmin = {
      isVerified:true
    }
    console.log("id",id)
    const response = await Admin.findByIdAndUpdate(id,updateAdmin,{new:true})
    return res
      .status(statusHelper(1))
      .json(responseHelper(true, "User Verified", response));
    
  } catch (error) {
    return res
      .status(statusHelper(2))
      .json(responseHelper(false, "internal server error", null));
  }
}
