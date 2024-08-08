import Admin from "../../models/admin/Admin.mjs";
import bcrypt from "bcrypt";
import generateWebTokenAndSetCookies from "../../utilis/generateToken.mjs";
export const signup = async (req, res) => {
  const { body } = req;
  const { fullname, email, password } = body;
  if (!fullname || !email || !password) {
    return res.status(400).json({ error: "invalid fields" });
  }
  try {
    const admin = await Admin.findOne({email});
    if(admin){
        return res.status(400).json({error:"User already exists"})
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      fullname,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    return res.status(200).json({ admin: newAdmin });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const login = async (req, res) => {
  const { body } = req;
  const { email, password } = body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "invalid fields" });
    }
    const admin = await Admin.findOne({email});
    // console.log("admin",admin)
    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin?.password || " "
    );
    // console.log("isPasswordCorrect",isPasswordCorrect)
    // console.log("admin",admin)

    if (!isPasswordCorrect || !admin) {
      console.log("if check")
      return res.status(400).json({ error: "Incorrect Credientials" });
    }
    const token = generateWebTokenAndSetCookies(admin._id,res)
    // console.log("token",token)
    // res.json({token})
    // localStorage.setItem("token", token);

    return res.status(200).json({
      admin: {
        _id: admin._id,
        fullname: admin.fullname,
        email: admin.email,
      },
      token : token
    });
  } catch (error) {
    res.status(500).json({ error: error});
  }
};
