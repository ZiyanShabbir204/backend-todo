import Admin from "../../models/admin/Admin.mjs";
import bcrypt from "bcrypt";
import generateWebTokenAndSetCookies from "../../utilis/generateToken.mjs";
import { responseHelper } from "../../utilis/responseHelper.mjs";
import { statusHelper } from "../../utilis/statusHelper.mjs";



export const getAllAdmin = async (req,res)=>{

  try {

    const admins =  await Admin.find()
    if(!admins){
      return res.status(statusHelper(4)).json(responseHelper(false,"no admin found",null))
    }
    return res.status(statusHelper(1)).json(responseHelper(true," admin found",admins))

    
  } catch (error) {
    return res
      .status(statusHelper(2))
      .json(responseHelper(false, "internal server error", null));
  
  }

}
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
    const newAdmin = await Admin.findByIdAndUpdate(id, temp, { new: true }).select("password");
   
    return res
      .status(statusHelper(1))
      .json(responseHelper(true, "password change successfully", newAdmin));
  } catch (error) {
    return res
      .status(statusHelper(2))
      .json(responseHelper(false, "internal server error", null));
  }
};


export const updateProfile = async (req,res)=>{
  const { id } = req.params;
  const { body } = req;
  const { fullname, email } = body;
  try {
    if (!fullname || !email) {
      return res
        .status(statusHelper(3))
        .json(responseHelper(false, "invalid Fieldsss", null));
    }
    const admin = await Admin.findById(id)
    if(!admin){
      return res
        .status(statusHelper(3))
        .json(responseHelper(false, "Admin not exists", null));

    }
    const temp = {
      fullname,
      email
    }

    const newAdmin = await Admin.findByIdAndUpdate(id,temp,{new:true})
    return res
    .status(statusHelper(1))
    .json(responseHelper(true, "user profile updated", newAdmin));

  } catch (error) {
    return res
      .status(statusHelper(2))
      .json(responseHelper(false, "internal server error", null));
    
  }
}